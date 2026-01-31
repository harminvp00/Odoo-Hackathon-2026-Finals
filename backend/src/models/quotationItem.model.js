const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Quotation = require('./quotation.model');
const Product = require('./product.model');

const QuotationItem = sequelize.define('QuotationItem', {
    item_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    quotation_id: {
        type: DataTypes.BIGINT,
        references: { model: Quotation, key: 'quotation_id' }
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
    price_snapshot: {
        type: DataTypes.DECIMAL(10, 2)
    }
}, {
    tableName: 'quotation_items',
    timestamps: false
});

module.exports = QuotationItem;
