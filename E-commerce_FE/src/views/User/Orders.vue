<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0">
            <h1 class="text-2xl font-semibold text-gray-900">My Orders</h1>
        </div>

        <div class="mt-8">
            <!-- Loading state -->
            <div v-if="loading" class="text-center">
                <div class="spinner"></div>
                <p class="mt-2 text-gray-600">Loading your orders...</p>
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
                        <h3 class="text-sm font-medium text-red-800">Error loading orders</h3>
                        <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                    </div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else-if="!orders.length" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No orders</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by exploring our products.</p>
                <div class="mt-6">
                    <router-link :to="{ name: 'products' }"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Browse Products
                    </router-link>
                </div>
            </div>

            <!-- Orders list -->
            <div v-else class="space-y-6">
                <div v-for="order in orders" :key="order.id" class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">
                            Order #{{ order.id }}
                        </h3>
                        <p class="mt-1 max-w-2xl text-sm text-gray-500">
                            Placed on {{ formatDate(order.created_at) }}
                        </p>
                    </div>
                    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Status</dt>
                                <dd class="mt-1 text-sm text-gray-900">
                                    <span :class="getStatusClass(order.status)"
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                                        {{ order.status }}
                                    </span>
                                </dd>
                            </div>
                            <div class="sm:col-span-1">
                                <dt class="text-sm font-medium text-gray-500">Total Amount</dt>
                                <dd class="mt-1 text-sm text-gray-900">${{ order.total }}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useOrderStore } from '@/stores/order';
import { formatDate } from '@/utils/date';

const orderStore = useOrderStore();
const orders = ref([]);
const loading = ref(true);
const error = ref(null);

const getStatusClass = (status) => {
    const classes = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'processing': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
    };
    return classes[status.toLowerCase()] || 'bg-gray-100 text-gray-800';
};

onMounted(async () => {
    try {
        orders.value = await orderStore.fetchUserOrders();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
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