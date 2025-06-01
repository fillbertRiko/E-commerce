import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@/composables/useNotification';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const notification = useNotification();
        const status = error.response?.status;

        // Handle different error statuses
        switch (status) {
            case 401:
                const authStore = useAuthStore();
                authStore.logout();
                break;
            case 403:
                notification.error('You do not have permission to perform this action');
                break;
            case 404:
                notification.error('The requested resource was not found');
                break;
            case 422:
                // Validation errors
                const errors = error.response.data.errors;
                if (errors) {
                    Object.values(errors).forEach(error => {
                        notification.error(error[0]);
                    });
                }
                break;
            case 500:
                notification.error('An internal server error occurred');
                break;
            default:
                notification.error(error.response?.data?.message || 'An error occurred');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance; 