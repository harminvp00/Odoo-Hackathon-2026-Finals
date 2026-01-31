const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');
const { verifyToken } = require('../../middleware/auth.middleware');

router.post('/', verifyToken, orderController.createOrder); // Create from Quotation
router.get('/', verifyToken, orderController.getOrders);

module.exports = router;
