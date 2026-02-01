const authService = require('./auth.service');
const mailService = require('../../services/mail.service');

const register = async (req, res) => {
    try {
        console.log("Register Request Body:", req.body);
        const { email, password, role, ...profileData } = req.body;

        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }

        const user = await authService.registerUser({ email, password, role }, profileData);

        // Send Welcome Email
        const name = profileData.full_name || profileData.company_name || 'User';
        await mailService.sendWelcomeEmail(email, name);

        res.status(201).json({ message: "User registered successfully", userId: user.user_id });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.json(result);
    } catch (error) {
        console.error("Login Error:", error);
        res.status(401).json({ message: error.message });
    }
};

const registerVendor = async (req, res) => {
    try {
        console.log("Register Vendor Body:", req.body);
        const { email, password, ...profileData } = req.body;
        const user = await authService.registerUser({ email, password, role: 'VENDOR' }, profileData);

        // Send Welcome Email
        const name = profileData.company_name || 'Vendor';
        await mailService.sendWelcomeEmail(email, name);

        res.status(201).json({ message: "Vendor registered successfully", userId: user.user_id });
    } catch (error) {
        console.error("Vendor Register Error:", error);
        res.status(400).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const token = await authService.generatePasswordResetToken(email);
        await mailService.sendPasswordResetEmail(email, token);
        res.json({ message: "Password reset email sent" });
    } catch (error) {
        // Generic message for security
        res.status(200).json({ message: "If email exists, reset link sent" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        await authService.resetPassword(token, newPassword);
        res.json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    registerVendor,
    forgotPassword,
    resetPassword
};
