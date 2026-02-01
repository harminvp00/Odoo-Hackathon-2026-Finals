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

const getUsers = async (req, res) => {
    try {
        const users = await adminService.getAllUsers(req.query.role);
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const { type } = req.query; // 'vendor' or 'customer' hint

        // Simple logic: try detailed fetch based on heuristic or just generic
        // We exposed two service methods. Let's decide based on query param or try one then other?
        // Better: adminService.getUserDetails (generic) or specific stats.

        let data;
        if (type === 'VENDOR') {
            data = await adminService.getVendorDetails(id);
        } else {
            data = await adminService.getUserDetails(id);
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = await adminService.updateUserStatus(id, status);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSettings = async (req, res) => {
    try {
        const settings = await adminService.getSystemSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSettings = async (req, res) => {
    try {
        const settings = await adminService.updateSystemSettings(req.body);
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAnalytics = async (req, res) => {
    try {
        const data = await adminService.getAnalyticsData();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats,
    getRecentActivity,
    getUsers,
    getUserDetails,
    updateUserStatus,
    getSettings,
    updateSettings,
    getAnalytics
};
