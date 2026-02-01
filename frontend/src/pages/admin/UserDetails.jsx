import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../api/admin.api';
import { ArrowLeft, Package, ShoppingBag, Mail, Phone, MapPin, Building, Activity } from 'lucide-react';
import { SimpleLineChart } from '../../components/common/SimpleCharts';

const UserDetails = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type') || 'CUSTOMER';
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getUserDetails(id, type);
                setData(result);
            } catch (error) {
                console.error("Failed to fetch user details", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, type]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading details...</div>;
    if (!data || !data.profile) return <div className="p-8 text-center text-red-500">User not found</div>;

    const { profile, products, orders } = data;
    const isVendor = type === 'VENDOR';

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <button
                        onClick={() => navigate('/admin/users')}
                        className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                    >
                        <ArrowLeft size={20} className="mr-2" /> Back to Users
                    </button>
                    <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600">
                                {(profile.CustomerProfile?.full_name?.[0] || profile.VendorProfile?.company_name?.[0] || profile.email[0]).toUpperCase()}
                            </div>
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {profile.CustomerProfile?.full_name || profile.VendorProfile?.company_name || 'N/A'}
                                </h1>
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                    <Mail size={14} className="mr-1" /> {profile.email}
                                </div>
                                {isVendor && profile.VendorProfile?.gstin && (
                                    <div className="text-sm text-gray-500 flex items-center mt-1">
                                        <Building size={14} className="mr-1" /> GSTIN: {profile.VendorProfile.gstin}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${profile.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {profile.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Vendor Content: Products */}
                {isVendor && products && (
                    <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
                        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <Package size={20} className="mr-2" /> Products ({products.length})
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price (Day)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.product_id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {product.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₹{product.price_per_day}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {product.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No products listed.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Customer Content: Orders */}
                {!isVendor && orders && (
                    <div className="space-y-6">
                        {/* Spending Chart */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                                <Activity className="mr-2 text-blue-500" size={20} /> Spending Over Time (Mock)
                            </h3>
                            <div className="h-64 flex items-center justify-center">
                                <SimpleLineChart
                                    data={[
                                        { name: 'Jan', value: 0 },
                                        { name: 'Feb', value: 2000 },
                                        { name: 'Mar', value: 1500 },
                                        { name: 'Apr', value: 3500 },
                                        { name: 'May', value: orders.length * 500 }
                                    ]}
                                    color="#3b82f6"
                                    height={240}
                                />
                            </div>
                        </div>

                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                    <ShoppingBag size={20} className="mr-2" /> Order History ({orders.length})
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {orders.map((order) => (
                                            <tr key={order.order_id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    #{order.order_id}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {/* Requires Invoice or Quotation Total. Assuming Quotation included and has total logic or we mock it */}
                                                    ₹{order.Quotation?.quotation_id || 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                        {orders.length === 0 && (
                                            <tr><td colSpan="4" className="px-6 py-4 text-center text-gray-500">No orders found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
