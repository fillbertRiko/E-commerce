import { computed } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useNotification } from './useNotification';
import { useErrorHandler } from './useErrorHandler';
import { formatPrice } from '@/utils/helpers';

export const useCart = () => {
  const cartStore = useCartStore();
  const notification = useNotification();
  const { withErrorHandler } = useErrorHandler();

  // Computed properties
  const items = computed(() => cartStore.items);
  const itemCount = computed(() => cartStore.itemCount);
  const totalPrice = computed(() => cartStore.totalPrice);
  const isEmpty = computed(() => cartStore.isEmpty);
  const isLoading = computed(() => cartStore.loading);

  // Format total price
  const formattedTotal = computed(() => formatPrice(totalPrice.value));

  // Get item quantity
  const getItemQuantity = (productId) => {
    const item = items.value.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return items.value.some(item => item.productId === productId);
  };

  // Add item to cart
  const addToCart = async (product, quantity = 1) => {
    return withErrorHandler(async () => {
      await cartStore.addItem({
        productId: product.id,
        quantity
      });
    });
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    return withErrorHandler(async () => {
      if (quantity < 1) {
        await removeFromCart(itemId);
      } else {
        await cartStore.updateItemQuantity(itemId, quantity);
      }
    });
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    return withErrorHandler(async () => {
      await cartStore.removeItem(itemId);
    });
  };

  // Clear cart
  const clearCart = async () => {
    return withErrorHandler(async () => {
      await cartStore.clearCart();
    });
  };

  // Initialize cart
  const initializeCart = async () => {
    return withErrorHandler(async () => {
      await cartStore.initialize();
    });
  };

  return {
    // State
    items,
    itemCount,
    totalPrice,
    formattedTotal,
    isEmpty,
    isLoading,

    // Methods
    getItemQuantity,
    isInCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    initializeCart
  };
}; 