import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { Package, Plus, DollarSign, TrendingUp, Archive } from 'lucide-react';
import { getMyProducts, deleteProduct } from '../../api/product.api';
import { useAuth } from '../../context/AuthContext';

const VendorDashboard = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const getImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        return `http://localhost:5000${cleanPath}`;
    };

    useEffect(() => {
        const fetchVendorProducts = async () => {
            try {
                const myProducts = await getMyProducts();
                // If response is { count, products: [] } extract products
                const list = myProducts.products || myProducts;
                setProducts(Array.isArray(list) ? list : []);
            } catch (error) {
                console.error("Failed to fetch products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVendorProducts();
    }, []);

    const StatsCard = ({ title, value, icon: Icon, color }) => (
        <div className="bg-white overflow-hidden shadow-md rounded-xl border border-gray-100 p-6 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
            </div>
            <div className={`p-3 rounded-full ${color}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-3xl font-extrabold leading-tight text-gray-900">
                            Vendor Dashboard
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Manage inventory, track revenue, and monitor rental performance.
                        </p>
                    </div>
                    <div className="mt-4 flex md:mt-0 md:ml-4">
                        <Link to="/vendor/add-product">
                            <Button className="flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                                <Plus className="h-4 w-4" />
                                Add New Product
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                    <StatsCard title="Total Inventory" value={products.length || 0} icon={Package} color="bg-blue-500" />
                    <StatsCard title="Active Rentals" value="0" icon={TrendingUp} color="bg-green-500" />
                    <StatsCard title="Total Revenue" value="$0.00" icon={DollarSign} color="bg-indigo-500" />
                    <StatsCard title="Pending Orders" value="0" icon={Archive} color="bg-yellow-500" />
                </div>

                {/* Inventory Table */}
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h3 className="text-lg leading-6 font-bold text-gray-900">
                            Inventory List
                        </h3>
                        <div className="relative">
                            <input type="text" placeholder="Search..." className="border border-gray-300 rounded-md py-1 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500" />
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-gray-500">Loading inventory...</div>
                    ) : products.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Daily Price</th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product.product_id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        {product.ProductMedia && product.ProductMedia.length > 0 ? (
                                                            <img className="h-10 w-10 rounded-full object-cover" src={getImageUrl(product.ProductMedia[0].media_url)} alt="" />
                                                        ) : (
                                                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                                                {product.name.charAt(0)}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {product.status || 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {product.Inventory?.total_quantity || 0}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${product.price_per_day || '0.00'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link to={`/vendor/edit-product/${product.product_id}`} className="text-primary-600 hover:text-primary-900 mr-4">Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                                <Package className="h-full w-full" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No products listed</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by adding your first unit.</p>
                            <div className="mt-6">
                                <Link to="/vendor/add-product">
                                    <Button variant="outline">Create Listing</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
