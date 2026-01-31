const { sequelize, User, Role, UserRole } = require('./src/models');

const fixRoles = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected.');

        // 1. Get All Users
        const users = await User.findAll();

        console.log(`Found ${users.length} users.`);

        if (users.length === 0) {
            console.log('No users found.');
            return;
        }

        // 2. Find the VENDOR Role ID
        const vendorRole = await Role.findOne({ where: { role_code: 'VENDOR' } });
        if (!vendorRole) {
            console.error('CRITICAL: VENDOR role is missing from DB!');
            return;
        }
        console.log(`VENDOR Role ID is: ${vendorRole.role_id}`);

        // 3. For every user, ensure they have a role. 
        // For this fix, we will ask the user which email they are using, 
        // but since I can't interact, I will list users and update the FIRST one found to be VENDOR if they aren't already.
        // ACTUALLY, I will just update ALL users who have a VendorProfile to have the VENDOR role.

        const { VendorProfile } = require('./src/models');
        const profiles = await VendorProfile.findAll();

        for (const profile of profiles) {
            const userId = profile.vendor_id;
            console.log(`Checking Role for User ID ${userId} (Company: ${profile.company_name})...`);

            // Check existing role
            const userRole = await UserRole.findOne({ where: { user_id: userId } });

            if (userRole) {
                console.log(`User has Role ID: ${userRole.role_id}`);
                if (userRole.role_id !== vendorRole.role_id) {
                    console.log(`UPDATING to VENDOR role...`);
                    userRole.role_id = vendorRole.role_id;
                    await userRole.save();
                    console.log('Updated.');
                } else {
                    console.log('Already has VENDOR role.');
                }
            } else {
                console.log(`User has NO role. Assigning VENDOR role...`);
                await UserRole.create({
                    user_id: userId,
                    role_id: vendorRole.role_id
                });
                console.log('Created.');
            }
        }

        console.log('Done checking roles.');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
};

fixRoles();
