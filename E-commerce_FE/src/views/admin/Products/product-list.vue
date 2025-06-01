<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Products Management</h1>
            <button @click="createProduct" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Product
            </button>
        </div>

        <!-- Products Table -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Image
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Category
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Price
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Stock
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
                    <tr v-for="product in products" :key="product.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            <img :src="product.image" :alt="product.name" class="h-10 w-10 rounded-full" />
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ product.name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ product.category }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            ${{ product.price }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ product.stock }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span :class="{
                                'px-2 py-1 text-xs rounded-full': true,
                                'bg-green-100 text-green-800': product.status === 'active',
                                'bg-red-100 text-red-800': product.status === 'inactive'
                            }">
                                {{ product.status }}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button @click="editProduct(product.id)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                                Edit
                            </button>
                            <button @click="deleteProduct(product.id)" class="text-red-600 hover:text-red-900">
                                Delete
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
const products = ref([]);

const fetchProducts = async () => {
    try {
        const response = await axios.get('/api/products');
        products.value = response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const createProduct = () => {
    router.push({ name: 'admin-products-create' });
};

const editProduct = (id) => {
    router.push({ name: 'admin-products-edit', params: { id } });
};

const deleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
        await axios.delete(`/api/products/${id}`);
        await fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

onMounted(() => {
    fetchProducts();
});
</script>