const { Attribute, AttributeValue } = require('../../models');

const createAttribute = async (req, res) => {
    try {
        const { attribute_name, values } = req.body; // Expect values as array of strings
        const attribute = await Attribute.create({ attribute_name });

        if (values && values.length > 0) {
            const valueObjects = values.map(v => ({
                attribute_id: attribute.attribute_id,
                value: v
            }));
            await AttributeValue.bulkCreate(valueObjects);
        }

        // Return complete object
        const result = await Attribute.findByPk(attribute.attribute_id, { include: [AttributeValue] });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAttributes = async (req, res) => {
    try {
        const attributes = await Attribute.findAll({
            include: [AttributeValue]
        });
        res.json(attributes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAttribute,
    getAttributes
};
