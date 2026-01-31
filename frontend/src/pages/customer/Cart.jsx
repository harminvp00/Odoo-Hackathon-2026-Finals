import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { createQuotation } from '../../api/quotation.api'; // Ensure this exists
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRequestQuote = async () => {
        setLoading(true);
        try {
            const items = cartItems.map(item => ({
                product_id: item.product_id,
                start_date: item.startDate,
                end_date: item.endDate,
                quantity: item.quantity
            }));

            await createQuotation(items);
            clearCart();
            alert("Quotation requested successfully!");
            navigate('/quotations'); // Redirect to MyQuotations
        } catch (error) {
            console.error(error);
            alert("Failed to create quotation");
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Browse products to add them to your quote.</p>
                <Button onClick={() => navigate('/products')} className="w-auto">Browse Products</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Request Quotation</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cartItems.map((item, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{item.startDate} to {item.endDate}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{item.quantity}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => removeFromCart(item.product_id)} className="text-red-600 hover:text-red-900">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="px-6 py-4 bg-gray-50 text-right">
                    <Button onClick={handleRequestQuote} disabled={loading} className="w-auto">
                        {loading ? 'Processing...' : 'Submit Quotation Request'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
