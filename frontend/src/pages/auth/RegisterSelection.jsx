import React from 'react';
import { Link } from 'react-router-dom';

const RegisterSelection = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">Join Us</h2>
                <p className="text-gray-600">Choose your account type</p>

                <div className="space-y-4 mt-6">
                    <Link to="/register/customer" className="block w-full py-4 border-2 border-primary-100 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all">
                        <h3 className="text-xl font-bold text-primary-700">I am a Customer</h3>
                        <p className="text-gray-500">I want to rent products</p>
                    </Link>

                    <Link to="/register/vendor" className="block w-full py-4 border-2 border-gray-200 rounded-lg hover:border-gray-500 hover:bg-gray-50 transition-all">
                        <h3 className="text-xl font-bold text-gray-700">I am a Vendor</h3>
                        <p className="text-gray-500">I want to list my products</p>
                    </Link>
                </div>

                <div className="mt-4">
                    <Link to="/login" className="text-sm text-primary-600 hover:underline">
                        Already have an account? Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterSelection;
