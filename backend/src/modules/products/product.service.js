const { Product, ProductMedia, Inventory, ProductAttributeValue, AttributeValue, Attribute, ProductPricing, PricingUnit, VendorProfile, InventoryTransaction } = require('../../models');

const getAllProducts = async (filters) => {
    let whereClause = {};
    if (filters.vendor_id) {
        whereClause.vendor_id = filters.vendor_id;
    } else {
        // If not a vendor dashboard request, show only ACTIVE products
        whereClause.status = 'ACTIVE';
    }

    console.log("[SERVICE] getAllProducts Filter:", whereClause);

    return await Product.findAll({
        where: whereClause,
        include: [
            ProductMedia,
            Inventory,
            {
                model: ProductAttributeValue,
                include: [{
                    model: AttributeValue,
                    include: [Attribute]
                }]
            }
        ]
    });
};

const createProduct = async (productData, vendorId, files) => {
    // Fallback: if vendorId arg is missing, check productData
    const vId = vendorId || productData.vendor_id;

    if (!vId) {
        throw new Error("Vendor ID is required");
    }

    // 1. Create Product
    const product = await Product.create({
        vendor_id: vId,
        name: productData.name,
        description: productData.description,
        price_per_day: productData.price_per_day,
        status: 'ACTIVE'
    });

    // 2. Handle Inventory
    if (productData.quantity) {
        await Inventory.create({
            product_id: product.product_id,
            total_quantity: parseInt(productData.quantity)
        });
    }

    // 3. Handle Media (Images)
    if (files && files.length > 0) {
        const mediaEntries = files.map(file => ({
            product_id: product.product_id,
            media_url: `/uploads/${file.filename}`
        }));
        await ProductMedia.bulkCreate(mediaEntries);
    }

    // 4. Handle Attributes
    if (productData.attribute_value_ids) {
        let valueIds = productData.attribute_value_ids;
        // If coming from multipart form-data, it might be a string "1,2,3"
        // Also ensure we handle both array and string cases robustly
        if (typeof valueIds === 'string') {
            valueIds = valueIds.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));
        } else if (!Array.isArray(valueIds)) {
            // If single value passed not as array
            valueIds = [parseInt(valueIds)];
        }

        if (valueIds.length > 0) {
            const attrEntries = valueIds.map(vid => ({
                product_id: product.product_id,
                value_id: vid
            }));
            await ProductAttributeValue.bulkCreate(attrEntries);
        }
    }

    // 5. Handle Advanced Pricing (Hourly/Weekly etc)
    if (productData.pricing) {
        // pricing should be an array of objects { unit_id, price, min_duration }
        // It might be JSON string if coming from FormData, but controller parses it.
        const pricingData = Array.isArray(productData.pricing) ? productData.pricing : [];

        if (pricingData.length > 0) {
            const pricingEntries = pricingData.map(p => ({
                product_id: product.product_id,
                unit_id: p.unit_id,
                price: p.price,
                min_duration: p.min_duration || 1
            }));
            await ProductPricing.bulkCreate(pricingEntries);
        }
    }

    return product;
};

// Exporting consistently
const getProductById = async (id) => {
    const product = await Product.findByPk(id, {
        include: [
            { model: ProductMedia },
            { model: Inventory },
            { model: VendorProfile },
            { model: ProductPricing, include: [PricingUnit] },
            {
                model: ProductAttributeValue,
                include: [{
                    model: AttributeValue,
                    include: [Attribute]
                }]
            }
        ]
    });
    return product;
};

const updateProduct = async (id, data, vendorId) => {
    const product = await Product.findOne({ where: { product_id: id, vendor_id: vendorId } });

    if (!product) {
        throw new Error('Product not found or unauthorized');
    }

    // Update basic fields
    await product.update({
        name: data.name,
        description: data.description,
        price_per_day: data.price_per_day,
        status: data.status || product.status
    });

    // Update Inventory
    if (data.quantity) {
        let inventory = await Inventory.findOne({ where: { product_id: id } });
        if (inventory) {
            await inventory.update({ total_quantity: data.quantity });
        } else {
            await Inventory.create({ product_id: id, total_quantity: data.quantity });
        }
    }

    return product;
};

const deleteProduct = async (id, vendorId) => {
    const pId = parseInt(id);
    console.log(`[SERVICE] Attempting DELETE Product ID: ${pId} for Vendor: ${vendorId}`);

    // 1. Find Product
    const product = await Product.findOne({ where: { product_id: pId, vendor_id: vendorId } });
    if (!product) {
        throw new Error('Product not found or unauthorized');
    }

    // 2. Manual Cascade Delete
    try {
        const txCount = await InventoryTransaction.count({ where: { product_id: pId } });
        console.log(`[SERVICE] Found ${txCount} InventoryTransactions.`);

        await InventoryTransaction.destroy({ where: { product_id: pId } });
        console.log(`[SERVICE] Deleted InventoryTransactions.`);

        await Inventory.destroy({ where: { product_id: pId } });
        console.log(`[SERVICE] Deleted Inventory.`);

        await ProductMedia.destroy({ where: { product_id: pId } });
        await ProductAttributeValue.destroy({ where: { product_id: pId } });
        await ProductPricing.destroy({ where: { product_id: pId } });
    } catch (err) {
        console.error("[SERVICE] Error during cascade delete:", err);
        throw err; // Re-throw to controller
    }

    // 3. Delete Product
    console.log(`[SERVICE] Deleting Product now...`);
    await product.destroy();
    return { message: 'Product deleted successfully' };
};

module.exports = {
    getAllProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
};
