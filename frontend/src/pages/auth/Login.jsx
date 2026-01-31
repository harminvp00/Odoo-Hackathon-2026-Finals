import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Fix import path if needed
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Login = () => {
    const navigate = useNavigate();
    const { login, user } = useAuth(); // Get user to check status
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Redirect if already logged in
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/'); // Redirect to Dashboard
        } catch (err) {
            console.error("Login failed", err);
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to access your platform
                    </p>
                </div>
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4" role="alert">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <Input
                            label="Email Address"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4"
                        />
                        <div className="mt-4">
                            <Input
                                label="Password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="text-sm">
                            <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <Button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-md transform transition hover:scale-105">
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>
                    </div>
                </form>
                <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
