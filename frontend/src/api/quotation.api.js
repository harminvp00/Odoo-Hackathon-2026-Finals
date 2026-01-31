import axiosClient from './axiosClient';

export const createQuotation = async (items) => {
    const response = await axiosClient.post('/api/quotations', { items });
    return response.data;
};

export const getMyQuotations = async () => {
    // Backend now filters based on token (Customer ID or Vendor ID)
    const response = await axiosClient.get('/api/quotations');
    return response.data;
};

export const getQuotationById = async (id) => {
    const response = await axiosClient.get(`/api/quotations/${id}`);
    return response.data;
};

export const confirmOrder = async (quotationId) => {
    const response = await axiosClient.post('/api/orders', { quotation_id: quotationId });
    return response.data;
};
