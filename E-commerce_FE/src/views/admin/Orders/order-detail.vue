<template>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold">Order #{{ order?.id }}</h1>
                <button @click="router.back()" class="text-gray-600 hover:text-gray-900">
                    Back to Orders
                </button>
            </div>

            <div v-if="order" class="space-y-6">
                <!-- Order Status -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <div class="flex justify-between items-center">
                        <div>
                            <h2 class="text-lg font-semibold">Order Status</h2>
                            <p class="text-gray-500">{{ formatDate(order.createdAt) }}</p>
                        </div>
                        <div>
                            <select v-model="order.status" @change="updateOrderStatus"
                                class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Customer Information -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Customer Information</h2>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-500">Name</p>
                            <p class="font-medium">{{ order.customer.name }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Email</p>
                            <p class="font-medium">{{ order.customer.email }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Phone</p>
                            <p class="font-medium">{{ order.customer.phone }}</p>
                        </div>
                    </div>
                </div>

                <!-- Shipping Address -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Shipping Address</h2>
                    <p>{{ order.shippingAddress.street }}</p>
                    <p>{{ order.shippingAddress.city }}, {{ order.shippingAddress.state }} {{
                        order.shippingAddress.zipCode }}</p>
                    <p>{{ order.shippingAddress.country }}</p>
                </div>

                <!-- Order Items -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Order Items</h2>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Quantity
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="item in order.items" :key="item.id">
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <img :src="item.product.image" :alt="item.product.name"
                                            class="h-10 w-10 rounded-full mr-3" />
                                        <div>
                                            <div class="font-medium">{{ item.product.name }}</div>
                                            <div class="text-sm text-gray-500">SKU: {{ item.product.sku }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    ${{ item.price.toFixed(2) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    {{ item.quantity }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    ${{ (item.price * item.quantity).toFixed(2) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Order Summary -->
                <div class="bg-white shadow-md rounded-lg p-6">
                    <h2 class="text-lg font-semibold mb-4">Order Summary</h2>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-500">Subtotal</span>
                            <span>${{ order.subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Shipping</span>
                            <span>${{ order.shipping.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Tax</span>
                            <span>${{ order.tax.toFixed(2) }}</span>
                        </div>
                        <div class="border-t pt-2 mt-2">
                            <div class="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>${{ order.total.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-else class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p class="mt-4 text-gray-600">Loading order details...</p>
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
const order = ref(null);

const fetchOrder = async () => {
    try {
        const response = await axios.get(`/api/orders/${route.params.id}`);
        order.value = response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
    }
};

const updateOrderStatus = async () => {
    try {
        await axios.patch(`/api/orders/${order.value.id}/status`, {
            status: order.value.status
        });
    } catch (error) {
        console.error('Error updating order status:', error);
    }
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

onMounted(() => {
    fetchOrder();
});
</script>