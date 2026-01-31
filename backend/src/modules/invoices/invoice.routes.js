const express = require('express');
const router = express.Router();
const invoiceController = require('./invoice.controller');
const { verifyToken, verifyVendor } = require('../../middleware/auth.middleware');

// Public or Protected - Depending on requirements. Usually protected.
router.get('/', verifyToken, invoiceController.getInvoices);
router.get('/:id', verifyToken, invoiceController.getInvoiceById);

// Creation usually happens by Vendor accessing an Order
router.post('/', verifyToken, verifyVendor, invoiceController.createInvoice);

module.exports = router;
