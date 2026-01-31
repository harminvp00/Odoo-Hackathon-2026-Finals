import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../../api/order.api'; // Ensure this exists
import { createInvoice } from '../../api/invoice.api';
import { processPickup, processReturn } from '../../api/fulfillment.api';
import Button from '../../components/common/Button';

const VendorOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            // In real app, filter by vendor's products
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error("Failed to fetch orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleGenerateInvoice = async (orderId) => {
        try {
            const invoice = await createInvoice(orderId);
            alert("Invoice generated! Redirecting...");
            window.location.href = `/invoices/${invoice.invoice_id}`;
        } catch (error) {
            // If invoice already exists, maybe redirect to it? 
            // The API createInvoice returns existing if found.
            // But let's handle error just in case.
            if (error.response?.data?.invoice_id) {
                window.location.href = `/invoices/${error.response.data.invoice_id}`;
            } else {
                alert("Could not generate invoice: " + error.response?.data?.message);
            }
        }
    };

    const handlePickup = async (orderId) => {
        if (!window.confirm("Confirm pickup for this order?")) return;
        try {
            await processPickup(orderId);
            fetchOrders(); // Refresh list
        } catch (error) {
            alert("Pickup Failed: " + error.response?.data?.message);
        }
    };

    const handleReturn = async (orderId) => {
        if (!window.confirm("Confirm return for this order?")) return;
        try {
            await processReturn(orderId);
            fetchOrders(); // Refresh list
        } catch (error) {
            alert("Return Failed: " + error.response?.data?.message);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
            {loading ? (
                <div>Loading orders...</div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <ul className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <li key={order.order_id} className="p-4 hover:bg-gray-50 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Order #{order.order_id}</p>
                                    <p className="text-sm text-gray-500">
                                        Status:
                                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                                                order.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                    'bg-gray-100 text-gray-800'}`}>
                                            {order.status}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-400">Created: {new Date(order.created_at).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => handleGenerateInvoice(order.order_id)} className="text-xs bg-indigo-600 hover:bg-indigo-700">
                                        Invoice
                                    </Button>

                                    {order.status === 'CONFIRMED' && (
                                        <Button onClick={() => handlePickup(order.order_id)} className="text-xs bg-yellow-600 hover:bg-yellow-700">
                                            Mark Picked Up
                                        </Button>
                                    )}

                                    {order.status === 'ACTIVE' && (
                                        <Button onClick={() => handleReturn(order.order_id)} className="text-xs bg-green-600 hover:bg-green-700">
                                            Process Return
                                        </Button>
                                    )}
                                </div>
                            </li>
                        ))}
                        {orders.length === 0 && <li className="p-4 text-center text-gray-500">No orders found.</li>}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default VendorOrders;
