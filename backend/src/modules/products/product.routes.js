const express = require('express');
const router = express.Router();
const productController = require('./product.controller');
const upload = require('../../middleware/upload.middleware');
const { verifyToken, verifyVendor } = require('../../middleware/auth.middleware');

// Public Routes
router.get('/', productController.getAllProducts);

// Protected Routes
router.get('/my-products', verifyToken, verifyVendor, productController.getMyProducts); // Added verifyToken
router.post('/', verifyToken, verifyVendor, upload.array('images', 5), productController.createProduct); // Added verifyToken
router.put('/:id', verifyToken, verifyVendor, productController.updateProduct);
router.delete('/:id', verifyToken, verifyVendor, productController.deleteProduct);

// Public but with ID
router.get('/:id', productController.getProductById);

module.exports = router;
