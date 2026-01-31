const quotationService = require('./quotation.service');

const createQuotation = async (req, res) => {
    try {
        // Assuming req.user is populated and is a Customer
        const customerId = req.user.id; // In real app, map user_id to customer_id or ensure they match
        const quotation = await quotationService.createQuotation(customerId, req.body.items);
        res.status(201).json(quotation);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

const getQuotation = async (req, res) => {
    try {
        const quotation = await quotationService.getQuotationById(req.params.id);
        if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
        res.json(quotation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getQuotations = async (req, res) => {
    try {
        // req.user is set by verifyToken middleware (which we fixed)
        const quotations = await quotationService.getAllQuotations(req.user);
        res.json(quotations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createQuotation,
    getQuotation,
    getQuotations // New export
};
