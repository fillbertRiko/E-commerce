<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Orders Management</h1>
        </div>

        <!-- Orders Table -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="order in orders" :key="order.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            #{{ order.id }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ order.customer.name }}
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
                                View Details
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const orders = ref([]);

const fetchOrders = async () => {
    try {
        const response = await axios.get('/api/orders');
        orders.value = response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
};

const viewOrder = (id) => {
    router.push({ name: 'admin-order-detail', params: { id } });
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

onMounted(() => {
    fetchOrders();
});
</script>