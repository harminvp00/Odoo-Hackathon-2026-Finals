const { Invoice, RentalOrder, RentalOrderItem, Quotation, QuotationItem, Product, CustomerProfile, VendorProfile, User } = require('../../models');

const createInvoice = async (orderId) => {
    const order = await RentalOrder.findByPk(orderId, {
        include: [RentalOrderItem]
    });

    if (!order) throw new Error('Order not found');

    const existingInvoice = await Invoice.findOne({ where: { order_id: orderId } });
    if (existingInvoice) return existingInvoice;

    let subtotal = 0;
    for (const item of order.RentalOrderItems) {
        // final_price is the total price for that line item calculated at order time
        subtotal += parseFloat(item.final_price);
    }

    const taxRate = 0.18; // 18% GST standard
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    // Deposit logic could be added here (e.g. 20% of equipment value), but keeping simple for now
    const deposit = 0;

    const invoice = await Invoice.create({
        order_id: orderId,
        subtotal: subtotal.toFixed(2),
        tax_amount: taxAmount.toFixed(2),
        deposit: deposit.toFixed(2),
        total: total.toFixed(2),
        status: 'DRAFT'
    });

    return invoice;
};

const getInvoiceById = async (invoiceId) => {
    return await Invoice.findByPk(invoiceId, {
        include: [
            {
                model: RentalOrder,
                include: [
                    { model: RentalOrderItem, include: [Product] },
                    { model: CustomerProfile } // Removed 'User' as CustomerProfile is linked to order via customer_id usually
                ]
            }
        ]
    });
};

const getAllInvoices = async (user) => {
    // Basic Include
    // Invoice -> Order -> Items -> Product
    const includeOptions = [
        {
            model: RentalOrder,
            required: true,
            include: [
                { model: CustomerProfile },
                {
                    model: RentalOrderItem,
                    include: [Product]
                }
            ]
        }
    ];

    let whereClause = {};

    // 1. If Customer, filter by Order.customer_id
    if (user.role === 'CUSTOMER') {
        includeOptions[0].where = { customer_id: user.id };
    }
    // 2. If Vendor, filter by Order.Items.Product.vendor_id
    else if (user.role === 'VENDOR') {
        includeOptions[0].include[1] = { // Targeting RentalOrderItem
            model: RentalOrderItem,
            required: true,
            include: [{
                model: Product,
                where: { vendor_id: user.id },
                required: true
            }]
        };
    }

    return await Invoice.findAll({
        where: whereClause,
        include: includeOptions,
        order: [['created_at', 'DESC']]
    });
};

module.exports = {
    createInvoice,
    getInvoiceById,
    getInvoices: getAllInvoices, // Map to new function
    getAllInvoices
};
