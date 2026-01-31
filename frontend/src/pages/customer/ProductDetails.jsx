import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import { getProductById } from '../../api/product.api';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Hook for navigation
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Rental configuration state
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleaddToQuote = () => {
        if (!user) {
            alert("Please login to request a quote");
            navigate('/login'); // Redirect to login
            return;
        }

        if (!startDate || !endDate) {
            alert("Please select dates");
            return;
        }

        if (new Date(startDate) > new Date(endDate)) {
            alert("End date cannot be before start date");
            return;
        }

        addToCart(product, { startDate, endDate, quantity });
        alert("Added to quote cart!");
    };

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found</div>;

    const getImageUrl = (path) => {
        if (!path) return 'https://via.placeholder.com/600x400?text=Product+Image';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `http://localhost:5000${cleanPath}`;
    };

    const calculateTotal = () => {
        if (!startDate || !endDate) return '0.00';
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffMs = end - start;
        if (diffMs <= 0) return '0.00';

        const diffHours = diffMs / (1000 * 60 * 60);
        const diffDays = Math.ceil(diffHours / 24);

        let unitPrice = parseFloat(product.price_per_day || 0);

        // Simple Logic: If basic daily price, multiply by days.
        // Advanced Logic (Future): Check product.ProductPricings for hourly/weekly matches.

        return (unitPrice * diffDays * quantity).toFixed(2);
    };

    const imageUrl = product.ProductMedia && product.ProductMedia.length > 0
        ? getImageUrl(product.ProductMedia[0].media_url)
        : 'https://via.placeholder.com/600x400?text=Product+Image';

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={imageUrl} alt={product.name} className="w-full rounded-lg shadow-lg" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="mt-4 text-gray-600">{product.description}</p>

                    {/* Specifications Section */}
                    {product.ProductAttributeValues && product.ProductAttributeValues.length > 0 && (
                        <div className="mt-6 border-t pt-4">
                            <h3 className="text-sm font-medium text-gray-900">Specifications</h3>
                            <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                                {product.ProductAttributeValues.map((pav) => (
                                    <div key={pav.id} className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">
                                            {pav.AttributeValue?.Attribute?.attribute_name || 'Attribute'}
                                        </dt>
                                        <dd className="mt-1 text-sm text-gray-900">{pav.AttributeValue?.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}

                    <div className="mt-4 flex items-baseline">
                        <span className="text-3xl font-extrabold text-gray-900">${product.price_per_day}</span>
                        <span className="ml-1 text-xl text-gray-500">/day</span>
                    </div>

                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-lg font-semibold mb-3">Rental Configuration</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date & Time</label>
                                <input
                                    type="datetime-local"
                                    min={new Date().toISOString().slice(0, 16)}
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date & Time</label>
                                <input
                                    type="datetime-local"
                                    min={startDate || new Date().toISOString().slice(0, 16)}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                            </div>

                            {/* Dynamic Price Display */}
                            <div className="bg-gray-50 p-3 rounded text-right">
                                <span className="text-gray-600 block text-xs">Estimated Total</span>
                                <span className="text-2xl font-bold text-primary-600">
                                    ${calculateTotal()}
                                </span>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                />
                            </div>

                            <Button onClick={handleaddToQuote} className="mt-4">
                                Add to Quote
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
