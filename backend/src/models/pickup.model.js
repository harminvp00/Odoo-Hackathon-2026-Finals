const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RentalOrder = require('./rentalOrder.model');

const Pickup = sequelize.define('Pickup', {
    pickup_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        references: { model: RentalOrder, key: 'order_id' }
    },
    pickup_time: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED')
    }
}, {
    tableName: 'pickups',
    timestamps: false
});

module.exports = Pickup;
