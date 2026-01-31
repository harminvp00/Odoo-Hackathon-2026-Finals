import axiosClient from './axiosClient';

// Get all attributes with their values
export const getAttributes = async () => {
    const response = await axiosClient.get('/api/attributes');
    return response.data;
};

// Create a new attribute (Vendor/Admin)
export const createAttribute = async (data) => {
    const response = await axiosClient.post('/api/attributes', data);
    return response.data;
};
