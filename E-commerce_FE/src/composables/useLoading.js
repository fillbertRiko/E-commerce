import { ref } from 'vue';

export const useLoading = (initialState = false) => {
  const isLoading = ref(initialState);

  const withLoading = async (callback) => {
    try {
      isLoading.value = true;
      return await callback();
    } finally {
      isLoading.value = false;
    }
  };

  const startLoading = () => {
    isLoading.value = true;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  return {
    isLoading,
    withLoading,
    startLoading,
    stopLoading
  };
}; 