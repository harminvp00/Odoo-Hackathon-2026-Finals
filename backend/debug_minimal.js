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

async function testConnect() {
    try {
        await sequelize.authenticate();
        console.log('DB Connection OK');
    } catch (e) {
        console.error('DB Connection FAIL:', e.message);
    } finally {
        await sequelize.close();
        process.exit(0);
    }
}

testConnect();
