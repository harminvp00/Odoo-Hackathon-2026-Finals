const fulfillmentService = require('./fulfillment.service');
const mailService = require('../../services/mail.service');

const processPickup = async (req, res) => {
    try {
        const { order_id } = req.body;
        const result = await fulfillmentService.processPickup(order_id);

        // Send Active Email
        if (result.CustomerProfile && result.CustomerProfile.User) {
            await mailService.sendOrderStatusEmail(
                result.CustomerProfile.User.email,
                result.order_id,
                'ACTIVE'
            );
        }

        res.json({ message: 'Pickup processed successfully', order: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const processReturn = async (req, res) => {
    try {
        const { order_id } = req.body;
        const result = await fulfillmentService.processReturn(order_id);

        // Send Completed Email
        if (result.CustomerProfile && result.CustomerProfile.User) {
            await mailService.sendOrderStatusEmail(
                result.CustomerProfile.User.email,
                result.order_id,
                'COMPLETED'
            );
        }

        res.json({ message: 'Return processed successfully', order: result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    processPickup,
    processReturn
};
