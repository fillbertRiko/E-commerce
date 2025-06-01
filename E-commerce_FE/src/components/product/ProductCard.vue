<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useNotification } from '@/composables/useNotification';
import { RouterLink } from 'vue-router';
import BaseCard from '@/components/base/BaseCard.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { formatCurrency } from '@/utils/format';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.id && value.name && value.price && value.image;
    }
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const cartStore = useCartStore();
const notification = useNotification();
const isAddingToCart = ref(false);
const isInWishlist = ref(false);

const addToCart = async () => {
  try {
    isAddingToCart.value = true;
    await cartStore.addItem({
      productId: props.product.id,
      quantity: 1
    });
    notification.success('Product added to cart');
  } catch (error) {
    notification.error('Failed to add product to cart');
  } finally {
    isAddingToCart.value = false;
  }
};

const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value;
  notification.success(
    isInWishlist.value
      ? 'Product added to wishlist'
      : 'Product removed from wishlist'
  );
};
</script>

<template>
  <BaseCard :loading="loading">
    <div class="group relative">
      <!-- Product Image -->
      <div
        class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img :src="product.image" :alt="product.name"
          class="h-full w-full object-cover object-center lg:h-full lg:w-full">
      </div>

      <!-- Product Info -->
      <div class="mt-4 flex justify-between">
        <div>
          <h3 class="text-sm text-gray-700">
            <RouterLink :to="{ name: 'product-detail', params: { id: product.id } }">
              {{ product.name }}
            </RouterLink>
          </h3>
          <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
        </div>
        <p class="text-sm font-medium text-gray-900">{{ formatCurrency(product.price) }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="mt-4 flex space-x-2">
        <BaseButton size="sm" block @click="addToCart" :loading="isAddingToCart">
          Add to Cart
        </BaseButton>
        <BaseButton size="sm" variant="secondary" @click="toggleWishlist">
          <span v-if="isInWishlist">♥</span>
          <span v-else>♡</span>
        </BaseButton>
      </div>

      <!-- Sale Badge -->
      <div v-if="product.discount"
        class="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
        -{{ product.discount }}%
      </div>
    </div>
  </BaseCard>
</template>