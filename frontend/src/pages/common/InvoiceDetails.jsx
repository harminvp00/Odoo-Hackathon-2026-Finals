import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInvoiceById } from '../../api/invoice.api';

const InvoiceDetails = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const data = await getInvoiceById(id);
                setInvoice(data);
            } catch (error) {
                console.error("Failed to fetch invoice", error);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading Invoice...</div>;
    if (!invoice) return <div className="p-8 text-center text-red-500">Invoice Not Found</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg my-10 border border-gray-200" id="invoice-print">
            <div className="flex justify-between items-start border-b pb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900">INVOICE</h1>
                    <p className="text-gray-500 mt-1">#{invoice.invoice_id}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold text-gray-800">RentalSys Inc.</h2>
                    <p className="text-gray-500 text-sm">123 Equipment Lane<br />Construction City, ST 12345</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 my-8">
                <div>
                    <h3 className="font-bold text-gray-700 uppercase text-xs tracking-wider mb-2">Bill To</h3>
                    <p className="font-semibold text-gray-900">{invoice.RentalOrder?.Customer?.name || 'Customer'}</p>
                    <p className="text-gray-500 text-sm">{invoice.RentalOrder?.Customer?.email}</p>
                </div>
                <div className="text-right">
                    <div className="mb-2">
                        <span className="font-bold text-gray-700 uppercase text-xs tracking-wider">Date: </span>
                        <span className="text-gray-900">{new Date(invoice.created_at).toLocaleDateString()}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 uppercase text-xs tracking-wider">Status: </span>
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${invoice.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {invoice.status}
                        </span>
                    </div>
                </div>
            </div>

            <table className="w-full mb-8">
                <thead>
                    <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 text-sm font-bold text-gray-700 uppercase tracking-wider">Description</th>
                        <th className="text-left py-3 text-sm font-bold text-gray-700 uppercase tracking-wider">Dates</th>
                        <th className="text-right py-3 text-sm font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.RentalOrder?.RentalOrderItems?.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                            <td className="py-4 text-sm text-gray-800">
                                {item.Product?.name} <span className="text-gray-400 text-xs ml-1">(Qty: {item.quantity})</span>
                            </td>
                            <td className="py-4 text-sm text-gray-500">
                                {new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}
                            </td>
                            <td className="py-4 text-right text-sm text-gray-900 font-medium">
                                ₹{parseFloat(item.final_price).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end border-t border-gray-200 pt-6">
                <div className="w-64 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span>₹{invoice.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Tax (18%)</span>
                        <span>₹{invoice.tax_amount}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                        <span>Total</span>
                        <span>₹{invoice.total}</span>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center">
                <button onClick={() => window.print()} className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition">
                    Print Invoice
                </button>
            </div>
        </div>
    );
};

export default InvoiceDetails;
