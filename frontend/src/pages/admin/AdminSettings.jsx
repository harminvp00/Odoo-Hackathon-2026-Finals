import React, { useEffect, useState } from 'react';
import { getSystemSettings, updateSystemSettings } from '../../api/admin.api';
import { Save, RefreshCw } from 'lucide-react';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        company_name: '',
        gstin: '',
        address: '',
        phone: '',
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const data = await getSystemSettings();
            setSettings(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSystemSettings(settings);
            alert("Settings updated successfully");
        } catch (error) {
            console.error("Failed to update settings", error);
            alert("Failed to update settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Settings...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                            System Settings
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage global configuration for the platform.
                        </p>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                            <div className="sm:col-span-3">
                                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">
                                    Company/Platform Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="company_name"
                                        id="company_name"
                                        value={settings.company_name}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="gstin" className="block text-sm font-medium text-gray-700">
                                    GSTIN (Global)
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="gstin"
                                        id="gstin"
                                        value={settings.gstin}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Office Address
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows={3}
                                        value={settings.address}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Support Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={settings.email}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Support Phone
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={settings.phone}
                                        onChange={handleChange}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="pt-5 flex justify-end">
                            <button
                                type="button"
                                onClick={fetchSettings}
                                disabled={saving}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                            >
                                <RefreshCw className="h-4 w-4 inline mr-1" /> Reset
                            </button>
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Save className="h-4 w-4 inline mr-1" /> {saving ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
