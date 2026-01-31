const dotenv = require('dotenv');
dotenv.config();
const { sequelize, User, Role, UserRole } = require('./src/models');

async function debugUsers() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const users = await User.findAll({
            include: [{ model: UserRole, include: [Role] }]
        });

        console.log(`Found ${users.length} users.`);
        users.forEach(u => {
            const role = u.UserRoles[0]?.Role?.role_code || 'NONE';
            console.log(`ID: ${u.user_id} | Email: ${u.email} | Role: ${role} | Status: ${u.status}`);
        });

    } catch (error) {
        console.error('Debug Failed:', error);
    } finally {
        await sequelize.close();
    }
}

debugUsers();
