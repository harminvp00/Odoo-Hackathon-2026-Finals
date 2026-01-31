const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SystemSetting = sequelize.define('SystemSetting', {
    setting_key: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    setting_value: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'system_settings',
    timestamps: false
});

module.exports = SystemSetting;
