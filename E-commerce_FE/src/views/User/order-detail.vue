<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="spinner"></div>
            <p class="mt-2 text-gray-600">Loading order details...</p>
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
                    <h3 class="text-sm font-medium text-red-800">Error loading order</h3>
                    <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Order details -->
        <div v-else>
            <!-- Order header -->
            <div class="md:flex md:items-center md:justify-between">
                <div class="flex-1 min-w-0">
                    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Order #{{ order.number }}
                    </h2>
                    <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                        <div class="mt-2 flex items-center text-sm text-gray-500">
                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {{ formatDate(order.created_at) }}
                        </div>
                        <div class="mt-2 flex items-center text-sm">
                            <span :class="[
                                statusClasses[order.status],
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                            ]">
                                {{ order.status }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Order summary -->
            <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Order Summary</h3>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Total Amount</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                ${{ order.total.toFixed(2) }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Payment Status</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span :class="[
                                    order.payment_status === 'paid'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800',
                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                                ]">
                                    {{ order.payment_status }}
                                </span>
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Payment Method</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ order.payment_method }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <!-- Order items -->
            <div class="mt-8">
                <div class="bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Order Items</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li v-for="item in order.items" :key="item.id" class="px-4 py-4 sm:px-6">
                                <div class="flex items-center space-x-4">
                                    <div class="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                                        <img :src="item.product.image" :alt="item.product.name"
                                            class="h-full w-full object-center object-cover">
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-medium text-gray-900 truncate">
                                            {{ item.product.name }}
                                        </p>
                                        <p class="text-sm text-gray-500">
                                            Quantity: {{ item.quantity }}
                                        </p>
                                    </div>
                                    <div class="flex-shrink-0 text-sm font-medium text-gray-900">
                                        ${{ (item.price * item.quantity).toFixed(2) }}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Shipping information -->
            <div class="mt-8">
                <div class="bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Shipping Information</h3>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl class="sm:divide-y sm:divide-gray-200">
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Shipping Address</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ formatAddress(order.shipping_address) }}
                                </dd>
                            </div>
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Shipping Method</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ order.shipping_method }}
                                </dd>
                            </div>
                            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Tracking Number</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <template v-if="order.tracking_number">
                                        {{ order.tracking_number }}
                                        <a :href="order.tracking_url" target="_blank"
                                            class="ml-2 text-primary-600 hover:text-primary-500">
                                            Track Package
                                        </a>
                                    </template>
                                    <template v-else>
                                        Not available yet
                                    </template>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex justify-end space-x-4">
                <button @click="downloadInvoice"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <svg class="-ml-1 mr-2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Download Invoice
                </button>
                <button v-if="canCancel" @click="cancelOrder"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                    Cancel Order
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { useNotification } from '@/composables/useNotification';
import { formatDate } from '@/utils/date';

const route = useRoute();
const orderStore = useOrderStore();
const notification = useNotification();

const order = ref(null);
const loading = ref(true);
const error = ref(null);

// Status classes for different order statuses
const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-green-100 text-green-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
};

// Computed property to determine if order can be cancelled
const canCancel = computed(() => {
    return order.value && ['pending', 'processing'].includes(order.value.status);
});

// Format address for display
const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.postal_code}, ${address.country}`;
};

// Fetch order details
const fetchOrder = async () => {
    try {
        loading.value = true;
        order.value = await orderStore.fetchOrder(route.params.id);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Download invoice
const downloadInvoice = async () => {
    try {
        await orderStore.downloadInvoice(order.value.id);
        notification.success('Invoice downloaded successfully');
    } catch (err) {
        notification.error('Failed to download invoice');
    }
};

// Cancel order
const cancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
        await orderStore.cancelOrder(order.value.id);
        await fetchOrder(); // Refresh order details
        notification.success('Order cancelled successfully');
    } catch (err) {
        notification.error('Failed to cancel order');
    }
};

onMounted(fetchOrder);
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