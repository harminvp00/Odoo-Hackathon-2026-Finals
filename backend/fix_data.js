const { sequelize, User, Product, VendorProfile } = require('./src/models');

const fixData = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected.');

        // 1. Find the first Vendor user
        // We look for a user who has a VendorProfile
        const vendorProfile = await VendorProfile.findOne();

        if (!vendorProfile) {
            console.log('No Vendor Profile found! Please register as a vendor first.');
            return;
        }

        const vendorId = vendorProfile.vendor_id;
        console.log(`Found Vendor ID: ${vendorId} (Company: ${vendorProfile.company_name})`);

        // 2. Update ALL products to this vendor_id
        // This is a dev-only hack to ensure visibility
        const [updatedRows] = await Product.update(
            { vendor_id: vendorId },
            { where: {} } // Start with updating ALL. If you handled multiple users, filtering would be needed.
        );

        console.log(`Updated ${updatedRows} products to belong to Vendor ${vendorId}.`);

        // 3. Verify
        const products = await Product.findAll({ where: { vendor_id: vendorId } });
        console.log(`Verification: Found ${products.length} products for this vendor.`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
};

fixData();
