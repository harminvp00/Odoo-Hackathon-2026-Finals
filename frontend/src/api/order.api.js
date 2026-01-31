import axiosClient from './axiosClient';

export const createOrder = async (quotationId) => {
    const response = await axiosClient.post('/api/orders', { quotation_id: quotationId });
    return response.data;
};

export const getOrders = async (filters) => {
    const params = new URLSearchParams(filters).toString();
    const response = await axiosClient.get(`/api/orders?${params}`);
    return response.data;
};
