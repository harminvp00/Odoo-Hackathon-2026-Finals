const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const { verifyToken, verifyAdmin } = require('../../middleware/auth.middleware');

// Protect all admin routes
// NOTE: verifyAdmin needs to be implemented or ensured in auth.middleware
router.get('/stats', verifyToken, verifyAdmin, adminController.getDashboardStats);
router.get('/activity', verifyToken, verifyAdmin, adminController.getRecentActivity);

module.exports = router;
