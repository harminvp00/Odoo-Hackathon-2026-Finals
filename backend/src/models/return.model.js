const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RentalOrder = require('./rentalOrder.model');

const Return = sequelize.define('Return', {
    return_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        references: { model: RentalOrder, key: 'order_id' }
    },
    actual_return_time: {
        type: DataTypes.DATE
    },
    late_fee: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    tableName: 'returns',
    timestamps: false
});

module.exports = Return;
