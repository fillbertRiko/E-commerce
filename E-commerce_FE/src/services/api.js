import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true // Quan trọng cho việc xử lý cookie CSRF
});

// Interceptor để thêm token vào header
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();

    if (error.response?.status === 401) {
      // Xóa token nếu hết hạn
      authStore.clearAuth();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Authentication
export const authApi = {
  getCsrfCookie: () => axios.get(`${API_URL}/sanctum/csrf-cookie`),
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getUser: () => api.get('/auth/user'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data)
};

// API cho Dashboard
export const dashboardApi = {
  getStatistics: () => api.get('/dashboard/statistics'),
  getChartData: (params) => api.get('/dashboard/chart', { params }),
  getRecentOrders: () => api.get('/dashboard/recent-orders'),
  getTopProducts: () => api.get('/dashboard/top-products'),
  getRevenueStats: () => api.get('/dashboard/revenue-stats')
};

// API cho Sản phẩm
export const productApi = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  search: (query) => api.get(`/products/search`, { params: { query } }),
  getFeatured: () => api.get('/products/featured'),
  getRelated: (id) => api.get(`/products/${id}/related`),
  updateStock: (id, quantity) => api.patch(`/products/${id}/stock`, { quantity })
};

// API cho Đơn hàng
export const orderApi = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  getCustomerOrders: () => api.get('/orders/my-orders'),
  cancelOrder: (id) => api.post(`/orders/${id}/cancel`),
  getOrderTracking: (id) => api.get(`/orders/${id}/tracking`)
};

// API cho Khách hàng
export const customerApi = {
  getAll: (params) => api.get('/customers', { params }),
  getById: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
  updateProfile: (data) => api.put('/customers/profile', data),
  getAddresses: () => api.get('/customers/addresses'),
  addAddress: (data) => api.post('/customers/addresses', data),
  updateAddress: (id, data) => api.put(`/customers/addresses/${id}`, data),
  deleteAddress: (id) => api.delete(`/customers/addresses/${id}`)
};

// API cho Danh mục
export const categoryApi = {
  getAll: (params) => api.get('/categories', { params }),
  getById: (id) => api.get(`/categories/${id}`),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
  getProducts: (id) => api.get(`/categories/${id}/products`),
  getTree: () => api.get('/categories/tree')
};

// API cho Giỏ hàng
export const cartApi = {
  get: () => api.get('/cart'),
  add: (productId, quantity) => api.post('/cart/items', { product_id: productId, quantity }),
  update: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  remove: (itemId) => api.delete(`/cart/items/${itemId}`),
  clear: () => api.delete('/cart'),
  applyCoupon: (code) => api.post('/cart/coupon', { code }),
  removeCoupon: () => api.delete('/cart/coupon')
};

// API cho Wishlist
export const wishlistApi = {
  get: () => api.get('/wishlist'),
  add: (productId) => api.post('/wishlist/items', { product_id: productId }),
  remove: (productId) => api.delete(`/wishlist/items/${productId}`),
  clear: () => api.delete('/wishlist')
};

// API cho Reviews
export const reviewApi = {
  getProductReviews: (productId) => api.get(`/products/${productId}/reviews`),
  addReview: (productId, data) => api.post(`/products/${productId}/reviews`, data),
  updateReview: (reviewId, data) => api.put(`/reviews/${reviewId}`, data),
  deleteReview: (reviewId) => api.delete(`/reviews/${reviewId}`)
};

export default api;

// API endpoints
export const endpoints = {
  auth: {
    csrf: '/sanctum/csrf-cookie',
    login: '/login',
    register: '/register',
    logout: '/logout',
    user: '/user'
  },
  products: {
    list: '/products',
    detail: (id) => `/products/${id}`,
    create: '/products',
    update: (id) => `/products/${id}`,
    delete: (id) => `/products/${id}`
  },
  categories: {
    list: '/categories',
    detail: (id) => `/categories/${id}`,
    create: '/categories',
    update: (id) => `/categories/${id}`,
    delete: (id) => `/categories/${id}`
  },
  cart: {
    get: '/cart',
    add: '/cart/items',
    update: (id) => `/cart/items/${id}`,
    remove: (id) => `/cart/items/${id}`,
    clear: '/cart'
  },
  orders: {
    list: '/orders',
    detail: (id) => `/orders/${id}`,
    create: '/orders',
    cancel: (id) => `/orders/${id}/cancel`
  },
  user: {
    profile: '/user/profile',
    updateProfile: '/user/profile',
    addresses: '/user/addresses',
    wishlist: '/user/wishlist'
  }
}; 