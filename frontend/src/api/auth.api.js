import axiosClient from './axiosClient';

export const login = async (credentials) => {
    const response = await axiosClient.post('/api/auth/login', credentials);
    return response.data;
};

export const registerCustomer = async (data) => {
    const response = await axiosClient.post('/api/auth/register', { ...data, role: 'CUSTOMER' });
    return response.data;
};

export const registerVendor = async (data) => {
    const response = await axiosClient.post('/api/auth/register-vendor', data);
    return response.data;
};
