<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="spinner"></div>
            <p class="mt-2 text-gray-600">Loading dashboard...</p>
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
                    <h3 class="text-sm font-medium text-red-800">Error loading dashboard</h3>
                    <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Dashboard content -->
        <div v-else>
            <!-- Page header -->
            <div class="md:flex md:items-center md:justify-between">
                <div class="flex-1 min-w-0">
                    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Dashboard
                    </h2>
                </div>
                <div class="mt-4 flex md:mt-0 md:ml-4">
                    <router-link to="/admin/orders/new"
                        class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Create Order
                    </router-link>
                    <router-link to="/admin/products/new"
                        class="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Add Product
                    </router-link>
                </div>
            </div>

            <!-- Stats -->
            <div class="mt-8">
                <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div v-for="stat in stats" :key="stat.name"
                        class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                        <dt>
                            <div class="absolute bg-primary-500 rounded-md p-3">
                                <component :is="stat.icon" class="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p class="ml-16 text-sm font-medium text-gray-500 truncate">{{ stat.name }}</p>
                        </dt>
                        <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                            <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
                            <p :class="[stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                                'ml-2 flex items-baseline text-sm font-semibold']">
                                <component :is="stat.changeType === 'increase' ? 'ArrowUpIcon' : 'ArrowDownIcon'"
                                    class="self-center flex-shrink-0 h-5 w-5" aria-hidden="true" />
                                {{ stat.change }}
                            </p>
                        </dd>
                    </div>
                </dl>
            </div>

            <!-- Recent Orders -->
            <div class="mt-8">
                <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <h3 class="px-6 py-3 text-lg font-medium text-gray-900">Recent Orders</h3>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order ID
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" class="px-6 py-3 bg-gray-50">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="order in recentOrders" :key="order.id" class="bg-white">
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    #{{ order.id }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ order.customer.name }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span :class="[order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800',
                                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full']">
                                        {{ order.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${{ order.total.toFixed(2) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ formatDate(order.date) }}
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

            <!-- Recent Products -->
            <div class="mt-8">
                <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <h3 class="px-6 py-3 text-lg font-medium text-gray-900">Recent Products</h3>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col"
                                    class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th scope="col" class="px-6 py-3 bg-gray-50">
                                    <span class="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="product in recentProducts" :key="product.id" class="bg-white">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-10 w-10">
                                            <img class="h-10 w-10 rounded-full" :src="product.image"
                                                :alt="product.name">
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ product.name }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ product.category }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${{ product.price.toFixed(2) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <span :class="[product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full']">
                                        {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <router-link :to="{ name: 'admin-product-edit', params: { id: product.id } }"
                                        class="text-primary-600 hover:text-primary-900">
                                        Edit
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAdminStore } from '@/stores/admin';
import { formatDate } from '@/utils/date';

const adminStore = useAdminStore();
const loading = ref(true);
const error = ref(null);

// Stats data
const stats = ref([
    {
        name: 'Total Revenue',
        value: '$0',
        change: '0%',
        changeType: 'increase',
        icon: 'CurrencyDollarIcon'
    },
    {
        name: 'Total Orders',
        value: '0',
        change: '0%',
        changeType: 'increase',
        icon: 'ShoppingCartIcon'
    },
    {
        name: 'Total Customers',
        value: '0',
        change: '0%',
        changeType: 'increase',
        icon: 'UserGroupIcon'
    },
    {
        name: 'Average Order Value',
        value: '$0',
        change: '0%',
        changeType: 'increase',
        icon: 'ChartBarIcon'
    }
]);

// Recent orders and products
const recentOrders = ref([]);
const recentProducts = ref([]);

// Load dashboard data
const loadDashboard = async () => {
    try {
        loading.value = true;
        error.value = null;

        // Fetch dashboard data
        const data = await adminStore.fetchDashboardData();

        // Update stats
        stats.value = data.stats;

        // Update recent orders and products
        recentOrders.value = data.recentOrders;
        recentProducts.value = data.recentProducts;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadDashboard();
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