import React, { useEffect, useState } from 'react';
import { getDashboardStats, getRecentActivity } from '../../api/admin.api';
import { Users, ShoppingBag, DollarSign, Activity, Package } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    getDashboardStats(),
                    getRecentActivity()
                ]);
                setStats(statsData);
                setActivity(activityData);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

    const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
            <div className={`p-3 rounded-full ${color} text-white`}>
                <Icon size={24} />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
                    <p className="text-gray-500 mt-2">Global system performance and activity.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Total Revenue"
                        value={`$${stats?.totalRevenue || '0.00'}`}
                        icon={DollarSign}
                        color="bg-green-600"
                        subtext="Lifetime collected"
                    />
                    <StatCard
                        title="Active Rentals"
                        value={stats?.activeRentals || 0}
                        icon={Activity}
                        color="bg-blue-600"
                        subtext="Currently with customers"
                    />
                    <StatCard
                        title="Total Users"
                        value={stats?.totalUsers || 0}
                        icon={Users}
                        color="bg-indigo-600"
                        subtext="Customers & Vendors"
                    />
                    <StatCard
                        title="Inventory Items"
                        value={stats?.totalProducts || 0}
                        icon={Package}
                        color="bg-orange-500"
                        subtext={`${stats?.activeProducts || 0} Active`}
                    />
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                        <h3 className="text-lg font-bold text-gray-900">Recent Order Activity</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {activity.map((order) => (
                                    <tr key={order.order_id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{order.order_id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.Customer?.name || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${order.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                                {activity.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-500 text-sm">
                                            No recent activity found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
