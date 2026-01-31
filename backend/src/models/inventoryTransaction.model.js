const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product.model');

const InventoryTransaction = sequelize.define('InventoryTransaction', {
    transaction_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        references: { model: Product, key: 'product_id' }
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    transaction_type: {
        type: DataTypes.ENUM('IN', 'OUT', 'ADJUST')
    },
    reference_type: {
        type: DataTypes.STRING(50)
    },
    reference_id: {
        type: DataTypes.BIGINT
    }
}, {
    tableName: 'inventory_transactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = InventoryTransaction;
