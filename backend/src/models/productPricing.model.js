const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductPricing = sequelize.define('ProductPricing', {
    pricing_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        references: { model: 'products', key: 'product_id' }
    },
    unit_id: {
        type: DataTypes.INTEGER,
        references: { model: 'pricing_units', key: 'unit_id' }
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

module.exports = ProductPricing;
