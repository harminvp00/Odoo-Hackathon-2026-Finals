const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Import Routes
const authRoutes = require('./modules/auth/auth.routes');
const productRoutes = require('./modules/products/product.routes');
const quotationRoutes = require('./modules/quotations/quotation.routes');
const orderRoutes = require('./modules/orders/order.routes');
const invoiceRoutes = require('./modules/invoices/invoice.routes');
const fulfillmentRoutes = require('./modules/fulfillment/fulfillment.routes');
const adminRoutes = require('./modules/admin/admin.routes');
const attributeRoutes = require('./modules/products/attribute.routes');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/fulfillment', fulfillmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/attributes', attributeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    if (err.name === 'MulterError') {
        // Multer specific errors
        return res.status(400).json({
            message: `Upload Error: ${err.message}`,
            code: err.code
        });
    } else if (err) {
        // Generic errors
        console.error("Server Error:", err);
        return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
    next();
});

// Database Connection and Server Start
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.sync({ alter: false }); // Use alter: true carefully in dev
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

if (require.main === module) {
    startServer();
}

module.exports = app;
