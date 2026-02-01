const orderService = require('./order.service');

const mailService = require('../../services/mail.service');

const createOrder = async (req, res) => {
    try {
        const { quotation_id } = req.body;
        const order = await orderService.createOrderFromQuotation(quotation_id);

        // Send Confirmation Email
        if (order.CustomerProfile && order.CustomerProfile.User) {
            await mailService.sendOrderStatusEmail(
                order.CustomerProfile.User.email,
                order.order_id,
                'CONFIRMED'
            );
        }

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

const getOrders = async (req, res) => {
    try {
        // req.user is populated by verifyToken
        const orders = await orderService.getAllOrders(req.user);
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getOrders
};
