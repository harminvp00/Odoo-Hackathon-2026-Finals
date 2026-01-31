const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const CustomerProfile = sequelize.define('CustomerProfile', {
    customer_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: { model: User, key: 'user_id' }
    },
    full_name: {
        type: DataTypes.STRING(150)
    },
    phone: {
        type: DataTypes.STRING(20)
    },
}, {
    tableName: 'customer_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = CustomerProfile;
