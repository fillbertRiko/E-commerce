import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '@/services/axios';

export const useWishlistStore = defineStore('wishlist', () => {
    const wishlistItems = ref([]);

    const fetchWishlist = async () => {
        try {
            const response = await axios.get('/api/wishlist');
            wishlistItems.value = response.data.data;
            return wishlistItems.value;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch wishlist');
        }
    };

    const addToWishlist = async (productId) => {
        try {
            await axios.post('/api/wishlist', { productId });
            await fetchWishlist();
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to add item to wishlist');
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await axios.delete(`/api/wishlist/${productId}`);
            wishlistItems.value = wishlistItems.value.filter(item => item.id !== productId);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to remove item from wishlist');
        }
    };

    const isInWishlist = (productId) => {
        return wishlistItems.value.some(item => item.id === productId);
    };

    return {
        wishlistItems,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    };
}); 