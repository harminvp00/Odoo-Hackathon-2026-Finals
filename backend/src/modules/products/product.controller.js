const productService = require('./product.service');
const { Product } = require('../../models');

const createProduct = async (req, res) => {
    try {
        console.log("DEBUG: createProduct Body:", req.body);
        console.log("DEBUG: createProduct User:", req.user);

        const productData = req.body;
        // Vendor ID should come from the logged-in user's profile
        // Schema: vendor_id FK users(user_id)
        productData.vendor_id = req.user.id;

        console.log("DEBUG: Creating Product with Vendor ID:", productData.vendor_id);

        if (req.files) {
            productData.images = req.files;
        }

        if (req.body.pricing) {
            try {
                productData.pricing = JSON.parse(req.body.pricing);
            } catch (e) {
                console.error("Parsing pricing failed", e);
                return res.status(400).json({ message: "Invalid pricing format" });
            }
        }

        const product = await productService.createProduct(productData, productData.vendor_id, req.files);
        res.status(201).json(product);
    } catch (error) {
        console.error("DEBUG: createProduct Error:", error);
        res.status(400).json({ message: error.message });
    }
};

const getMyProducts = async (req, res) => {
    try {
        // DEBUG LOGGING
        console.log("DEBUG: getMyProducts Request User:", req.user);

        // In the User Schema provided:
        // vendor_id is the primary key of vendor_profiles and refers to users(user_id)
        // So vendor_id === user_id

        const vendorId = req.user.id;

        console.log("DEBUG: Using Vendor ID:", vendorId);

        // Call generic getAllProducts with vendor_id filter
        const products = await productService.getAllProducts({ vendor_id: vendorId });

        console.log("DEBUG: Found Products:", products.length);

        res.json(products);
    } catch (error) {
        console.error("DEBUG: getMyProducts Error:", error);
        res.status(500).json({ message: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const filters = req.query;
        const products = await productService.getAllProducts(filters);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Access Control: Strict check for INACTIVE products
        // Access Control: Strict check for INACTIVE products
        const requestingUser = req.user?.id; // May be undefined if public route
        // Use loose equality (==) because database ID might be string vs number
        const isOwner = requestingUser && requestingUser == product.vendor_id;

        console.log(`[DEBUG] getProductById: ProductStatus=${product.status}, User=${requestingUser}, Owner=${product.vendor_id}, isOwner=${isOwner}`);

        if (product.status === 'INACTIVE' && !isOwner) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorId = req.user.id;
        const updatedProduct = await productService.updateProduct(id, req.body, vendorId);
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    console.log(`DELETE Request for ID: ${req.params.id}, Vendor: ${req.user.id}`);
    try {
        const { id } = req.params;
        const vendorId = req.user.id;
        const result = await productService.deleteProduct(id, vendorId);
        res.json(result);
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createProduct,
    getMyProducts,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
