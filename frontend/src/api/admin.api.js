import axiosClient from './axiosClient';

export const getDashboardStats = async () => {
    const response = await axiosClient.get('/api/admin/stats');
    return response.data;
};

export const getRecentActivity = async () => {
    const response = await axiosClient.get('/api/admin/activity');
    return response.data;
};
