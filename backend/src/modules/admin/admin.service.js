const { User, RentalOrder, Product, Invoice, sequelize } = require('../../models');
const { Op } = require('sequelize');

const getGlobalStats = async () => {
    // 1. Total Revenue (Sum of PAID invoices)
    const revenueResult = await Invoice.sum('total', { where: { status: 'PAID' } });
    const totalRevenue = revenueResult || 0;

    // 2. Active Rentals
    const activeRentals = await RentalOrder.count({ where: { status: 'ACTIVE' } });

    // 3. User Counts
    const totalUsers = await User.count();

    // 4. Product Counts
    const totalProducts = await Product.count();
    const activeProducts = await Product.count({ where: { status: 'ACTIVE' } });

    return {
        totalRevenue: parseFloat(totalRevenue).toFixed(2),
        activeRentals,
        totalUsers,
        totalProducts,
        activeProducts
    };
};

const getRecentOrders = async () => {
    return await RentalOrder.findAll({
        limit: 10,
        order: [['created_at', 'DESC']],
        include: ['Customer'] // detailed info
    });
};

module.exports = {
    getGlobalStats,
    getRecentOrders
};
