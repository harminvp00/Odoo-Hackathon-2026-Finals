const dotenv = require('dotenv');
dotenv.config();
const { sequelize, Product, ProductPricing } = require('./src/models');

async function debugModels() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        console.log("Checking Product Model...");
        const products = await Product.findAll({ limit: 1 });
        console.log("Products found:", products.length);

        console.log("Checking ProductPricing Model...");
        try {
            const pricing = await ProductPricing.findAll({ limit: 1 });
            console.log("ProductPricing found:", pricing.length);
        } catch (e) {
            console.error("ProductPricing Error:", e.message);
        }

        console.log("Done.");
    } catch (error) {
        console.error('CRITICAL FAILURE:', error);
    } finally {
        if (sequelize) await sequelize.close();
    }
}

debugModels();
