import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api, { endpoints } from '@/services/api';
import { useNotification } from '@/composables/useNotification';

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Composables
  const notification = useNotification();

  // Getters
  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  const isEmpty = computed(() => items.value.length === 0);

  // Actions
  const fetchCart = async () => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.get(endpoints.cart.get);
      items.value = response.data.items;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch cart';
      notification.error('Failed to fetch cart items');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const addItem = async (item) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.post(endpoints.cart.add, item);
      items.value = response.data.items;
      notification.success('Item added to cart');
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to add item to cart';
      notification.error('Failed to add item to cart');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateItemQuantity = async (itemId, quantity) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.patch(endpoints.cart.update(itemId), { quantity });
      items.value = response.data.items;
      notification.success('Cart updated');
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update cart';
      notification.error('Failed to update cart');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const removeItem = async (itemId) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.delete(endpoints.cart.remove(itemId));
      items.value = response.data.items;
      notification.success('Item removed from cart');
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to remove item from cart';
      notification.error('Failed to remove item from cart');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const clearCart = async () => {
    try {
      loading.value = true;
      error.value = null;
      await api.delete(endpoints.cart.clear);
      items.value = [];
      notification.success('Cart cleared');
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to clear cart';
      notification.error('Failed to clear cart');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const initialize = async () => {
    await fetchCart();
  };

  return {
    // State
    items,
    loading,
    error,

    // Getters
    itemCount,
    totalPrice,
    isEmpty,

    // Actions
    fetchCart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    initialize
  };
}); 