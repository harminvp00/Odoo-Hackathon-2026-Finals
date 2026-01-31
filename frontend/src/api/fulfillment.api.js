import axiosClient from './axiosClient';

export const processPickup = async (orderId) => {
    const response = await axiosClient.post('/api/fulfillment/pickup', { order_id: orderId });
    return response.data;
};

export const processReturn = async (orderId) => {
    const response = await axiosClient.post('/api/fulfillment/return', { order_id: orderId });
    return response.data;
};
