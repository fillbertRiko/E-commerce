import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api, { endpoints } from '@/services/api';
import { useNotification } from '@/composables/useNotification';
import { ORDER_STATUS, PAGINATION } from '@/utils/constants';

export const useOrderStore = defineStore('order', () => {
  // State
  const orders = ref([]);
  const currentOrder = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: PAGINATION.DEFAULT_PER_PAGE,
    total: 0
  });
  const filters = ref({
    status: null,
    dateRange: { start: null, end: null },
    sort: 'newest'
  });

  // Composables
  const notification = useNotification();

  // Getters
  const sortedOrders = computed(() => {
    let result = [...orders.value];
    
    switch (filters.value.sort) {
      case 'total_asc':
        result.sort((a, b) => a.total - b.total);
        break;
      case 'total_desc':
        result.sort((a, b) => b.total - a.total);
        break;
      default: // newest
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    
    return result;
  });

  const ordersByStatus = computed(() => {
    const result = {};
    Object.values(ORDER_STATUS).forEach(status => {
      result[status] = orders.value.filter(order => order.status === status);
    });
    return result;
  });

  // Actions
  const fetchOrders = async (params = {}) => {
    try {
      loading.value = true;
      error.value = null;
      
      const queryParams = {
        page: pagination.value.currentPage,
        per_page: pagination.value.perPage,
        status: filters.value.status,
        date_start: filters.value.dateRange.start,
        date_end: filters.value.dateRange.end,
        sort: filters.value.sort,
        ...params
      };

      const response = await api.get(endpoints.orders.list, { params: queryParams });
      orders.value = response.data.data;
      pagination.value = {
        currentPage: response.data.current_page,
        totalPages: response.data.last_page,
        perPage: response.data.per_page,
        total: response.data.total
      };
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch orders';
      notification.error('Failed to fetch orders');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchOrder = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.get(endpoints.orders.detail(id));
      currentOrder.value = response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch order';
      notification.error('Failed to fetch order details');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createOrder = async (orderData) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.post(endpoints.orders.create, orderData);
      orders.value.unshift(response.data);
      notification.success('Order created successfully');
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create order';
      notification.error('Failed to create order');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const cancelOrder = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.post(endpoints.orders.cancel(id));
      const index = orders.value.findIndex(o => o.id === id);
      if (index !== -1) {
        orders.value[index] = response.data;
      }
      if (currentOrder.value?.id === id) {
        currentOrder.value = response.data;
      }
      notification.success('Order cancelled successfully');
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to cancel order';
      notification.error('Failed to cancel order');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
    pagination.value.currentPage = 1; // Reset to first page when filters change
    fetchOrders();
  };

  const setPage = (page) => {
    pagination.value.currentPage = page;
    fetchOrders();
  };

  const clearFilters = () => {
    filters.value = {
      status: null,
      dateRange: { start: null, end: null },
      sort: 'newest'
    };
    fetchOrders();
  };

  return {
    // State
    orders,
    currentOrder,
    loading,
    error,
    pagination,
    filters,

    // Getters
    sortedOrders,
    ordersByStatus,

    // Actions
    fetchOrders,
    fetchOrder,
    createOrder,
    cancelOrder,
    setFilters,
    setPage,
    clearFilters
  };
}); 