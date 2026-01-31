const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const CustomerProfile = require('./customerProfile.model');
const Quotation = require('./quotation.model');

const RentalOrder = sequelize.define('RentalOrder', {
    order_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.BIGINT,
        references: { model: CustomerProfile, key: 'customer_id' }
    },
    quotation_id: {
        type: DataTypes.BIGINT,
        references: { model: Quotation, key: 'quotation_id' }
    },
    status: {
        type: DataTypes.ENUM('CONFIRMED', 'ACTIVE', 'COMPLETED')
    },
}, {
    tableName: 'rental_orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = RentalOrder;
