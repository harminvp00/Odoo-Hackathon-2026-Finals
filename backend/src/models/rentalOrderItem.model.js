const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const RentalOrder = require('./rentalOrder.model');
const Product = require('./product.model');

const RentalOrderItem = sequelize.define('RentalOrderItem', {
    order_item_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.BIGINT,
        references: { model: RentalOrder, key: 'order_id' }
    },
    product_id: {
        type: DataTypes.BIGINT,
        references: { model: Product, key: 'product_id' }
    },
    start_date: {
        type: DataTypes.DATE
    },
    end_date: {
        type: DataTypes.DATE
    },
    quantity: {
        type: DataTypes.INTEGER
    },
    final_price: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    tableName: 'rental_order_items',
    timestamps: false
});

module.exports = RentalOrderItem;
