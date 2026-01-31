import React, { useState, useEffect } from 'react';
import { createProduct } from '../../api/product.api';
import { getAttributes } from '../../api/attribute.api';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Attributes State
    const [availableAttributes, setAvailableAttributes] = useState([]);
    const [selectedAttributeValues, setSelectedAttributeValues] = useState([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        initial_stock: 1,
        day_price: '',
        images: []
    });

    useEffect(() => {
        const fetchAttrs = async () => {
            try {
                const attrs = await getAttributes();
                setAvailableAttributes(attrs);
            } catch (err) {
                console.error("Failed to load attributes", err);
            }
        };
        fetchAttrs();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: e.target.files });
    };

    const handleAttributeToggle = (valueId) => {
        setSelectedAttributeValues(prev => {
            if (prev.includes(valueId)) {
                return prev.filter(id => id !== valueId);
            } else {
                return [...prev, valueId];
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim()) return setError('Product name is required');
        if (!formData.description.trim()) return setError('Description is required');
        if (formData.initial_stock < 1) return setError('Stock must be at least 1');
        if (formData.day_price <= 0) return setError('Price must be greater than 0');
        if (formData.images.length === 0) return setError('At least one image is required');

        setLoading(true);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('quantity', formData.initial_stock); // Service expects 'quantity' for Inventory
            data.append('price_per_day', formData.day_price);

            // Attributes
            if (selectedAttributeValues.length > 0) {
                // Send as CSV string or multiple appendages
                data.append('attribute_value_ids', selectedAttributeValues.join(','));
            }

            // Pricing (Future proofing for ProductPricing model if service uses it)
            const pricing = [
                { unit_id: 2, price: formData.day_price, min_duration: 1 }
            ];
            data.append('pricing', JSON.stringify(pricing));

            for (let i = 0; i < formData.images.length; i++) {
                data.append('images', formData.images[i]);
            }

            await createProduct(data);
            alert("Product created successfully!");
            window.location.href = '/';

        } catch (err) {
            console.error(err);
            setError("Failed to create product. " + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
            <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4" role="alert">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Product Name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <Input
                            label="Initial Stock"
                            name="initial_stock"
                            type="number"
                            min="1"
                            required
                            value={formData.initial_stock}
                            onChange={handleChange}
                        />
                        <Input
                            label="Daily Price ($)"
                            name="day_price"
                            type="number"
                            step="0.01"
                            required
                            value={formData.day_price}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Attributes Section */}
                    {availableAttributes.length > 0 && (
                        <div className="border-t pt-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Specifications</h3>
                            <div className="space-y-4">
                                {availableAttributes.map(attr => (
                                    <div key={attr.attribute_id}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {attr.attribute_name}
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {attr.AttributeValues?.map(val => (
                                                <button
                                                    key={val.value_id}
                                                    type="button"
                                                    onClick={() => handleAttributeToggle(val.value_id)}
                                                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${selectedAttributeValues.includes(val.value_id)
                                                            ? 'bg-primary-600 text-white border-primary-600'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {val.value}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mt-4">Product Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating Product...' : 'Publish Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
