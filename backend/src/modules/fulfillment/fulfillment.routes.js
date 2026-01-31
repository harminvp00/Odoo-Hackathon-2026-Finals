const express = require('express');
const router = express.Router();
const fulfillmentController = require('./fulfillment.controller');
const { verifyToken, verifyVendor } = require('../../middleware/auth.middleware');

router.post('/pickup', verifyToken, verifyVendor, fulfillmentController.processPickup);
router.post('/return', verifyToken, verifyVendor, fulfillmentController.processReturn);

module.exports = router;
