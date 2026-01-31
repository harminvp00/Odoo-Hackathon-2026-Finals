const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product.model');

const PricingUnit = sequelize.define('PricingUnit', {
    unit_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    unit_code: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'pricing_units',
    timestamps: false
});

const ProductPricing = sequelize.define('ProductPricing', {
    pricing_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        references: { model: Product, key: 'product_id' }
    },
    unit_id: {
        type: DataTypes.INTEGER,
        references: { model: PricingUnit, key: 'unit_id' }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    min_duration: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'product_pricing',
    timestamps: false
});

// Associations defined in index.js usually, but helpful here or index.
module.exports = { PricingUnit, ProductPricing };
