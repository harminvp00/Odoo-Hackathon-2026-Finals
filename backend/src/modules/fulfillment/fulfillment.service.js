const { RentalOrder, Pickup, Return, sequelize } = require('../../models');

const processPickup = async (orderId) => {
    const t = await sequelize.transaction();
    try {
        const order = await RentalOrder.findByPk(orderId);
        if (!order) throw new Error('Order not found');
        if (order.status !== 'CONFIRMED') throw new Error('Order must be CONFIRMED to pickup');

        await Pickup.create({
            order_id: orderId,
            pickup_time: new Date(),
            status: 'COMPLETED'
        }, { transaction: t });

        order.status = 'ACTIVE';
        await order.save({ transaction: t });

        await t.commit();

        const fullOrder = await RentalOrder.findByPk(orderId, {
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

const processReturn = async (orderId) => {
    const t = await sequelize.transaction();
    try {
        const order = await RentalOrder.findByPk(orderId);
        if (!order) throw new Error('Order not found');
        if (order.status !== 'ACTIVE') throw new Error('Order must be ACTIVE to return');

        await Return.create({
            order_id: orderId,
            actual_return_time: new Date(),
            late_fee: 0.00 // Logic for late fee calculation can be added here
        }, { transaction: t });

        order.status = 'COMPLETED';
        await order.save({ transaction: t });

        await t.commit();

        const fullOrder = await RentalOrder.findByPk(orderId, {
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

module.exports = {
    processPickup,
    processReturn
};
