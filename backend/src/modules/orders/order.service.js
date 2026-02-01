const { sequelize, RentalOrder, RentalOrderItem, Quotation, QuotationItem } = require('../../models');
const reservationService = require('../reservations/reservation.service');

const createOrderFromQuotation = async (quotationId) => {
    const t = await sequelize.transaction();
    try {
        const quotation = await Quotation.findByPk(quotationId, {
            include: [QuotationItem]
        });

        if (!quotation) throw new Error('Quotation not found');
        if (quotation.status === 'CONFIRMED') throw new Error('Quotation already confirmed');

        // 1. Create Rental Order
        const order = await RentalOrder.create({
            customer_id: quotation.customer_id,
            quotation_id: quotation.quotation_id,
            status: 'CONFIRMED'
        }, { transaction: t });

        // 2. Process Items and Reserves
        for (const item of quotation.QuotationItems) {
            // Create Order Item
            const orderItem = await RentalOrderItem.create({
                order_id: order.order_id,
                product_id: item.product_id,
                start_date: item.start_date,
                end_date: item.end_date,
                quantity: item.quantity,
                final_price: item.price_snapshot
            }, { transaction: t });

            // Reserve Stock
            await reservationService.createReservation(
                orderItem.order_item_id,
                item.product_id,
                item.start_date,
                item.end_date,
                item.quantity,
                t
            );
        }

        // 3. Update Quotation Status
        quotation.status = 'CONFIRMED';
        await quotation.save({ transaction: t });

        await t.commit();

        // Reload order with customer details for email
        const fullOrder = await RentalOrder.findByPk(order.order_id, {
            include: [{
                model: require('../../models').CustomerProfile,
                include: [{ model: require('../../models').User }]
            }]
        });

        return fullOrder;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getAllOrders = async (user) => {
    const { Product } = require('../../models');

    // Basic Include
    const includeOptions = [
        {
            model: RentalOrderItem,
            include: [Product]
        },
        {
            model: Quotation,
            include: [{ model: QuotationItem, include: [Product] }]
        }
    ];

    let whereClause = {};

    // 1. If Customer, only see your own orders
    if (user.role === 'CUSTOMER') {
        whereClause.customer_id = user.id;
    }
    // 2. If Vendor, see orders that contain AT LEAST ONE of your products
    else if (user.role === 'VENDOR') {
        // Filter via Items -> Product -> vendor_id
        includeOptions[0] = {
            model: RentalOrderItem,
            required: true,
            include: [{
                model: Product,
                where: { vendor_id: user.id },
                required: true
            }]
        };
    }

    return await RentalOrder.findAll({
        where: whereClause,
        include: includeOptions,
        order: [['created_at', 'DESC']]
    });
};

// Kept for backward compatibility if needed internally, but mapped to getAllOrders logic in controller
const getOrders = getAllOrders;

module.exports = {
    createOrderFromQuotation,
    getOrders,
    getAllOrders
};
