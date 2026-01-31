const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./product.model');

const ProductMedia = sequelize.define('ProductMedia', {
    media_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        references: { model: Product, key: 'product_id' }
    },
    media_url: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'product_media',
    timestamps: false
});

module.exports = ProductMedia;
