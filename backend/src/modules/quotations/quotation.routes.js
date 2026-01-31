const express = require('express');
const router = express.Router();
const quotationController = require('./quotation.controller');
const { verifyToken } = require('../../middleware/auth.middleware');

router.post('/', verifyToken, quotationController.createQuotation);
router.get('/', verifyToken, quotationController.getQuotations); // New list endpoint
router.get('/:id', verifyToken, quotationController.getQuotation);

module.exports = router;
