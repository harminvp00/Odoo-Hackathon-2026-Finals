const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const VendorProfile = sequelize.define('VendorProfile', {
    vendor_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: { model: User, key: 'user_id' }
    },
    company_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    gstin: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false
    },
    business_address: {
        type: DataTypes.TEXT
    },
}, {
    tableName: 'vendor_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = VendorProfile;
