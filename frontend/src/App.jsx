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
import InvoiceDetails from './pages/common/InvoiceDetails';
import LandingPage from './pages/LandingPage';
import Button from './components/common/Button';

// --- Components ---

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
                            {(!user || user.role !== 'VENDOR') && (
                                <Link to="/products" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                    Browse Equipment
                                </Link>
                            )}
                            {!user && (
                                <Link to="/register/vendor" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                    Become a Vendor
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {user ? (
                            <div className="flex items-center space-x-6">
                                {user.role === 'ADMIN' && (
                                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-primary-600 font-medium text-sm">Admin Dashboard</Link>
                                )}
                                {user.role === 'CUSTOMER' && (
                                    <>
                                        <Link to="/cart" className="text-gray-500 hover:text-primary-600 font-medium text-sm flex items-center gap-1">
                                            <span>Cart</span>
                                        </Link>
                                        <Link to="/quotations" className="text-gray-500 hover:text-primary-600 font-medium text-sm">My Orders</Link>
                                        <Link to="/customer/invoices" className="text-gray-500 hover:text-primary-600 font-medium text-sm">My Invoices</Link>
                                    </>
                                )}
                                {user.role === 'VENDOR' && (
                                    <>
                                        <Link to="/" className="text-gray-500 hover:text-primary-600 font-medium text-sm">Dashboard</Link>
                                        <Link to="/vendor/orders" className="text-gray-500 hover:text-primary-600 font-medium text-sm">Orders</Link>
                                        <Link to="/vendor/quotations" className="text-gray-500 hover:text-primary-600 font-medium text-sm">Quotations</Link>
                                    </>
                                )}
                                <div className="h-6 w-px bg-gray-300" aria-hidden="true" />
                                <div className="relative flex items-center cursor-pointer group">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.name}</span>
                                    <button onClick={handleLogout} className="ml-4 text-xs font-semibold text-gray-500 hover:text-red-600 uppercase tracking-wider border border-gray-200 rounded px-2 py-1 hover:bg-red-50 transition-colors">
                                        Log out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Sign in</Link>
                                <Link to="/register" className="bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:border-primary-100 transition-colors">
                <div className="px-6 py-8">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                            <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">Active Quotations</dt>
                                <dd>
                                    <div className="text-2xl font-bold text-gray-900">0</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-6 py-3">
                    <div className="text-sm">
                        <Link to="/quotations" className="font-medium text-primary-600 hover:text-primary-500">View orders <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- Main Layout ---

const Home = () => {
    const { user } = useAuth();
    if (user) {
        if (user.role === 'ADMIN') return <AdminDashboard />;
        if (user.role === 'VENDOR') return <VendorDashboard />;
        return <CustomerDashboard user={user} />;
    }
    return <LandingPage />;
};

function App() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased selection:bg-primary-100 selection:text-primary-700">
            <AuthProvider>
                <CartProvider>
                    <div className="flex flex-col min-h-screen">
                        <Navbar />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />

                                {/* Auth Routes */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<RegisterSelection />} />
                                <Route path="/register/customer" element={<RegisterCustomer />} />
                                <Route path="/register/vendor" element={<RegisterVendor />} />

                                <Route path="/products" element={<Products />} />
                                <Route path="/products/:id" element={<ProductDetails />} />

                                <Route path="/cart" element={<Cart />} />
                                <Route path="/quotations" element={<MyQuotations />} />
                                <Route path="/quotations/:id" element={<QuotationDetailsPage />} />
                                <Route path="/customer/invoices" element={<CustomerInvoices />} />

                                {/* Vendor Routes */}
                                <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                                <Route path="/vendor/add-product" element={<AddProduct />} />
                                <Route path="/vendor/edit-product/:id" element={<EditProduct />} />
                                <Route path="/vendor/orders" element={<VendorOrders />} />
                                <Route path="/vendor/quotations" element={<VendorQuotations />} />

                                {/* Admin Routes */}
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />

                                {/* Common Routes */}
                                <Route path="/invoices/:id" element={<InvoiceDetails />} />
                            </Routes>
                        </main>
                        <Footer />
                    </div>
                </CartProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
