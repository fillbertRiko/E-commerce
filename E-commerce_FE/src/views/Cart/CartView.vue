<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="spinner"></div>
            <p class="mt-2 text-gray-600">Loading cart...</p>
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
                    <h3 class="text-sm font-medium text-red-800">Error loading cart</h3>
                    <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Empty cart -->
        <div v-else-if="!cartItems.length" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
            <p class="mt-1 text-sm text-gray-500">
                Start shopping to add items to your cart.
            </p>
            <div class="mt-6">
                <router-link to="/"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Continue Shopping
                </router-link>
            </div>
        </div>

        <!-- Cart content -->
        <div v-else>
            <h1 class="text-2xl font-bold text-gray-900">Shopping Cart</h1>

            <div class="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                <div class="lg:col-span-7">
                    <!-- Cart items -->
                    <ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
                        <li v-for="item in cartItems" :key="item.id" class="flex py-6 sm:py-10">
                            <div class="flex-shrink-0">
                                <img :src="item.product.image" :alt="item.product.name"
                                    class="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32">
                            </div>

                            <div class="ml-4 flex-1 flex flex-col sm:ml-6">
                                <div>
                                    <div class="flex justify-between">
                                        <h4 class="text-sm">
                                            <router-link
                                                :to="{ name: 'product-detail', params: { id: item.product.id } }"
                                                class="font-medium text-gray-700 hover:text-gray-800">
                                                {{ item.product.name }}
                                            </router-link>
                                        </h4>
                                        <p class="ml-4 text-sm font-medium text-gray-900">${{ (item.product.price *
                                            item.quantity).toFixed(2) }}</p>
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">{{ item.product.description }}</p>
                                </div>

                                <div class="mt-4 flex-1 flex items-end justify-between">
                                    <div class="flex items-center">
                                        <label :for="'quantity-' + item.id" class="sr-only">Quantity</label>
                                        <select :id="'quantity-' + item.id" :value="item.quantity"
                                            @change="updateQuantity(item.id, $event)"
                                            class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                            <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
                                        </select>

                                        <button @click="removeItem(item.id)" type="button"
                                            class="ml-4 text-sm font-medium text-primary-600 hover:text-primary-500">
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Order summary -->
                <div class="mt-10 lg:mt-0 lg:col-span-5">
                    <div class="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                        <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

                        <div class="mt-6 space-y-4">
                            <div class="flex items-center justify-between">
                                <dt class="text-sm text-gray-600">Subtotal</dt>
                                <dd class="text-sm font-medium text-gray-900">${{ subtotal.toFixed(2) }}</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="flex items-center text-sm text-gray-600">
                                    <span>Shipping estimate</span>
                                    <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Learn more about shipping</span>
                                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </dt>
                                <dd class="text-sm font-medium text-gray-900">${{ shippingEstimate.toFixed(2) }}</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="flex text-sm text-gray-600">
                                    <span>Tax estimate</span>
                                    <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Learn more about tax</span>
                                        <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </a>
                                </dt>
                                <dd class="text-sm font-medium text-gray-900">${{ taxEstimate.toFixed(2) }}</dd>
                            </div>
                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="text-base font-medium text-gray-900">Order total</dt>
                                <dd class="text-base font-medium text-gray-900">${{ total.toFixed(2) }}</dd>
                            </div>
                        </div>

                        <div class="mt-6">
                            <button @click="proceedToCheckout"
                                class="w-full bg-primary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>

                    <div class="mt-6 text-sm text-center text-gray-500">
                        <p>
                            or
                            <router-link to="/" class="text-primary-600 font-medium hover:text-primary-500">
                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useNotification } from '@/composables/useNotification';

const router = useRouter();
const cartStore = useCartStore();
const notification = useNotification();

const loading = ref(true);
const error = ref(null);

// Get cart items from store
const cartItems = computed(() => cartStore.items);

// Calculate totals
const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
});

const shippingEstimate = computed(() => {
    // Basic shipping calculation - can be made more complex based on weight, distance, etc.
    return subtotal.value > 100 ? 0 : 10;
});

const taxEstimate = computed(() => {
    // Basic tax calculation - can be adjusted based on location
    return subtotal.value * 0.1;
});

const total = computed(() => {
    return subtotal.value + shippingEstimate.value + taxEstimate.value;
});

// Update item quantity
const updateQuantity = async (itemId, event) => {
    const quantity = parseInt(event.target.value);
    try {
        await cartStore.updateItemQuantity(itemId, quantity);
        notification.success('Cart updated successfully');
    } catch (err) {
        notification.error('Failed to update cart');
    }
};

// Remove item from cart
const removeItem = async (itemId) => {
    try {
        await cartStore.removeItem(itemId);
        notification.success('Item removed from cart');
    } catch (err) {
        notification.error('Failed to remove item');
    }
};

// Proceed to checkout
const proceedToCheckout = () => {
    router.push({ name: 'checkout' });
};

// Load cart data
const loadCart = async () => {
    try {
        loading.value = true;
        error.value = null;
        await cartStore.fetchCart();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadCart();
});
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