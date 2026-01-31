import axiosClient from './axiosClient';

export const createInvoice = async (orderId) => {
    const response = await axiosClient.post('/api/invoices', { order_id: orderId });
    return response.data;
};

export const getMyInvoices = async () => {
    const response = await axiosClient.get('/api/invoices');
    return response.data;
};

export const getInvoiceById = async (id) => {
    const response = await axiosClient.get(`/api/invoices/${id}`);
    return response.data;
};
