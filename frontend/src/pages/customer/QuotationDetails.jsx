import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuotationById, confirmOrder } from '../../api/quotation.api';
import Button from '../../components/common/Button';

const QuotationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quotation, setQuotation] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadQuotation = async () => {
        try {
            const data = await getQuotationById(id);
            setQuotation(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadQuotationss();
    }, [id]);

    const loadQuotationss = async () => {
        try {
            const data = await getQuotationById(id);
            setQuotation(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleConfirmOrder = async () => {
        if (!confirm('Are you sure you want to confirm this order?')) return;
        try {
            await confirmOrder(id);
            alert('Order confirmed successfully!');
            // Refresh logic - ideally status updates to CONFIRMED
            loadQuotationss();
        } catch (error) {
            alert('Failed to confirm order: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!quotation) return <div>Quotation not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Quotation #{quotation.quotation_id}</h1>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Details</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Status: {quotation.status}</p>
                </div>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Customer</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{quotation.CustomerProfile?.full_name}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Items</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left">Product</th>
                            <th className="px-6 py-3 text-left">Dates</th>
                            <th className="px-6 py-3 text-left">Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {quotation.QuotationItems?.map(item => (
                            <tr key={item.item_id}>
                                <td className="px-6 py-4">{item.Product?.name}</td>
                                <td className="px-6 py-4">{new Date(item.start_date).toLocaleDateString()} - {new Date(item.end_date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {quotation.status === 'DRAFT' || quotation.status === 'SENT' ? (
                <Button onClick={handleConfirmOrder}>
                    Confirm Order
                </Button>
            ) : (
                <div className="text-green-600 font-bold p-4 border border-green-200 bg-green-50 rounded">
                    Order Confirmed
                </div>
            )}
        </div>
    );
};

export default QuotationDetails;
