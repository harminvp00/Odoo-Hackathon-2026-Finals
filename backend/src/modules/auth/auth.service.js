const { sequelize, User, Role, UserRole, CustomerProfile, VendorProfile } = require('../../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (authData, profileData) => {
    const t = await sequelize.transaction();
    try {
        const { email, password, role } = authData;

        // 1. Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // 2. Validate Role
        if (!role) throw new Error("Role is undefined in service");

        const roleRecord = await Role.findOne({ where: { role_code: role } });
        if (!roleRecord) {
            throw new Error(`Invalid role code: ${role}`);
        }

        // 3. Create User
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password_hash: hashedPassword,
            status: 'ACTIVE'
        }, { transaction: t });

        // 4. Assign Role
        await UserRole.create({
            user_id: user.user_id,
            role_id: roleRecord.role_id
        }, { transaction: t });

        // 5. Create Profile
        if (role === 'CUSTOMER') {
            await CustomerProfile.create({
                customer_id: user.user_id,
                full_name: profileData.full_name,
                phone: profileData.phone
            }, { transaction: t });
        } else if (role === 'VENDOR') {
            await VendorProfile.create({
                vendor_id: user.user_id,
                company_name: profileData.company_name,
                gstin: profileData.gstin,
                business_address: profileData.business_address
            }, { transaction: t });
        }

        await t.commit();
        return user;
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const loginUser = async (email, password) => {
    const user = await User.findOne({
        where: { email },
        include: [
            { model: UserRole, include: [Role] },
            { model: CustomerProfile },
            { model: VendorProfile }
        ]
    });

    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) throw new Error('Invalid credentials');

    if (user.status !== 'ACTIVE') throw new Error('Account is not active');

    const roleCode = user.UserRoles[0]?.Role?.role_code || 'USER';

    // Determine Name
    let displayName = 'User';
    if (roleCode === 'CUSTOMER' && user.CustomerProfile) {
        displayName = user.CustomerProfile.full_name;
    } else if (roleCode === 'VENDOR' && user.VendorProfile) {
        displayName = user.VendorProfile.company_name;
    } else if (roleCode === 'ADMIN' && user.AdminProfile) {
        displayName = "Admin";
    }

    // Generate Token
    const token = jwt.sign(
        {
            id: user.user_id,
            email: user.email,
            role: roleCode
        },
        process.env.JWT_SECRET || 'secret_key',
        { expiresIn: '1d' }
    );

    return {
        token,
        user: {
            id: user.user_id,
            email: user.email,
            name: displayName,
            role: roleCode
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};
