import { ref, onMounted, onUnmounted } from 'vue';

export const useInfiniteScroll = (loadMore, options = {}) => {
  const {
    threshold = 100,
    immediate = true,
    container = null
  } = options;

  const loading = ref(false);
  const finished = ref(false);
  const error = ref(null);

  const handleScroll = async () => {
    if (loading.value || finished.value) return;

    const target = container ? document.querySelector(container) : document;
    const scrollElement = container ? target : document.documentElement;
    const scrollHeight = scrollElement.scrollHeight;
    const scrollTop = scrollElement.scrollTop;
    const clientHeight = scrollElement.clientHeight;

    if (scrollHeight - (scrollTop + clientHeight) <= threshold) {
      try {
        loading.value = true;
        error.value = null;
        const hasMore = await loadMore();
        finished.value = !hasMore;
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    }
  };

  const reset = () => {
    finished.value = false;
    error.value = null;
  };

  onMounted(() => {
    const target = container ? document.querySelector(container) : window;
    target.addEventListener('scroll', handleScroll);

    if (immediate) {
      handleScroll();
    }
  });

  onUnmounted(() => {
    const target = container ? document.querySelector(container) : window;
    target.removeEventListener('scroll', handleScroll);
  });

  return {
    loading,
    finished,
    error,
    reset
  };
}; 