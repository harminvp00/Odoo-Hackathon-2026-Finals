const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RentalOrder = require('./rentalOrder.model');

const Invoice = sequelize.define('Invoice', {
    invoice_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        references: { model: RentalOrder, key: 'order_id' }
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2)
    },
    tax_amount: {
        type: DataTypes.DECIMAL(10, 2)
    },
    deposit: {
        type: DataTypes.DECIMAL(10, 2)
    },
    total: {
        type: DataTypes.DECIMAL(10, 2)
    },
    status: {
        type: DataTypes.ENUM('DRAFT', 'PARTIAL', 'PAID')
    }
}, {
    tableName: 'invoices',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Invoice;
