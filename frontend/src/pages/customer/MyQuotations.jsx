import React, { useState, useEffect } from 'react';
import { getMyQuotations, confirmOrder } from '../../api/quotation.api'; // Ensure confirmOrder is exported from api
import { Link } from 'react-router-dom';

// Wait, the previous MyQuotations didn't perform Navbar import. It relied on App.jsx layout.
// I should remove Navbar import if it's rendered by App.

const MyQuotations = () => {
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

    const handleConfirm = async (id, e) => {
        e.preventDefault(); // Prevent link navigation
        try {
            await confirmOrder(id);
            alert("Order Confirmed! Check your orders section.");
            // Refresh
            const data = await getMyQuotations();
            setQuotations(data);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to confirm order");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Quotations</h1>

            {quotations.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {quotations.map((quote) => (
                            <li key={quote.quotation_id} className="hover:bg-gray-50 transition-colors">
                                <Link to={`/quotations/${quote.quotation_id}`} className="block px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-lg font-medium text-primary-600">
                                                Quotation #{quote.quotation_id}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                Status: <span className={`font-semibold ml-1 ${quote.status === 'CONFIRMED' ? 'text-green-600' : 'text-yellow-600'}`}>{quote.status}</span>
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                Created on {new Date(quote.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {quote.status !== 'CONFIRMED' && (
                                                <button
                                                    onClick={(e) => handleConfirm(quote.quotation_id, e)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    Confirm & Order
                                                </button>
                                            )}
                                            <span className="text-gray-400 text-xl">&rsaquo;</span>
                                        </div>
                                    </div>
                                    {/* Items Preview */}
                                    <div className="mt-3 pl-2 border-l-2 border-gray-100">
                                        {quote.QuotationItems?.slice(0, 3).map(item => (
                                            <div key={item.item_id} className="text-sm text-gray-600 truncate">
                                                {item.Product?.name} <span className="text-gray-400">x{item.quantity}</span>
                                            </div>
                                        ))}
                                        {quote.QuotationItems?.length > 3 && (
                                            <div className="text-xs text-gray-400 italic">+ {quote.QuotationItems.length - 3} more items</div>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
                    No quotations found. Start by browsing products!
                </div>
            )}
        </div>
    );
};

export default MyQuotations;
