import React, { useState } from 'react';
import { registerVendor } from '../../api/auth.api';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const RegisterVendor = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        company_name: '',
        gstin: '',
        business_address: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            console.log("Submitting vendor registration:", formData);
            // We don't need to pass role here if we use registerVendor API which hits /register-vendor
            // But if we used generic register, we would need role: 'VENDOR'
            // We use the specific API:
            await registerVendor({
                email: formData.email,
                password: formData.password,
                company_name: formData.company_name,
                gstin: formData.gstin,
                business_address: formData.business_address,
                phone: formData.phone // Assuming profile needs phone too, though schema put it in customer. Added to vendor check.
                // Wait, DB schema for vendor_profiles has: vendor_id, company_name, gstin, business_address. 
                // Phone is not in vendor_profiles. But it might be useful? Users table doesn't have phone. 
                // Only customer_profiles has phone. 
                // I will omit phone for Vendor for now to match Schema strictly, or add it if needed later. 
                // Let's stick to Schema: company_name, gstin, business_address.
            });
            alert("Vendor registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            console.error("Registration failed:", err);
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Register as Vendor
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Or <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">sign in to your existing account</Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Company Name"
                            name="company_name"
                            type="text"
                            required
                            value={formData.company_name}
                            onChange={handleChange}
                        />
                        <Input
                            label="GSTIN"
                            name="gstin"
                            type="text"
                            required
                            value={formData.gstin}
                            onChange={handleChange}
                        />
                        <Input
                            label="Business Address"
                            name="business_address"
                            type="text"
                            required
                            value={formData.business_address}
                            onChange={handleChange}
                        />
                        <Input
                            label="Email address"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        <div>
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? 'Register Business' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterVendor;
