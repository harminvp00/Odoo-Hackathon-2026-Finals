const { sequelize, Attribute, AttributeValue } = require('./src/models');

async function seedAttributes() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Sync schemas for attributes if needed
        await Attribute.sync();
        await AttributeValue.sync();

        // 1. Color
        let color = await Attribute.findOne({ where: { attribute_name: 'Color' } });
        if (!color) {
            color = await Attribute.create({ attribute_name: 'Color' });
            console.log('Created Attribute: Color');
        }

        const colors = ['Red', 'Blue', 'Black', 'White', 'Yellow'];
        for (const c of colors) {
            const exists = await AttributeValue.findOne({ where: { attribute_id: color.attribute_id, value: c } });
            if (!exists) {
                await AttributeValue.create({ attribute_id: color.attribute_id, value: c });
            }
        }

        // 2. Size
        let size = await Attribute.findOne({ where: { attribute_name: 'Size' } });
        if (!size) {
            size = await Attribute.create({ attribute_name: 'Size' });
            console.log('Created Attribute: Size');
        }

        const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
        for (const s of sizes) {
            const exists = await AttributeValue.findOne({ where: { attribute_id: size.attribute_id, value: s } });
            if (!exists) {
                await AttributeValue.create({ attribute_id: size.attribute_id, value: s });
            }
        }

        // 3. Material
        let material = await Attribute.findOne({ where: { attribute_name: 'Material' } });
        if (!material) {
            material = await Attribute.create({ attribute_name: 'Material' });
            console.log('Created Attribute: Material');
        }

        const materials = ['Wood', 'Metal', 'Plastic', 'Glass'];
        for (const m of materials) {
            const exists = await AttributeValue.findOne({ where: { attribute_id: material.attribute_id, value: m } });
            if (!exists) {
                await AttributeValue.create({ attribute_id: material.attribute_id, value: m });
            }
        }

        console.log('Attributes Seeded Successfully!');

    } catch (error) {
        console.error('Seeding Failed:', error);
    } finally {
        await sequelize.close();
    }
}

seedAttributes();
