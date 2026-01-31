const dotenv = require('dotenv');
dotenv.config();
const { sequelize, ProductPricing, PricingUnit, ProductAttributeValue } = require('./src/models');

async function syncAdvanced() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        await PricingUnit.sync();
        await ProductPricing.sync();
        await ProductAttributeValue.sync();

        console.log('Tables synced.');
    } catch (error) {
        console.error('Sync failed:', error);
    } finally {
        await sequelize.close();
    }
}

syncAdvanced();
