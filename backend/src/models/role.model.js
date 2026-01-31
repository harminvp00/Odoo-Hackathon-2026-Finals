const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_code: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;
