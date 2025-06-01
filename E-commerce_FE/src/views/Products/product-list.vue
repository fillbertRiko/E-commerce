<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Filters and Search -->
        <div class="mb-8">
            <div class="flex flex-wrap gap-4">
                <div class="flex-1">
                    <input v-model="searchQuery" type="text" placeholder="Search products..."
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        @input="handleSearch" />
                </div>
                <div class="flex gap-4">
                    <select v-model="selectedCategory"
                        class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        @change="handleFilter">
                        <option value="">All Categories</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                    <select v-model="sortBy"
                        class="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        @change="handleSort">
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="popular">Most Popular</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="product in products" :key="product.id"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <router-link :to="{ name: 'product-detail', params: { id: product.id } }">
                    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
                    <div class="p-4">
                        <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
                        <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-lg font-bold text-gray-900">${{ product.price.toFixed(2) }}</span>
                            <button @click.prevent="addToCart(product)"
                                class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p class="mt-4 text-gray-600">Loading products...</p>
        </div>

        <!-- Pagination -->
        <div v-if="!loading && totalPages > 1" class="mt-8 flex justify-center">
            <nav class="flex items-center space-x-2">
                <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)"
                    class="px-3 py-1 rounded-md border disabled:opacity-50">
                    Previous
                </button>
                <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="{
                    'px-3 py-1 rounded-md': true,
                    'bg-indigo-600 text-white': currentPage === page,
                    'border hover:bg-gray-50': currentPage !== page
                }">
                    {{ page }}
                </button>
                <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)"
                    class="px-3 py-1 rounded-md border disabled:opacity-50">
                    Next
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import axios from 'axios';

const router = useRouter();
const cartStore = useCartStore();

const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedCategory = ref('');
const sortBy = ref('newest');
const currentPage = ref(1);
const totalPages = ref(0);
const itemsPerPage = 12;

const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/categories');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const fetchProducts = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/products', {
            params: {
                page: currentPage.value,
                limit: itemsPerPage,
                search: searchQuery.value,
                category: selectedCategory.value,
                sort: sortBy.value
            }
        });
        products.value = response.data.products;
        totalPages.value = Math.ceil(response.data.total / itemsPerPage);
    } catch (error) {
        console.error('Error fetching products:', error);
    } finally {
        loading.value = false;
    }
};

const handleSearch = () => {
    currentPage.value = 1;
    fetchProducts();
};

const handleFilter = () => {
    currentPage.value = 1;
    fetchProducts();
};

const handleSort = () => {
    fetchProducts();
};

const changePage = (page) => {
    currentPage.value = page;
    fetchProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const addToCart = (product) => {
    cartStore.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
    });
};

onMounted(() => {
    fetchCategories();
    fetchProducts();
});
</script>