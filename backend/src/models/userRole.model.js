const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');
const Role = require('./role.model');

const UserRole = sequelize.define('UserRole', {
    user_role_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'role_id'
        }
    }
}, {
    tableName: 'user_roles',
    timestamps: false
});

module.exports = UserRole;
