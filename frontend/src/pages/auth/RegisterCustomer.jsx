import React, { useState } from 'react';
import { registerCustomer } from '../../api/auth.api';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const RegisterCustomer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
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
            console.log("Submitting registration:", formData);
            await registerCustomer({
                email: formData.email,
                password: formData.password,
                full_name: formData.fullName,
                phone: formData.phone
            });
            alert("Registration successful! Please login.");
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
                    Create Customer Account
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
                            label="Full Name"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
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
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
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
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterCustomer;
