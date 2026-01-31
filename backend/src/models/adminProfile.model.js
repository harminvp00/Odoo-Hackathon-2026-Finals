const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const AdminProfile = sequelize.define('AdminProfile', {
    admin_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: { model: User, key: 'user_id' }
    },
    admin_level: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    tableName: 'admin_profiles',
    timestamps: false
});

module.exports = AdminProfile;
