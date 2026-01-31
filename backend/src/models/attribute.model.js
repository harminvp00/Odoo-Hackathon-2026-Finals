const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Attribute = sequelize.define('Attribute', {
    attribute_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    attribute_name: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'attributes',
    timestamps: false
});

module.exports = Attribute;
