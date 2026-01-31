const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PricingUnit = sequelize.define('PricingUnit', {
    unit_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    unit_code: {
        type: DataTypes.STRING(50)
    }
}, {
    tableName: 'pricing_units',
    timestamps: false
});

module.exports = PricingUnit;
