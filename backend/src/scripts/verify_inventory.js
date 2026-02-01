const { sequelize, Product, Inventory } = require('../models');

async function fixInventory() {
    try {
        console.log("Connecting to database...");
        await sequelize.authenticate();
        console.log("Database connected.");

        // Check Product 6 specifically
        const productId = 6;
        const product = await Product.findByPk(productId, {
            include: [Inventory] // Default alias
        });

        if (!product) {
            console.log(`Product ${productId} not found!`);
            return;
        }

        console.log(`Product ${productId} found: ${product.name}`);
        console.log(`Current Inventory Object:`, JSON.stringify(product.Inventory, null, 2));

        const { Reservation, QuotationItem } = require('../models');

        // Check Reservations
        const reservations = await Reservation.findAll({ where: { product_id: productId } });
        console.log(`Found ${reservations.length} existing reservations for Product ${productId}.`);
        reservations.forEach(r => console.log(` - Res ID ${r.reservation_id}: ${r.start_date} to ${r.end_date} (Qty: ${r.quantity})`));

        // Start Force Update
        console.log(`Updating Inventory to 50 to ensure availability...`);
        if (product.Inventory) {
            await product.Inventory.update({ total_quantity: 50 });
        } else {
            await Inventory.create({ product_id: productId, total_quantity: 50 });
        }
        console.log("Inventory updated to 50.");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await sequelize.close();
    }
}

fixInventory();
