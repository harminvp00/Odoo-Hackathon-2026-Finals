const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CustomerProfile = require('./customerProfile.model');

const Quotation = sequelize.define('Quotation', {
    quotation_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.BIGINT,
        references: { model: CustomerProfile, key: 'customer_id' }
    },
    status: {
        type: DataTypes.ENUM('DRAFT', 'SENT', 'CONFIRMED')
    },
}, {
    tableName: 'quotations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Quotation;
