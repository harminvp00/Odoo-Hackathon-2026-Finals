const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product.model');
const RentalOrderItem = require('./rentalOrderItem.model');

const Reservation = sequelize.define('Reservation', {
    reservation_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        references: { model: Product, key: 'product_id' }
    },
    order_item_id: {
        type: DataTypes.BIGINT,
        references: { model: RentalOrderItem, key: 'order_item_id' }
    },
    start_date: {
        type: DataTypes.DATE
    },
    end_date: {
        type: DataTypes.DATE
    },
    quantity: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'reservations',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Reservation;
