import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Package, Shield, Truck } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover opacity-40"
                        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Construction site"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center min-h-[80vh]">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
                        <span className="block mb-2">Build Faster with</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
                            Premium Equipment
                        </span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-300 max-w-3xl leading-relaxed">
                        The #1 platform for construction and industrial equipment rentals.
                        Access a vast inventory of top-tier machinery, manage your projects efficiently,
                        and scale your operations without the overhead.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/register"
                            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-primary-600 hover:bg-primary-700 transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-primary-500/30"
                        >
                            Start Renting Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-500 text-lg font-bold rounded-full text-gray-100 hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out backdrop-blur-sm"
                        >
                            Browse Catalog
                        </Link>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 border-t border-gray-700 pt-8">
                        <div>
                            <p className="text-3xl font-bold text-white">500+</p>
                            <p className="text-sm text-gray-400">Machines Available</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">98%</p>
                            <p className="text-sm text-gray-400">Uptime Guarantee</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">24/7</p>
                            <p className="text-sm text-gray-400">Support Team</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">10k+</p>
                            <p className="text-sm text-gray-400">Happy Clients</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to manage rentals
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                            We handle the complexities of equipment logistics so you can focus on getting the job done.
                        </p>
                    </div>

                    <div className="mt-20">
                        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                                    <Package className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Massive Inventory</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    From excavators to power tools, find exactly what you need from our verified vendor network.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                                    <Truck className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Fast Delivery</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Real-time logistics tracking ensures your equipment arrives on site, on time, every time.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                                    <Shield className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Secure Payments</h3>
                                <p className="mt-4 text-base text-gray-500">
                                    Transparent pricing and secure transactions giving you complete peace of mind.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-primary-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to streamline your workflow?</span>
                        <span className="block text-primary-200">Create your account today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-primary-100">
                        Join thousands of contractors and project managers who trust us for their equipment needs.
                    </p>
                    <Link
                        to="/register"
                        className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto"
                    >
                        Sign up for free
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
