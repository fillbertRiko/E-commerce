import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/services/axios';

export const useAddressStore = defineStore('address', () => {
    const addresses = ref([]);

    const fetchAddresses = async () => {
        try {
            const response = await axios.get('/api/addresses');
            addresses.value = response.data.data;
            return addresses.value;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch addresses');
        }
    };

    const addAddress = async (addressData) => {
        try {
            const response = await axios.post('/api/addresses', addressData);
            addresses.value.push(response.data.data);
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to add address');
        }
    };

    const updateAddress = async (id, addressData) => {
        try {
            const response = await axios.put(`/api/addresses/${id}`, addressData);
            const index = addresses.value.findIndex(address => address.id === id);
            if (index !== -1) {
                addresses.value[index] = response.data.data;
            }
            return response.data.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update address');
        }
    };

    const deleteAddress = async (id) => {
        try {
            await axios.delete(`/api/addresses/${id}`);
            addresses.value = addresses.value.filter(address => address.id !== id);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete address');
        }
    };

    const setDefaultAddress = async (id) => {
        try {
            await axios.put(`/api/addresses/${id}/default`);
            addresses.value = addresses.value.map(address => ({
                ...address,
                is_default: address.id === id
            }));
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to set default address');
        }
    };

    return {
        addresses,
        fetchAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress
    };
}); 