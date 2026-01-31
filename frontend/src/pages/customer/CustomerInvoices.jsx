import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient'; // Direct axios use if no specific api file wrapper, or use invoice.api

const CustomerInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                // Backend GET /api/invoices automatically returns THIS user's invoices
                const response = await axiosClient.get('/api/invoices');
                setInvoices(response.data);
            } catch (error) {
                console.error("Failed to fetch invoices", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading invoices...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Invoices</h1>

            {invoices.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {invoices.map((invoice) => (
                            <li key={invoice.invoice_id} className="hover:bg-gray-50 transition-colors">
                                <Link to={`/invoices/${invoice.invoice_id}`} className="block px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-lg font-medium text-gray-900">
                                                Invoice #{invoice.invoice_id}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                Date: {new Date(invoice.created_at).toLocaleDateString()}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Order Ref: #{invoice.order_id}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-gray-900">
                                                ${invoice.total}
                                            </div>
                                            <span className={`px-2 py-1 text-xs rounded-full inline-block mt-1 
                                                ${invoice.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {invoice.status}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg shadow">
                    No invoices found.
                </div>
            )}
        </div>
    );
};

export default CustomerInvoices;
