const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied: Malformed Token' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

const verifyVendor = (req, res, next) => {
    // DEBUG: Log the user object
    console.log("DEBUG: verifyVendor Check ->", req.user);

    if (req.user && req.user.role === 'VENDOR') {
        next();
    } else {
        console.log("DEBUG: Access Denied. Role is:", req.user ? req.user.role : 'User is undefined');
        res.status(403).json({ message: "Access denied. Vendors only." });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

module.exports = { verifyToken, verifyVendor, verifyAdmin };
