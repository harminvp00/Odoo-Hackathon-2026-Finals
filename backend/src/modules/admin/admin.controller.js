const adminService = require('./admin.service');

const getDashboardStats = async (req, res) => {
    try {
        const stats = await adminService.getGlobalStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecentActivity = async (req, res) => {
    try {
        const orders = await adminService.getRecentOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats,
    getRecentActivity
};
