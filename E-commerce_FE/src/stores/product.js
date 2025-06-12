import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api, { endpoints } from '@/services/api';
import { useNotification } from '@/composables/useNotification';
import { PAGINATION } from '@/utils/constants';
import axios from '@/services/axios';

export const useProductStore = defineStore('product', () => {
  // State
  const products = ref([]);
  const currentProduct = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const pagination = ref({
    currentPage: 1,
    totalPages: 1,
    perPage: PAGINATION.DEFAULT_PER_PAGE,
    total: 0
  });
  const filters = ref({
    category: null,
    priceRange: { min: null, max: null },
    sort: 'newest',
    search: ''
  });
  const totalProducts = ref(0);
  const currentPage = ref(1);
  const lastPage = ref(1);

  // Composables
  const notification = useNotification();

  // Getters
  const sortedProducts = computed(() => {
    let result = [...products.value];
    
    switch (filters.value.sort) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // newest
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
    
    return result;
  });

  // Actions
  const fetchProducts = async (params = {}) => {
    try {
      loading.value = true;
      error.value = null;
      
      const queryParams = {
        page: pagination.value.currentPage,
        per_page: pagination.value.perPage,
        category: filters.value.category,
        price_min: filters.value.priceRange.min,
        price_max: filters.value.priceRange.max,
        sort: filters.value.sort,
        search: filters.value.search,
        ...params
      };

      const response = await api.get(endpoints.products.list, { params: queryParams });
      products.value = response.data.data;
      totalProducts.value = response.data.total;
      currentPage.value = response.data.current_page;
      lastPage.value = response.data.last_page;
      pagination.value = {
        currentPage: response.data.current_page,
        totalPages: response.data.last_page,
        perPage: response.data.per_page,
        total: response.data.total
      };
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch products';
      notification.error('Failed to fetch products');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchProduct = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.get(endpoints.products.detail(id));
      currentProduct.value = response.data;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch product';
      notification.error('Failed to fetch product details');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createProduct = async (productData) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.post(endpoints.products.create, productData);
      products.value.unshift(response.data);
      notification.success('Product created successfully');
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create product';
      notification.error('Failed to create product');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await api.patch(endpoints.products.update(id), productData);
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) {
        products.value[index] = response.data;
      }
      if (currentProduct.value?.id === id) {
        currentProduct.value = response.data;
      }
      notification.success('Product updated successfully');
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update product';
      notification.error('Failed to update product');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteProduct = async (id) => {
    try {
      loading.value = true;
      error.value = null;
      await api.delete(endpoints.products.delete(id));
      products.value = products.value.filter(p => p.id !== id);
      if (currentProduct.value?.id === id) {
        currentProduct.value = null;
      }
      notification.success('Product deleted successfully');
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete product';
      notification.error('Failed to delete product');
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const setFilters = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters };
    pagination.value.currentPage = 1; // Reset to first page when filters change
    fetchProducts();
  };

  const setPage = (page) => {
    pagination.value.currentPage = page;
    fetchProducts();
  };

  const clearFilters = () => {
    filters.value = {
      category: null,
      priceRange: { min: null, max: null },
      sort: 'newest',
      search: ''
    };
    fetchProducts();
  };

  const searchProducts = async (query, params = {}) => {
    try {
      const response = await axios.get('/api/products/search', {
        params: { query, ...params }
      });
      products.value = response.data.data;
      totalProducts.value = response.data.total;
      currentPage.value = response.data.current_page;
      lastPage.value = response.data.last_page;
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search products');
    }
  };

  const addReview = async (productId, reviewData) => {
    try {
      const response = await axios.post(`/api/products/${productId}/reviews`, reviewData);
      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add review');
    }
  };

  const fetchProductReviews = async (productId, params = {}) => {
    try {
      const response = await axios.get(`/api/products/${productId}/reviews`, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch reviews');
    }
  };

  return {
    // State
    products,
    currentProduct,
    loading,
    error,
    pagination,
    filters,
    totalProducts,
    currentPage,
    lastPage,

    // Getters
    sortedProducts,

    // Actions
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    setFilters,
    setPage,
    clearFilters,
    searchProducts,
    addReview,
    fetchProductReviews
  };
}); 