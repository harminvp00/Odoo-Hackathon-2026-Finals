const { Product, User, VendorProfile, sequelize } = require('./src/models');

const auditProducts = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        console.log('\n--- USERS ---');
        const users = await User.findAll();
        users.forEach(u => console.log(`ID: ${u.user_id}, Email: ${u.email}, Role Code: ${u.role_code}`)); // Note: standard schema might differ slightly on role storing

        console.log('\n--- VENDOR PROFILES ---');
        const vendors = await VendorProfile.findAll();
        vendors.forEach(v => console.log(`VendorID: ${v.vendor_id}, Company: ${v.company_name}`));

        console.log('\n--- PRODUCTS ---');
        const products = await Product.findAll();
        products.forEach(p => console.log(`ID: ${p.product_id}, Name: ${p.name}, VendorID: ${p.vendor_id}`));

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
};

auditProducts();
