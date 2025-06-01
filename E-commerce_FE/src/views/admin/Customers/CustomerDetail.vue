<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="spinner"></div>
            <p class="mt-2 text-gray-600">Loading customer details...</p>
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
                    <h3 class="text-sm font-medium text-red-800">Error loading customer</h3>
                    <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Customer details -->
        <div v-else>
            <!-- Customer header -->
            <div class="md:flex md:items-center md:justify-between">
                <div class="flex-1 min-w-0">
                    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        {{ customer.name }}
                    </h2>
                    <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                        <div class="mt-2 flex items-center text-sm text-gray-500">
                            <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Member since {{ formatDate(customer.created_at) }}
                        </div>
                        <div class="mt-2 flex items-center text-sm">
                            <span :class="[
                                customer.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800',
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                            ]">
                                {{ customer.status }}
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
                            <dt class="text-sm font-medium text-gray-500">Full name</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ customer.name }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Email address</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ customer.email }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Phone number</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ customer.phone || 'Not provided' }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Total orders</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {{ customer.total_orders }}
                            </dd>
                        </div>
                        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">Total spent</dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                ${{ customer.total_spent.toFixed(2) }}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            <!-- Customer addresses -->
            <div class="mt-8">
                <div class="bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Addresses</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li v-for="address in customer.addresses" :key="address.id" class="px-4 py-4 sm:px-6">
                                <div class="flex items-center justify-between">
                                    <div class="flex-1">
                                        <p class="text-sm font-medium text-gray-900">
                                            {{ address.type === 'billing' ? 'Billing Address' : 'Shipping Address' }}
                                        </p>
                                        <p class="mt-2 text-sm text-gray-500">
                                            {{ formatAddress(address) }}
                                        </p>
                                    </div>
                                    <div v-if="address.is_default"
                                        class="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        Default
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Recent orders -->
            <div class="mt-8">
                <div class="bg-white shadow sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
                        <router-link :to="{ name: 'admin-orders', query: { customer_id: customer.id } }"
                            class="text-sm font-medium text-primary-600 hover:text-primary-500">
                            View all orders
                        </router-link>
                    </div>
                    <div class="border-t border-gray-200">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order #
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">View</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="order in customer.recent_orders" :key="order.id">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #{{ order.number }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ formatDate(order.created_at) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span :class="[
                                                statusClasses[order.status],
                                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
                                            ]">
                                                {{ order.status }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ${{ order.total.toFixed(2) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <router-link :to="{ name: 'admin-order-detail', params: { id: order.id } }"
                                                class="text-primary-600 hover:text-primary-900">
                                                View
                                            </router-link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Update Status Modal -->
        <BaseModal v-if="showStatusModal" @close="closeStatusModal">
            <template #title>Update Customer Status</template>
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
                        <label for="reason" class="block text-sm font-medium text-gray-700">Reason (optional)</label>
                        <textarea id="reason" v-model="statusForm.reason" rows="3"
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCustomerStore } from '@/stores/customer';
import { useNotification } from '@/composables/useNotification';
import { formatDate } from '@/utils/date';
import BaseModal from '@/components/base/BaseModal.vue';

const route = useRoute();
const customerStore = useCustomerStore();
const notification = useNotification();

const customer = ref(null);
const loading = ref(true);
const error = ref(null);
const isSubmitting = ref(false);

// Status management
const showStatusModal = ref(false);
const statusForm = ref({
    status: '',
    reason: ''
});

// Available statuses
const availableStatuses = ['active', 'inactive', 'blocked'];

// Status classes for orders
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

// Fetch customer details
const fetchCustomer = async () => {
    try {
        loading.value = true;
        customer.value = await customerStore.fetchCustomer(route.params.id);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Status modal handlers
const openUpdateStatusModal = () => {
    statusForm.value = {
        status: customer.value.status,
        reason: ''
    };
    showStatusModal.value = true;
};

const closeStatusModal = () => {
    showStatusModal.value = false;
    statusForm.value = {
        status: '',
        reason: ''
    };
};

const updateStatus = async () => {
    try {
        isSubmitting.value = true;
        await customerStore.updateCustomerStatus(customer.value.id, statusForm.value);
        await fetchCustomer();
        notification.success('Customer status updated successfully');
        closeStatusModal();
    } catch (err) {
        notification.error('Failed to update customer status');
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(fetchCustomer);
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