import React, { useState, useEffect } from 'react';
import { getMyQuotations } from '../../api/quotation.api';

const VendorQuotations = () => {
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                // Since our backend logic now filters by Vendor ownership, 
                // we can reuse the SAME endpoint!
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

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Received Quotation Requests</h1>

                {loading ? (
                    <div>Loading...</div>
                ) : quotations.length > 0 ? (
                    <div className="grid gap-6">
                        {quotations.map((quote) => (
                            <div key={quote.quotation_id} className="bg-white shadow rounded-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Request from {quote.CustomerProfile?.first_name} {quote.CustomerProfile?.last_name}
                                        </h3>
                                        <p className="text-sm text-gray-500">ID: #{quote.quotation_id}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-xs rounded-full ${quote.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {quote.status}
                                    </span>
                                </div>

                                <div className="border-t pt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Requested Items:</h4>
                                    <ul className="space-y-2">
                                        {quote.QuotationItems?.map(item => (
                                            <li key={item.item_id} className="flex justify-between text-sm">
                                                <span>{item.Product?.name}</span>
                                                <span className="text-gray-500">Qty: {item.quantity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-500">No quotation requests yet.</div>
                )}
            </div>
        </div>
    );
};

export default VendorQuotations;
