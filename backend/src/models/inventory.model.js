const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product.model');

const Inventory = sequelize.define('Inventory', {
    inventory_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        unique: true,
        references: { model: Product, key: 'product_id' }
    },
    total_quantity: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'inventory',
    timestamps: false
});

module.exports = Inventory;
