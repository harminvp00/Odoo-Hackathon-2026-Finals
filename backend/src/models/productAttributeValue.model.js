const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductAttributeValue = sequelize.define('ProductAttributeValue', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.BIGINT,
        references: { model: 'products', key: 'product_id' }
    },
    value_id: {
        type: DataTypes.INTEGER,
        references: { model: 'attribute_values', key: 'value_id' }
    }
}, {
    tableName: 'product_attribute_values',
    timestamps: false
});

module.exports = ProductAttributeValue;
