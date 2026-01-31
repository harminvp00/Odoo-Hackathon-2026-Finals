const fulfillmentService = require('./fulfillment.service');

const processPickup = async (req, res) => {
    try {
        const { order_id } = req.body;
        const result = await fulfillmentService.processPickup(order_id);
        res.json({ message: 'Pickup processed successfully', order: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const processReturn = async (req, res) => {
    try {
        const { order_id } = req.body;
        const result = await fulfillmentService.processReturn(order_id);
        res.json({ message: 'Return processed successfully', order: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    processPickup,
    processReturn
};
