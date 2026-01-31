const { sequelize, User, Role, UserRole, AdminProfile } = require('./src/models');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // 1. Ensure keys exist
        // (Assuming sync is handled by app.js or manual)
        // For safety, force sync ONLY for AdminProfile if it's new
        await AdminProfile.sync();

        // 2. Check if Admin exists
        const adminEmail = 'admin@rentalsys.com';
        let adminUser = await User.findOne({ where: { email: adminEmail } });

        if (!adminUser) {
            console.log('Creating Admin User...');
            const hashedPassword = await bcrypt.hash('Admin@123', 10);
            adminUser = await User.create({
                email: adminEmail,
                password_hash: hashedPassword,
                status: 'ACTIVE'
            });

            // Role
            const adminRole = await Role.findOne({ where: { role_code: 'ADMIN' } });
            if (adminRole) {
                await UserRole.create({
                    user_id: adminUser.user_id,
                    role_id: adminRole.role_id
                });
            } else {
                console.error("ADMIN Role not found! Run seed_roles.js first.");
            }

            // Profile
            await AdminProfile.create({
                admin_id: adminUser.user_id,
                admin_level: 1
            });

            console.log('Admin User Created Successfully!');
            console.log('Email: admin@rentalsys.com');
            console.log('Password: Admin@123');
        } else {
            console.log('Admin User already exists.');
            // Ensure profile exists
            const profile = await AdminProfile.findByPk(adminUser.user_id);
            if (!profile) {
                await AdminProfile.create({
                    admin_id: adminUser.user_id,
                    admin_level: 1
                });
                console.log('Admin Profile linked to existing user.');
            }
        }

    } catch (error) {
        console.error('Seeding Failed:', error);
    } finally {
        await sequelize.close();
    }
}

seedAdmin();
