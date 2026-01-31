import axiosClient from './axiosClient';

export const getProducts = async (filters) => {
    const params = new URLSearchParams(filters).toString();
    const response = await axiosClient.get(`/api/products?${params}`);
    return response.data;
};

export const getMyProducts = async () => {
    const response = await axiosClient.get('/api/products/my-products');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axiosClient.get(`/api/products/${id}`);
    return response.data;
};

export const createProduct = async (formData) => {
    const response = await axiosClient.post('/api/products', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateProduct = async (id, data) => {
    const response = await axiosClient.put(`/api/products/${id}`, data);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axiosClient.delete(`/api/products/${id}`);
    return response.data;
};
