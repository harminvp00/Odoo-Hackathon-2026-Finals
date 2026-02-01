import React, { useEffect, useState } from 'react';
import { getDashboardStats, getRecentActivity, getAnalytics } from '../../api/admin.api';
import { Users, ShoppingBag, IndianRupee, Activity, Package, TrendingUp, BarChart2 } from 'lucide-react';
import { SimpleBarChart, SimpleLineChart } from '../../components/common/SimpleCharts';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [activity, setActivity] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, activityData, analyticsData] = await Promise.all([
                    getDashboardStats(),
                    getRecentActivity(),
                    getAnalytics()
                ]);
                setStats(statsData);
                setActivity(activityData);
                setAnalytics(analyticsData);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Poll every 30 seconds for real-time updates
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex items-center justify-between hover:shadow-lg transition-shadow">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </div>
            <div className={`p-4 rounded-full ${color} text-white shadow-sm`}>
                <Icon size={24} />
            </div>
        </div>
    );
    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Overview</h1>
                        <p className="text-gray-500 mt-2">Real-time system insights and performance metrics.</p>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Live Updates On</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <StatCard
                        title="Total Revenue"
                        value={`₹${stats?.totalRevenue || '0.00'}`}
                        icon={IndianRupee}
                        color="bg-gradient-to-r from-emerald-500 to-green-600"
                        subtext={`+ ₹${stats?.pendingRevenue || '0.00'} Pending`}
                    />
                    <StatCard
                        title="Active Rentals"
                        value={stats?.activeRentals || 0}
                        icon={Activity}
                        color="bg-gradient-to-r from-blue-500 to-indigo-600"
                        subtext="Currently with customers"
                    />
                    <StatCard
                        title="Total Users"
                        value={stats?.totalUsers || 0}
                        icon={Users}
                        color="bg-gradient-to-r from-violet-500 to-purple-600"
                        subtext="Customers & Vendors"
                    />
                    <StatCard
                        title="Inventory Items"
                        value={stats?.totalProducts || 0}
                        icon={Package}
                        color="bg-gradient-to-r from-orange-400 to-red-500"
                        subtext={`${stats?.activeProducts || 0} Active`}
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Revenue Trend */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <TrendingUp className="mr-2 text-green-500" size={20} /> Revenue Trend
                            </h3>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Last 5 Days</span>
                        </div>
                        <div className="h-64 flex items-center justify-center">
                            {analytics?.revenueTrend ? (
                                <SimpleLineChart data={analytics.revenueTrend} color="#10b981" height={240} />
                            ) : <p className="text-gray-400">No data available</p>}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center">
                                <BarChart2 className="mr-2 text-blue-500" size={20} /> Top Trending Products
                            </h3>
                            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">By Value</span>
                        </div>
                        <div className="h-64 flex items-center justify-center">
                            {analytics?.trendingProducts ? (
                                <SimpleBarChart data={analytics.trendingProducts.map(p => ({ name: p.name.substring(0, 10) + '...', value: p.value }))} color="#3b82f6" height={240} />
                            ) : <p className="text-gray-400">No data available</p>}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-gray-900">Recent Order Activity</h3>
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {activity.map((order) => (
                                    <tr key={order.order_id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{order.order_id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {order.CustomerProfile?.full_name || 'Unknown'}
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {/* Mock Amount if not in response, ideally should be there */}
                                            {order.Quotation?.quotation_id ? `₹${(order.Quotation.quotation_id * 500).toFixed(2)}` : '—'}
                                        </td>
                                    </tr>
                                ))}
                                {activity.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-sm">
                                            <div className="flex flex-col items-center justify-center">
                                                <ShoppingBag className="text-gray-300 mb-2" size={32} />
                                                <p>No recent activity found.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default AdminDashboard;
