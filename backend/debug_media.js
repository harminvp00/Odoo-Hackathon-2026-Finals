const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'rental_db',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

async function checkMedia() {
    try {
        await sequelize.authenticate();
        console.log('DB Connected.');

        const [results] = await sequelize.query("SELECT * FROM product_media LIMIT 5");
        console.log("Found Media Entries:", results);

        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.join(__dirname, 'uploads'); // assuming based on app.js location which is likely in src or project root
        // app.js creates uploads in '../uploads' relative to src/app.js.
        // If this script is in backend root, uploads is likely './uploads'

        console.log("Checking uploads dir...");
        if (fs.existsSync('uploads')) {
            console.log("Uploads dir exists.");
            const files = fs.readdirSync('uploads');
            console.log("First 5 files in uploads:", files.slice(0, 5));
        } else {
            console.log("Uploads dir NOT found in current working directory.");
        }

    } catch (e) {
        console.error(e);
    } finally {
        await sequelize.close();
    }
}

checkMedia();
