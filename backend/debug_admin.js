const { sequelize } = require('./src/models');
const adminService = require('./src/modules/admin/admin.service');

const runDebug = async () => {
    try {
        console.log("--- Connecting to Database ---");
        await sequelize.authenticate();
        console.log("Database Connection Successful.");

        console.log("\n--- Testing Global Stats ---");
        const stats = await adminService.getGlobalStats();
        console.log("Global Stats Result:", JSON.stringify(stats, null, 2));

        console.log("\n--- Testing Recent Orders ---");
        const orders = await adminService.getRecentOrders();
        console.log(`Recent Orders Found: ${orders.length}`);
        if (orders.length > 0) {
            console.log("First Order Sample:", JSON.stringify(orders[0], null, 2));
        }

        console.log("\n--- Testing Analytics Data ---");
        const analytics = await adminService.getAnalyticsData();
        console.log("Analytics Result:", JSON.stringify(analytics, null, 2));

    } catch (error) {
        console.error("DEBUG ERROR:", error);
    } finally {
        await sequelize.close();
    }
};

runDebug();
