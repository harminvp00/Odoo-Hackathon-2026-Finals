const dotenv = require('dotenv');
dotenv.config();
const { sequelize } = require('./src/models');
const productService = require('./src/modules/products/product.service');

async function debugProductFetch() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Get any product ID to test
        const [results] = await sequelize.query("SELECT product_id FROM products LIMIT 1");
        if (results.length === 0) {
            console.log("No products property found in DB, cannot test fetch.");
            return;
        }

        const testId = results[0].product_id;
        console.log(`Testing fetch for Product ID: ${testId}`);

        try {
            const product = await productService.getProductById(testId);
            console.log("SUCCESS! Product found:", product.name);
            console.log(JSON.stringify(product, null, 2));
        } catch (fetchError) {
            console.error("FETCH ERROR:", fetchError);
            if (fetchError.original) {
                console.error("SQL Error:", fetchError.original);
            }
        }

    } catch (error) {
        console.error('General Error:', error);
    } finally {
        await sequelize.close();
    }
}

debugProductFetch();
