const invoiceService = require('./invoice.service');

const createInvoice = async (req, res) => {
    try {
        const { order_id } = req.body;
        const invoice = await invoiceService.createInvoice(order_id);
        res.status(201).json(invoice);
    } catch (error) {
        console.error("Create Invoice Error:", error);
        res.status(400).json({ message: error.message });
    }
};

const getInvoiceById = async (req, res) => {
    try {
        const invoice = await invoiceService.getInvoiceById(req.params.id);
        if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInvoices = async (req, res) => {
    try {
        // req.user is populated by verifyToken
        const invoices = await invoiceService.getAllInvoices(req.user);
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createInvoice,
    getInvoiceById,
    getInvoices
};
