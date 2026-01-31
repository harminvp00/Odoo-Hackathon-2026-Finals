const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
// const Attribute = require('./attribute.model'); // Circular dep risk if mapped here, usually safe to skip import in define if separate

const AttributeValue = sequelize.define('AttributeValue', {
    value_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    attribute_id: {
        type: DataTypes.INTEGER,
        // references handled in index.js usually, or:
        // references: { model: 'attributes', key: 'attribute_id' }
    },
    value: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'attribute_values',
    timestamps: false
});

module.exports = AttributeValue;
