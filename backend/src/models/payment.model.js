const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Invoice = require('./invoice.model');

const Payment = sequelize.define('Payment', {
    payment_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    invoice_id: {
        type: DataTypes.BIGINT,
        references: { model: Invoice, key: 'invoice_id' }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2)
    },
    payment_method: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'payments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Payment;
