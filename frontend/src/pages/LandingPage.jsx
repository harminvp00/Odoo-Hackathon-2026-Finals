import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Package, Shield, Zap, Search, Globe, Users } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover opacity-30"
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="People collaborating"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900/90 to-blue-900/50"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[85vh] text-center sm:text-left">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
                        <span className="block mb-2">Rent Anything.</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            Limitless Possibilities.
                        </span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl leading-relaxed sm:mx-0 mx-auto">
                        The ultimate marketplace for everyone. From professional gear and electronics to party supplies and tools.
                        Don't buy it if you check it out for a day. Save money, save space, and live lighter.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                        <Link
                            to="/register-selection"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg shadow-blue-600/30"
                        >
                            Get Started
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-500 text-lg font-bold rounded-full text-gray-100 hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out"
                        >
                            Explore Items
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-gray-700/50 pt-8">
                        <div>
                            <p className="text-4xl font-bold text-white mb-1">50+</p>
                            <p className="text-sm font-medium text-blue-300">Categories</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-1">10k+</p>
                            <p className="text-sm font-medium text-blue-300">Active Users</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-1">100%</p>
                            <p className="text-sm font-medium text-blue-300">Secure</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-1">24/7</p>
                            <p className="text-sm font-medium text-blue-300">Support</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Value Proposition Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-base text-blue-600 font-bold tracking-wide uppercase">Why RentalSys?</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A smarter way to access what you need
                        </p>
                        <p className="mt-4 text-xl text-gray-600">
                            Whether you're a business needing equipment or an individual planning an event, we've got you covered.
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                <div className="absolute top-0 right-0 -mt-6 -mr-6 h-24 w-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-600 text-white mb-6 shadow-lg shadow-blue-600/20">
                                        <Globe className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Open to Everyone</h3>
                                    <p className="mt-4 text-base text-gray-500 leading-relaxed">
                                        Not just for big industry. Our platform connects neighbours, local businesses, and communities. Rent a ladder, a drone, or a sound system.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                <div className="absolute top-0 right-0 -mt-6 -mr-6 h-24 w-24 bg-emerald-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-emerald-500 text-white mb-6 shadow-lg shadow-emerald-500/20">
                                        <Shield className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Verified & Safe</h3>
                                    <p className="mt-4 text-base text-gray-500 leading-relaxed">
                                        Every user is verified. Every transaction is secured. We prioritize your safety so you can rent with absolute confidence.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 3 */}
                            <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                                <div className="absolute top-0 right-0 -mt-6 -mr-6 h-24 w-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-purple-600 text-white mb-6 shadow-lg shadow-purple-600/20">
                                        <Zap className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Instant Booking</h3>
                                    <p className="mt-4 text-base text-gray-500 leading-relaxed">
                                        No lengthy paperwork. Find an item, check availability in real-time, and book it in seconds. Getting what you need has never been faster.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4">
                        <div className="relative">
                            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl mb-4">1</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Search</h3>
                            <p className="text-gray-500">Find the perfect item from our extensive catalog.</p>
                        </div>
                        <div className="relative">
                            <div className="hidden md:block absolute top-8 left-[-50%] right-[50%] h-0.5 bg-gray-200 -z-10"></div>
                            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl mb-4">2</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Book</h3>
                            <p className="text-gray-500">Choose your dates and confirm your booking instantly.</p>
                        </div>
                        <div className="relative">
                            <div className="hidden md:block absolute top-8 left-[-50%] right-[50%] h-0.5 bg-gray-200 -z-10"></div>
                            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl mb-4">3</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Enjoy</h3>
                            <p className="text-gray-500">Pick it up or get it delivered. Use it. Return it.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800">
                <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Join the sharing economy.</span>
                        <span className="block text-blue-200 mt-2">Start your journey with RentalSys today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-blue-100 max-w-2xl mx-auto">
                        Whether you want to earn money by listing items or save money by renting, we are the platform for you.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link
                            to="/register/customer"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 transition-colors shadow-lg"
                        >
                            Sign Up Free
                        </Link>
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-5 py-3 border border-blue-300 text-base font-medium rounded-md text-white hover:bg-blue-600/50 transition-colors"
                        >
                            Browse Items
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
