const { sequelize, Quotation, QuotationItem, Product, CustomerProfile } = require('../../models');

const createQuotation = async (customerId, items) => {
    const t = await sequelize.transaction();
    try {
        // 1. Create Quotation Header
        const quotation = await Quotation.create({
            customer_id: customerId,
            status: 'DRAFT'
        }, { transaction: t });

        // 2. Create Items
        // items: [{ product_id, start_date, end_date, quantity }]
        if (items && items.length > 0) {
            for (const item of items) {
                // Fetch product price
                const product = await Product.findByPk(item.product_id);

                let calculatedPrice = 0;
                if (product) {
                    const start = new Date(item.start_date);
                    const end = new Date(item.end_date);
                    const diffTime = Math.abs(end - start);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Minimum 1 day

                    const dailyRate = parseFloat(product.price_per_day || 0);
                    calculatedPrice = dailyRate * diffDays * item.quantity;
                }

                await QuotationItem.create({
                    quotation_id: quotation.quotation_id,
                    product_id: item.product_id,
                    start_date: item.start_date,
                    end_date: item.end_date,
                    quantity: item.quantity,
                    price_snapshot: calculatedPrice
                }, { transaction: t });
            }
        }

        await t.commit();
        return await getQuotationById(quotation.quotation_id);
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getQuotationById = async (id) => {
    return await Quotation.findByPk(id, {
        include: [
            { model: CustomerProfile },
            { model: QuotationItem, include: [Product] }
        ]
    });
};

const getAllQuotations = async (user) => {
    // Basic Include
    const includeOptions = [
        { model: CustomerProfile },
        {
            model: QuotationItem,
            include: [Product]
        }
    ];

    let whereClause = {};

    // 1. If Customer, only see your own quotations
    if (user.role === 'CUSTOMER') {
        whereClause.customer_id = user.id;
    }
    // 2. If Vendor, see quotations that contain AT LEAST ONE of your products
    else if (user.role === 'VENDOR') {
        // This is complex in Sequelize without raw queries, but let's try strict include
        // We filter the Quotation where it has items that belong to this vendor
        // But simply "include" with "where" usually performs an INNER JOIN, effectively filtering the top level.

        includeOptions[1] = {
            model: QuotationItem,
            required: true, // Inner Join to ensure quotation has items
            include: [{
                model: Product,
                where: { vendor_id: user.id }, // Filter items by vendor
                required: true // Inner Join
            }]
        };
    }
    // 3. Admin sees all (default empty whereClause)

    const quotations = await Quotation.findAll({
        where: whereClause,
        include: includeOptions,
        order: [['created_at', 'DESC']]
    });

    return quotations;
};

const updateStatus = async (id, status) => {
    const quotation = await Quotation.findByPk(id);
    if (!quotation) throw new Error('Quotation not found');
    quotation.status = status;
    await quotation.save();
    return quotation;
};

module.exports = {
    createQuotation,
    getQuotationById,
    getAllQuotations,
    updateStatus
};
