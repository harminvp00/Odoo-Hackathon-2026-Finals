const { User, Product, sequelize } = require('./src/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const diagnose = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        // 1. List All Users and their Role
        const users = await User.findAll({ attributes: ['user_id', 'email', 'status'] }); // role is in nested table usually, but let's check basic
        console.log('\n--- USERS ---');
        console.log(JSON.stringify(users, null, 2));

        // 2. List All Products with VendorID
        const products = await Product.findAll();
        console.log('\n--- PRODUCTS ---');
        console.log(JSON.stringify(products, null, 2));

        if (users.length > 0 && products.length > 0) {
            const sampleVendorId = products[0].vendor_id;
            console.log(`\nChecking mapping for Product[0] VendorID: ${sampleVendorId}`);
            const vendorUser = await User.findByPk(sampleVendorId);
            console.log('Vendor User found:', vendorUser ? vendorUser.email : 'NOT FOUND');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
};

diagnose();
