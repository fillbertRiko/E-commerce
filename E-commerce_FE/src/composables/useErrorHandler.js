import { ref } from 'vue';
import { useNotification } from './useNotification';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { STATUS_CODES } from '@/utils/constants';

export const useErrorHandler = () => {
  const error = ref(null);
  const notification = useNotification();
  const router = useRouter();
  const authStore = useAuthStore();

  const handleError = (err) => {
    error.value = err;

    // Get error details
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message;
    const errors = err.response?.data?.errors;

    // Handle specific status codes
    switch (status) {
      case STATUS_CODES.UNAUTHORIZED:
        authStore.clearAuth();
        router.push('/login');
        notification.error('Session expired. Please login again.');
        break;

      case STATUS_CODES.FORBIDDEN:
        notification.error('You do not have permission to perform this action.');
        break;

      case STATUS_CODES.NOT_FOUND:
        notification.error('The requested resource was not found.');
        break;

      case STATUS_CODES.VALIDATION_ERROR:
        if (errors) {
          // Handle validation errors
          Object.values(errors).forEach(error => {
            notification.error(error[0]);
          });
        } else {
          notification.error(message || 'Validation failed. Please check your input.');
        }
        break;

      case STATUS_CODES.SERVER_ERROR:
        notification.error('An unexpected error occurred. Please try again later.');
        // Log error to monitoring service
        console.error('Server Error:', err);
        break;

      default:
        notification.error(message || 'An error occurred. Please try again.');
        break;
    }

    return err;
  };

  const withErrorHandler = async (callback) => {
    try {
      error.value = null;
      return await callback();
    } catch (err) {
      handleError(err);
      throw err;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    error,
    handleError,
    withErrorHandler,
    clearError
  };
}; 