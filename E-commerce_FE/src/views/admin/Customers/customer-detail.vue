<template>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold">Customer Profile</h1>
                <button @click="router.back()" class="text-gray-600 hover:text-gray-900">
                    Back to Customers
                </button>
            </div>

            <div v-if="customer" class="space-y-6">
                <!-- Customer Information -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <div class="flex items-start justify-between">
                        <div class="flex items-center">
                            <div class="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                                <span class="text-2xl font-medium text-gray-600">
                                    {{ customer.name.charAt(0) }}
                                </span>
                            </div>
                            <div class="ml-4">
                                <h2 class="text-xl font-semibold">{{ customer.name }}</h2>
                                <p class="text-gray-500">{{ customer.email }}</p>
                                <p class="text-sm text-gray-500">Member since {{ formatDate(customer.createdAt) }}</p>
                            </div>
                        </div>
                        <div>
                            <select v-model="customer.status" @change="updateCustomerStatus"
                                class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Contact Information -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Contact Information</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-500">Phone</p>
                            <p class="font-medium">{{ customer.phone || 'Not provided' }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Alternative Email</p>
                            <p class="font-medium">{{ customer.alternativeEmail || 'Not provided' }}</p>
                        </div>
                    </div>
                </div>

                <!-- Addresses -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Addresses</h2>
                    <div class="space-y-4">
                        <div v-for="address in customer.addresses" :key="address.id"
                            class="border-b pb-4 last:border-0">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="font-medium">{{ address.type }} Address</p>
                                    <p>{{ address.street }}</p>
                                    <p>{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
                                    <p>{{ address.country }}</p>
                                </div>
                                <span v-if="address.isDefault"
                                    class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                    Default
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Order History -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Order History</h2>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="order in customer.orders" :key="order.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    #{{ order.id }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ formatDate(order.createdAt) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    ${{ order.total.toFixed(2) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="{
                                        'px-2 py-1 text-xs rounded-full': true,
                                        'bg-green-100 text-green-800': order.status === 'completed',
                                        'bg-yellow-100 text-yellow-800': order.status === 'pending',
                                        'bg-blue-100 text-blue-800': order.status === 'processing',
                                        'bg-red-100 text-red-800': order.status === 'cancelled'
                                    }">
                                        {{ order.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button @click="viewOrder(order.id)" class="text-indigo-600 hover:text-indigo-900">
                                        View
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Loading State -->
            <div v-else class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p class="mt-4 text-gray-600">Loading customer details...</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const customer = ref(null);

const fetchCustomer = async () => {
    try {
        const response = await axios.get(`/api/customers/${route.params.id}`);
        customer.value = response.data;
    } catch (error) {
        console.error('Error fetching customer:', error);
    }
};

const updateCustomerStatus = async () => {
    try {
        await axios.patch(`/api/customers/${customer.value.id}/status`, {
            status: customer.value.status
        });
    } catch (error) {
        console.error('Error updating customer status:', error);
    }
};

const viewOrder = (orderId) => {
    router.push({ name: 'admin-order-detail', params: { id: orderId } });
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

onMounted(() => {
    fetchCustomer();
});
</script>