const express = require('express');
const router = express.Router();
const attributeController = require('./attribute.controller');
const { verifyToken, verifyAdmin, verifyVendor } = require('../../middleware/auth.middleware');

// Both Admins and Vendors might need to see attributes.
// Only Admins (or maybe Vendors?) should create generic attributes. 
// For now, let's allow Vendors to create attributes for flexibility.
router.post('/', verifyToken, verifyVendor, attributeController.createAttribute);
router.get('/', verifyToken, attributeController.getAttributes);

module.exports = router;
