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
                <div class="mt-4 flex md:mt-0 md:ml-4">
                    <button @click="openUpdateStatusModal"
                        class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Update Status
                    </button>
                </div>
            </div>

            <!-- Customer information -->
            <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">Customer Information</h3>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Name</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ order.customer.name }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Email</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ order.customer.email }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Phone</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ order.customer.phone }}
                            </dd>
                        </div>
                    </dl>
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
                            <dt class="text-sm font-medium text-gray-500">Subtotal</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                ${{ order.subtotal.toFixed(2) }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Tax</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                ${{ order.tax.toFixed(2) }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Shipping</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                ${{ order.shipping.toFixed(2) }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Total</dt>
                            <dd class="mt-1 text-sm font-medium text-gray-900 sm:mt-0 sm:col-span-2">
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
                                            SKU: {{ item.product.sku }}
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
                                <dt class="text-sm font-medium text-gray-500">Tracking Information</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <div v-if="order.tracking_number" class="flex items-center space-x-2">
                                        <span>{{ order.tracking_number }}</span>
                                        <button @click="openUpdateTrackingModal"
                                            class="text-primary-600 hover:text-primary-500">
                                            Edit
                                        </button>
                                    </div>
                                    <button v-else @click="openUpdateTrackingModal"
                                        class="text-primary-600 hover:text-primary-500">
                                        Add tracking number
                                    </button>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <!-- Order history -->
            <div class="mt-8">
                <div class="bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Order History</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li v-for="event in order.history" :key="event.id" class="px-4 py-4 sm:px-6">
                                <div class="flex space-x-3">
                                    <div class="flex-shrink-0">
                                        <div :class="[
                                            statusClasses[event.status],
                                            'h-8 w-8 rounded-full flex items-center justify-center'
                                        ]">
                                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <div class="text-sm font-medium text-gray-900">
                                            {{ event.status }}
                                        </div>
                                        <div class="mt-1 text-sm text-gray-500">
                                            <span>{{ event.message }}</span>
                                        </div>
                                        <div class="mt-2 text-sm text-gray-500">
                                            <span>{{ formatDate(event.created_at) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- Update Status Modal -->
        <BaseModal v-if="showStatusModal" @close="closeStatusModal">
            <template #title>Update Order Status</template>
            <template #content>
                <form @submit.prevent="updateStatus" class="space-y-4">
                    <div>
                        <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                        <select id="status" v-model="statusForm.status"
                            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                            <option v-for="status in availableStatuses" :key="status" :value="status">
                                {{ status }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700">Message (optional)</label>
                        <textarea id="message" v-model="statusForm.message" rows="3"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"></textarea>
                    </div>
                </form>
            </template>
            <template #footer>
                <div class="flex justify-end space-x-3">
                    <button @click="closeStatusModal"
                        class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button @click="updateStatus" :disabled="isSubmitting"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Update
                    </button>
                </div>
            </template>
        </BaseModal>

        <!-- Update Tracking Modal -->
        <BaseModal v-if="showTrackingModal" @close="closeTrackingModal">
            <template #title>Update Tracking Information</template>
            <template #content>
                <form @submit.prevent="updateTracking" class="space-y-4">
                    <div>
                        <label for="tracking_number" class="block text-sm font-medium text-gray-700">Tracking
                            Number</label>
                        <input type="text" id="tracking_number" v-model="trackingForm.tracking_number"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                    </div>
                    <div>
                        <label for="carrier" class="block text-sm font-medium text-gray-700">Shipping Carrier</label>
                        <select id="carrier" v-model="trackingForm.carrier"
                            class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                            <option v-for="carrier in carriers" :key="carrier.id" :value="carrier.id">
                                {{ carrier.name }}
                            </option>
                        </select>
                    </div>
                </form>
            </template>
            <template #footer>
                <div class="flex justify-end space-x-3">
                    <button @click="closeTrackingModal"
                        class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button @click="updateTracking" :disabled="isSubmitting"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Update
                    </button>
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { useNotification } from '@/composables/useNotification';
import { formatDate } from '@/utils/date';
import BaseModal from '@/components/base/BaseModal.vue';

const route = useRoute();
const orderStore = useOrderStore();
const notification = useNotification();

const order = ref(null);
const loading = ref(true);
const error = ref(null);
const isSubmitting = ref(false);

// Status management
const showStatusModal = ref(false);
const statusForm = ref({
    status: '',
    message: ''
});

// Tracking management
const showTrackingModal = ref(false);
const trackingForm = ref({
    tracking_number: '',
    carrier: ''
});

// Available statuses and carriers
const availableStatuses = [
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
];

const carriers = [
    { id: 'fedex', name: 'FedEx' },
    { id: 'ups', name: 'UPS' },
    { id: 'usps', name: 'USPS' },
    { id: 'dhl', name: 'DHL' }
];

// Status classes for different order statuses
const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-green-100 text-green-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
};

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

// Status modal handlers
const openUpdateStatusModal = () => {
    statusForm.value = {
        status: order.value.status,
        message: ''
    };
    showStatusModal.value = true;
};

const closeStatusModal = () => {
    showStatusModal.value = false;
    statusForm.value = {
        status: '',
        message: ''
    };
};

const updateStatus = async () => {
    try {
        isSubmitting.value = true;
        await orderStore.updateOrderStatus(order.value.id, statusForm.value);
        await fetchOrder();
        notification.success('Order status updated successfully');
        closeStatusModal();
    } catch (err) {
        notification.error('Failed to update order status');
    } finally {
        isSubmitting.value = false;
    }
};

// Tracking modal handlers
const openUpdateTrackingModal = () => {
    trackingForm.value = {
        tracking_number: order.value.tracking_number || '',
        carrier: order.value.carrier || ''
    };
    showTrackingModal.value = true;
};

const closeTrackingModal = () => {
    showTrackingModal.value = false;
    trackingForm.value = {
        tracking_number: '',
        carrier: ''
    };
};

const updateTracking = async () => {
    try {
        isSubmitting.value = true;
        await orderStore.updateTracking(order.value.id, trackingForm.value);
        await fetchOrder();
        notification.success('Tracking information updated successfully');
        closeTrackingModal();
    } catch (err) {
        notification.error('Failed to update tracking information');
    } finally {
        isSubmitting.value = false;
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