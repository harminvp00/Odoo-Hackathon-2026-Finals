import React, { useState, useEffect } from 'react';
import { getMyQuotations, confirmOrder } from '../../api/quotation.api';
import Navbar from '../../components/common/Navbar'; // Adjust path if needed

const CustomerQuotations = () => {
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const data = await getMyQuotations();
                setQuotations(data);
            } catch (error) {
                console.error("Failed to fetch quotations", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuotations();
    }, []);

    const handleConfirm = async (id) => {
        try {
            await confirmOrder(id);
            alert("Order Confirmed! Check your orders section.");
            // Refresh logic
            const data = await getMyQuotations();
            setQuotations(data);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to confirm order");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Quotations</h1>

                {loading ? (
                    <div>Loading...</div>
                ) : quotations.length > 0 ? (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {quotations.map((quote) => (
                                <li key={quote.quotation_id} className="px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                Quotation #{quote.quotation_id}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Status: <span className={`font-semibold ${quote.status === 'CONFIRMED' ? 'text-green-600' : 'text-yellow-600'}`}>{quote.status}</span>
                                            </div>
                                        </div>
                                        <div>
                                            {quote.status !== 'CONFIRMED' && (
                                                <button
                                                    onClick={() => handleConfirm(quote.quotation_id)}
                                                    className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
                                                >
                                                    Confirm & Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    {/* Items Preview */}
                                    <div className="mt-2 text-sm text-gray-600">
                                        {quote.QuotationItems?.map(item => (
                                            <div key={item.item_id}>
                                                - {item.Product?.name} (Qty: {item.quantity})
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="text-gray-500">No quotations found.</div>
                )}
            </div>
        </div>
    );
};

export default CustomerQuotations;
