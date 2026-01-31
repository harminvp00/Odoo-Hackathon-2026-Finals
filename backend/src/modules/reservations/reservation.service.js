const { Reservation, InventoryTransaction, Product, sequelize } = require('../../models');
const { Op } = require('sequelize');

const createReservation = async (orderItemId, productId, startDate, endDate, quantity, transaction) => {
    // Check availability
    const available = await checkAvailability(productId, startDate, endDate, quantity);
    if (!available) {
        throw new Error(`Product ${productId} is not available for the selected dates`);
    }

    // Create Reservation
    await Reservation.create({
        product_id: productId,
        order_item_id: orderItemId,
        start_date: startDate,
        end_date: endDate,
        quantity: quantity
    }, { transaction });

    // Update Inventory (Logically blocked, not physically removed yet until pickup maybe? 
    // For simplicity, we just track reservations. Real system might move stock to 'Reserved' bucket)
};

const checkAvailability = async (productId, startDate, endDate, quantity) => {
    // Simple logic: Total Stock - (Sum of reserved quantity for overlapping period) >= Requested Quantity

    // 1. Get Total Stock
    // This is simplified. Ideally keep a running total in Inventory table.
    const product = await Product.findByPk(productId, { include: ['Inventory'] });
    const totalStock = product.Inventory ? product.Inventory.total_quantity : 0;

    // 2. Get Reserved Quantity for overlapping period
    const reservations = await Reservation.findAll({
        where: {
            product_id: productId,
            [Op.or]: [
                {
                    start_date: { [Op.between]: [startDate, endDate] }
                },
                {
                    end_date: { [Op.between]: [startDate, endDate] }
                },
                {
                    [Op.and]: [
                        { start_date: { [Op.lte]: startDate } },
                        { end_date: { [Op.gte]: endDate } }
                    ]
                }
            ]
        }
    });

    const reservedQuantity = reservations.reduce((sum, res) => sum + res.quantity, 0);

    return (totalStock - reservedQuantity) >= quantity;
};

module.exports = {
    createReservation,
    checkAvailability
};
