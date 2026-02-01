const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');
const { verifyToken, verifyAdmin } = require('../../middleware/auth.middleware');

// All admin routes require Token AND Admin Role
router.use(verifyToken, verifyAdmin);

router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/dashboard/activity', adminController.getRecentActivity);
router.get('/dashboard/analytics', adminController.getAnalytics);

// User Management
router.get('/users', adminController.getUsers);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id/status', adminController.updateUserStatus);

// System Settings
router.get('/settings', adminController.getSettings);
router.post('/settings', adminController.updateSettings);

module.exports = router;
