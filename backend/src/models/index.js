const sequelize = require('../config/database');
const User = require('./user.model');
const Role = require('./role.model');
const UserRole = require('./userRole.model');
const CustomerProfile = require('./customerProfile.model');
const VendorProfile = require('./vendorProfile.model');
const AdminProfile = require('./adminProfile.model');
const Product = require('./product.model');
const ProductMedia = require('./productMedia.model');
const Attribute = require('./attribute.model');
const AttributeValue = require('./attributeValue.model');
const ProductAttributeValue = require('./productAttributeValue.model');
const PricingUnit = require('./pricingUnit.model');
const ProductPricing = require('./productPricing.model');
const Inventory = require('./inventory.model');
const InventoryTransaction = require('./inventoryTransaction.model');
const Quotation = require('./quotation.model');
const QuotationItem = require('./quotationItem.model');
const RentalOrder = require('./rentalOrder.model');
const RentalOrderItem = require('./rentalOrderItem.model');
const Reservation = require('./reservation.model');
const Pickup = require('./pickup.model');
const Return = require('./return.model');
const Invoice = require('./invoice.model');
const Payment = require('./payment.model');
const SystemSetting = require('./systemSetting.model');

// ==========================================
// User & Role Associations
// ==========================================
User.hasMany(UserRole, { foreignKey: 'user_id' });
UserRole.belongsTo(User, { foreignKey: 'user_id' });

Role.hasMany(UserRole, { foreignKey: 'role_id' });
UserRole.belongsTo(Role, { foreignKey: 'role_id' });

// ==========================================
// User Profile Associations
// ==========================================
User.hasOne(CustomerProfile, { foreignKey: 'customer_id' });
CustomerProfile.belongsTo(User, { foreignKey: 'customer_id' });

User.hasOne(VendorProfile, { foreignKey: 'vendor_id' });
VendorProfile.belongsTo(User, { foreignKey: 'vendor_id' });

User.hasOne(AdminProfile, { foreignKey: 'admin_id' });
AdminProfile.belongsTo(User, { foreignKey: 'admin_id' });

// ==========================================
// Product Associations
// ==========================================
VendorProfile.hasMany(Product, { foreignKey: 'vendor_id' });
Product.belongsTo(VendorProfile, { foreignKey: 'vendor_id' });

Product.hasMany(ProductMedia, { foreignKey: 'product_id' });
ProductMedia.belongsTo(Product, { foreignKey: 'product_id' });

// Attributes
Attribute.hasMany(AttributeValue, { foreignKey: 'attribute_id' });
AttributeValue.belongsTo(Attribute, { foreignKey: 'attribute_id' });

Product.hasMany(ProductAttributeValue, { foreignKey: 'product_id' });
ProductAttributeValue.belongsTo(Product, { foreignKey: 'product_id' });

AttributeValue.hasMany(ProductAttributeValue, { foreignKey: 'value_id' });
ProductAttributeValue.belongsTo(AttributeValue, { foreignKey: 'value_id' });

// Pricing
PricingUnit.hasMany(ProductPricing, { foreignKey: 'unit_id' });
ProductPricing.belongsTo(PricingUnit, { foreignKey: 'unit_id' });

Product.hasMany(ProductPricing, { foreignKey: 'product_id' });
ProductPricing.belongsTo(Product, { foreignKey: 'product_id' });

// ==========================================
// Inventory Associations
// ==========================================
Product.hasOne(Inventory, { foreignKey: 'product_id' });
Inventory.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(InventoryTransaction, { foreignKey: 'product_id' });
InventoryTransaction.belongsTo(Product, { foreignKey: 'product_id' });

// ==========================================
// Rental Process Associations
// ==========================================

// Quotations
CustomerProfile.hasMany(Quotation, { foreignKey: 'customer_id' });
Quotation.belongsTo(CustomerProfile, { foreignKey: 'customer_id' });

Quotation.hasMany(QuotationItem, { foreignKey: 'quotation_id' });
QuotationItem.belongsTo(Quotation, { foreignKey: 'quotation_id' });

Product.hasMany(QuotationItem, { foreignKey: 'product_id' });
QuotationItem.belongsTo(Product, { foreignKey: 'product_id' });

// Orders
CustomerProfile.hasMany(RentalOrder, { foreignKey: 'customer_id' });
RentalOrder.belongsTo(CustomerProfile, { foreignKey: 'customer_id' });

Quotation.hasOne(RentalOrder, { foreignKey: 'quotation_id' });
RentalOrder.belongsTo(Quotation, { foreignKey: 'quotation_id' });

RentalOrder.hasMany(RentalOrderItem, { foreignKey: 'order_id' });
RentalOrderItem.belongsTo(RentalOrder, { foreignKey: 'order_id' });

Product.hasMany(RentalOrderItem, { foreignKey: 'product_id' });
RentalOrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Reservations
Product.hasMany(Reservation, { foreignKey: 'product_id' });
Reservation.belongsTo(Product, { foreignKey: 'product_id' });

RentalOrderItem.hasOne(Reservation, { foreignKey: 'order_item_id' });
Reservation.belongsTo(RentalOrderItem, { foreignKey: 'order_item_id' });

// Pickups & Returns
RentalOrder.hasOne(Pickup, { foreignKey: 'order_id' });
Pickup.belongsTo(RentalOrder, { foreignKey: 'order_id' });

RentalOrder.hasOne(Return, { foreignKey: 'order_id' });
Return.belongsTo(RentalOrder, { foreignKey: 'order_id' });

// Invoices & Payments
RentalOrder.hasMany(Invoice, { foreignKey: 'order_id' });
Invoice.belongsTo(RentalOrder, { foreignKey: 'order_id' });

Invoice.hasMany(Payment, { foreignKey: 'invoice_id' });
Payment.belongsTo(Invoice, { foreignKey: 'invoice_id' });


module.exports = {
    sequelize,
    User,
    Role,
    UserRole,
    CustomerProfile,
    VendorProfile,
    AdminProfile,
    Product,
    ProductMedia,
    Attribute,
    AttributeValue,
    ProductAttributeValue,
    PricingUnit,
    ProductPricing,
    Inventory,
    InventoryTransaction,
    Quotation,
    QuotationItem,
    RentalOrder,
    RentalOrderItem,
    Reservation,
    Pickup,
    Return,
    Invoice,
    Payment,
    SystemSetting
};
