<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Customers</h1>
        </div>

        <!-- Search and Filter -->
        <div class="bg-white shadow-md rounded-lg p-4 mb-6">
            <div class="flex gap-4">
                <div class="flex-1">
                    <input v-model="searchQuery" type="text" placeholder="Search customers..."
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        @input="handleSearch" />
                </div>
                <div>
                    <select v-model="filter"
                        class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        @change="handleFilter">
                        <option value="all">All Customers</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Customers Table -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Orders
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Spent
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
                    <tr v-for="customer in customers" :key="customer.id">
                        <td class="px-6 py-4">
                            <div class="flex items-center">
                                <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span class="text-lg font-medium text-gray-600">
                                        {{ customer.name.charAt(0) }}
                                    </span>
                                </div>
                                <div class="ml-4">
                                    <div class="font-medium text-gray-900">{{ customer.name }}</div>
                                    <div class="text-sm text-gray-500">Joined {{ formatDate(customer.createdAt) }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ customer.email }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ customer.ordersCount }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            ${{ customer.totalSpent.toFixed(2) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="{
                                'px-2 py-1 text-xs rounded-full': true,
                                'bg-green-100 text-green-800': customer.status === 'active',
                                'bg-red-100 text-red-800': customer.status === 'inactive'
                            }">
                                {{ customer.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button @click="viewCustomer(customer.id)" class="text-indigo-600 hover:text-indigo-900">
                                View Details
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex justify-between items-center">
            <div class="text-sm text-gray-500">
                Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalCustomers }} customers
            </div>
            <div class="flex gap-2">
                <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
                    class="px-3 py-1 border rounded-md disabled:opacity-50">
                    Previous
                </button>
                <button :disabled="endIndex >= totalCustomers" @click="changePage(currentPage + 1)"
                    class="px-3 py-1 border rounded-md disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const customers = ref([]);
const searchQuery = ref('');
const filter = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalCustomers = ref(0);

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalCustomers.value));

const fetchCustomers = async () => {
    try {
        const response = await axios.get('/api/customers', {
            params: {
                page: currentPage.value,
                limit: itemsPerPage,
                search: searchQuery.value,
                filter: filter.value
            }
        });
        customers.value = response.data.customers;
        totalCustomers.value = response.data.total;
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
};

const handleSearch = () => {
    currentPage.value = 1;
    fetchCustomers();
};

const handleFilter = () => {
    currentPage.value = 1;
    fetchCustomers();
};

const changePage = (page) => {
    currentPage.value = page;
    fetchCustomers();
};

const viewCustomer = (id) => {
    router.push({ name: 'admin-customer-detail', params: { id } });
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

onMounted(() => {
    fetchCustomers();
});
</script>