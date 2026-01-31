const authService = require('./auth.service');

const register = async (req, res) => {
    try {
        console.log("Register Request Body:", req.body); // Debug log
        const { email, password, role, ...profileData } = req.body;

        if (!role) {
            return res.status(400).json({ message: "Role is required" });
        }

        const user = await authService.registerUser({ email, password, role }, profileData);
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
        res.status(201).json({ message: "Vendor registered successfully", userId: user.user_id });
    } catch (error) {
        console.error("Vendor Register Error:", error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    register,
    login,
    registerVendor
};
