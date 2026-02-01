import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/auth/Login';
import RegisterSelection from './pages/auth/RegisterSelection';
import RegisterCustomer from './pages/auth/RegisterCustomer';
import RegisterVendor from './pages/auth/RegisterVendor';
import Products from './pages/customer/Products';
import ProductDetails from './pages/customer/ProductDetails';
import Cart from './pages/customer/Cart';
import MyQuotations from './pages/customer/MyQuotations';
import CustomerInvoices from './pages/customer/CustomerInvoices';
import QuotationDetailsPage from './pages/customer/QuotationDetails';
import AddProduct from './pages/vendor/AddProduct';
import EditProduct from './pages/vendor/EditProduct';
import VendorDashboard from './pages/vendor/VendorDashboard';
import VendorOrders from './pages/vendor/VendorOrders';
import VendorQuotations from './pages/vendor/VendorQuotations';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import UserDetails from './pages/admin/UserDetails';
import AdminSettings from './pages/admin/AdminSettings';
import InvoiceDetails from './pages/common/InvoiceDetails';
import LandingPage from './pages/LandingPage';
import Button from './components/common/Button';

// --- Protected Route Component ---
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
    return children;
};

// --- Navbar Component ---
const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <div className="h-8 w-auto flex items-center gap-2">
                                <div className="bg-primary-600 text-white p-1 rounded font-bold text-xl">R</div>
                                <span className="text-xl font-bold text-gray-900 tracking-tight">Rental<span className="text-primary-600">Sys</span></span>
                            </div>
                        </Link>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            {/* Customer Links */}
                            {(!user || (user.role !== 'VENDOR' && user.role !== 'ADMIN')) && (
                                <>
                                    <Link to="/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                        Browse Equipment
                                    </Link>
                                    <Link to="/my-quotations" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                        My Quotations
                                    </Link>
                                    <Link to="/my-invoices" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                        Invoices
                                    </Link>
                                </>
                            )}

                            {/* Vendor Links */}
                            {user && user.role === 'VENDOR' && (
                                <>
                                    <Link to="/vendor/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Dashboard</Link>
                                    <Link to="/vendor/orders" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Orders</Link>
                                    <Link to="/vendor/quotations" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Quotations</Link>
                                </>
                            )}

                            {/* Admin Links */}
                            {user && user.role === 'ADMIN' && (
                                <>
                                    <Link to="/admin/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Dashboard</Link>
                                    <Link to="/admin/users" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Users</Link>
                                    <Link to="/admin/settings" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Settings</Link>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-700">Hi, {user.email}</span>
                                <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                                <Link to="/register-selection"><Button size="sm">Get Started</Button></Link>
                            </div>
                        )}
                        {/* Cart only for customers */}
                        {(!user || user.role === 'CUSTOMER') && (
                            <Link to="/cart" className="p-2 text-gray-400 hover:text-gray-500 relative">
                                <span className="sr-only">View cart</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- Footer Component ---
const Footer = () => {
    const { user } = useAuth();
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <span className="text-2xl font-bold text-white tracking-tight">Rental<span className="text-primary-500">Sys</span></span>
                    <p className="mt-4 text-sm text-gray-400">
                        Empowering construction and industrial projects with seamless equipment rental solutions.
                    </p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
                    <ul className="mt-4 space-y-4">
                        {(!user || user.role !== 'VENDOR') && (
                            <li><Link to="/products" className="text-base text-gray-300 hover:text-white">Browse Equipment</Link></li>
                        )}
                        {!user && (
                            <li><Link to="/register/vendor" className="text-base text-gray-300 hover:text-white">Vendor Portal</Link></li>
                        )}
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                    <ul className="mt-4 space-y-4">
                        <li><a href="#" className="text-base text-gray-300 hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="text-base text-gray-300 hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

// --- Dashboards ---
const CustomerDashboard = ({ user }) => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="md:flex md:items-center md:justify-between mb-8">
            <div className="flex-1 min-w-0">
                <h2 className="text-3xl font-extrabold leading-tight text-gray-900">
                    Welcome back, {user.name} 👋
                </h2>
                <p className="mt-2 text-gray-600 text-lg">Find the equipment you need for your next project.</p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
                <Link to="/products" className="ml-3 inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all">
                    Browse Equipment
                </Link>
            </div>
        </div>
        {/* Simplified Dashboard content for brevity - can be expanded */}
    </div>
);

// --- Home Component ---
const Home = () => {
    const { user } = useAuth();
    if (user) {
        if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" />;
        if (user.role === 'VENDOR') return <Navigate to="/vendor/dashboard" />;
        return <CustomerDashboard user={user} />;
    }
    return <LandingPage />;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased selection:bg-primary-100 selection:text-primary-700">
                    <div className="flex-grow">
                        <Navbar />
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register-selection" element={<RegisterSelection />} />
                            <Route path="/register/customer" element={<RegisterCustomer />} />
                            <Route path="/register/vendor" element={<RegisterVendor />} />

                            {/* Customer Routes */}
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:id" element={<ProductDetails />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/my-quotations" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><MyQuotations /></ProtectedRoute>} />
                            <Route path="/quotations/:id" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><QuotationDetailsPage /></ProtectedRoute>} />
                            <Route path="/my-invoices" element={<ProtectedRoute allowedRoles={['CUSTOMER']}><CustomerInvoices /></ProtectedRoute>} />

                            {/* Vendor Routes */}
                            <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['VENDOR']}><VendorDashboard /></ProtectedRoute>} />
                            <Route path="/vendor/add-product" element={<ProtectedRoute allowedRoles={['VENDOR']}><AddProduct /></ProtectedRoute>} />
                            <Route path="/vendor/edit-product/:id" element={<ProtectedRoute allowedRoles={['VENDOR']}><EditProduct /></ProtectedRoute>} />
                            <Route path="/vendor/orders" element={<ProtectedRoute allowedRoles={['VENDOR']}><VendorOrders /></ProtectedRoute>} />
                            <Route path="/vendor/quotations" element={<ProtectedRoute allowedRoles={['VENDOR']}><VendorQuotations /></ProtectedRoute>} />

                            {/* Admin Routes */}
                            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
                            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserManagement /></ProtectedRoute>} />
                            <Route path="/admin/users/:id" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserDetails /></ProtectedRoute>} />
                            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminSettings /></ProtectedRoute>} />

                            {/* Common Routes */}
                            <Route path="/invoices/:id" element={<InvoiceDetails />} />

                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
