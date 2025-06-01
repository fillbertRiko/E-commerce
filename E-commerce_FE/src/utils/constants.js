// App Constants
export const APP_NAME = 'E-Shop';
export const APP_DESCRIPTION = 'Your one-stop shop for everything you need';

// API Status Codes
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  SERVER_ERROR: 500
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user'
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded'
};

// Payment Methods
export const PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  PAYPAL: 'paypal',
  BANK_TRANSFER: 'bank_transfer'
};

// Product Sort Options
export const SORT_OPTIONS = {
  NEWEST: 'newest',
  PRICE_LOW_TO_HIGH: 'price_asc',
  PRICE_HIGH_TO_LOW: 'price_desc',
  NAME_A_TO_Z: 'name_asc',
  NAME_Z_TO_A: 'name_desc'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 12,
  MAX_PER_PAGE: 100
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
  CART: 'cart',
  THEME: 'theme'
};

// Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  MIN_LENGTH: (min) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max) => `Must be no more than ${max} characters`,
  PASSWORDS_MATCH: 'Passwords must match',
  PHONE: 'Please enter a valid phone number'
};

// File Upload
export const UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  MAX_FILES: 5
};

// API Endpoints (in addition to those in api.js)
export const ENDPOINTS = {
  SEARCH: '/search',
  CATEGORIES: '/categories',
  PRODUCTS: '/products',
  CART: '/cart',
  ORDERS: '/orders',
  USER: '/user',
  REVIEWS: '/reviews'
}; 