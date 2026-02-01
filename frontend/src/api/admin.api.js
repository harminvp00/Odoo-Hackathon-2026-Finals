import axiosClient from './axiosClient';

export const getDashboardStats = async () => {
    // Updated path to match routes
    const response = await axiosClient.get('/api/admin/dashboard/stats');
    return response.data;
};

export const getRecentActivity = async () => {
    const response = await axiosClient.get('/api/admin/dashboard/activity');
    return response.data;
};

export const getAnalytics = async () => {
    const response = await axiosClient.get('/api/admin/dashboard/analytics');
    return response.data;
};

// User Management
export const getAllUsers = async (role) => {
    const params = role ? { role } : {};
    const response = await axiosClient.get('/api/admin/users', { params });
    return response.data;
};

export const getUserDetails = async (id, type) => {
    const params = type ? { type } : {};
    const response = await axiosClient.get(`/api/admin/users/${id}`, { params });
    return response.data;
};

export const updateUserStatus = async (id, status) => {
    const response = await axiosClient.put(`/api/admin/users/${id}/status`, { status });
    return response.data;
};

// System Settings
export const getSystemSettings = async () => {
    const response = await axiosClient.get('/api/admin/settings');
    return response.data;
};

export const updateSystemSettings = async (data) => {
    const response = await axiosClient.post('/api/admin/settings', data);
    return response.data;
};
