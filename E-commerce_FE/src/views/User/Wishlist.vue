<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0">
            <h1 class="text-2xl font-semibold text-gray-900">My Wishlist</h1>
        </div>

        <div class="mt-8">
            <!-- Loading state -->
            <div v-if="loading" class="text-center">
                <div class="spinner"></div>
                <p class="mt-2 text-gray-600">Loading your wishlist...</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="rounded-md bg-red-50 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-800">Error loading wishlist</h3>
                        <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                    </div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else-if="!wishlistItems.length" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No items in wishlist</h3>
                <p class="mt-1 text-sm text-gray-500">Start adding some products to your wishlist.</p>
                <div class="mt-6">
                    <router-link :to="{ name: 'products' }"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Browse Products
                    </router-link>
                </div>
            </div>

            <!-- Wishlist items grid -->
            <div v-else class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                <div v-for="item in wishlistItems" :key="item.id"
                    class="group relative bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
                    <!-- Product image -->
                    <div
                        class="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden group-hover:opacity-75">
                        <img :src="item.image" :alt="item.name"
                            class="w-full h-full object-center object-cover lg:w-full lg:h-full">
                    </div>

                    <!-- Product info -->
                    <div class="p-4">
                        <div class="flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                <router-link :to="{ name: 'product-detail', params: { id: item.id } }">
                                    {{ item.name }}
                                </router-link>
                            </h3>
                            <p class="text-sm font-medium text-gray-900">${{ item.price }}</p>
                        </div>
                        <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>

                        <!-- Actions -->
                        <div class="mt-4 flex justify-between">
                            <button @click="addToCart(item)"
                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                Add to Cart
                            </button>
                            <button @click="removeFromWishlist(item.id)"
                                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useWishlistStore } from '@/stores/wishlist';
import { useCartStore } from '@/stores/cart';
import { useNotification } from '@/composables/useNotification';

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const notification = useNotification();

const wishlistItems = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchWishlist = async () => {
    try {
        loading.value = true;
        wishlistItems.value = await wishlistStore.fetchWishlist();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const removeFromWishlist = async (productId) => {
    try {
        await wishlistStore.removeFromWishlist(productId);
        await fetchWishlist();
        notification.success('Item removed from wishlist');
    } catch (err) {
        notification.error('Failed to remove item from wishlist');
    }
};

const addToCart = async (product) => {
    try {
        await cartStore.addToCart({
            productId: product.id,
            quantity: 1
        });
        notification.success('Item added to cart');
    } catch (err) {
        notification.error('Failed to add item to cart');
    }
};

onMounted(fetchWishlist);
</script>

<style scoped>
.spinner {
    @apply h-8 w-8 mx-auto border-4 border-primary-200 rounded-full border-t-primary-600;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>