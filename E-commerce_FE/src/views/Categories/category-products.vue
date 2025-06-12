<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Category Header -->
        <div v-if="category" class="mb-8">
            <nav class="flex mb-4" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                        <router-link to="/" class="text-gray-700 hover:text-gray-900">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <router-link :to="{ name: 'categories' }"
                                class="text-gray-700 hover:text-gray-900 ml-1 md:ml-2">
                                Categories
                            </router-link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">
                            <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="text-gray-500 ml-1 md:ml-2">{{ category.name }}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <div class="relative h-64 rounded-lg overflow-hidden mb-8">
                <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="text-center">
                        <h1 class="text-4xl font-bold text-white mb-2">{{ category.name }}</h1>
                        <p class="text-lg text-white/90">{{ category.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Filters and Sort -->
        <div class="mb-8">
            <div class="flex flex-wrap gap-4">
                <div class="flex-1">
                    <input v-model="searchQuery" type="text" placeholder="Search in this category..."
                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        @input="handleSearch" />
                </div>
                <div class="flex gap-4">
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
                        <div class="mt-2 flex items-center">
                            <star-rating :rating="product.rating" :read-only="true" class="text-sm" />
                            <span class="ml-2 text-sm text-gray-500">({{ product.reviewsCount }})</span>
                        </div>
                        <div class="mt-2 flex items-center justify-between">
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

        <!-- Empty State -->
        <div v-if="!loading && products.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
            <p class="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
            </p>
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
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import StarRating from '@/components/StarRating.vue';
import axios from 'axios';

const route = useRoute();
const cartStore = useCartStore();

const category = ref(null);
const products = ref([]);
const loading = ref(true);
const searchQuery = ref('');
const sortBy = ref('newest');
const currentPage = ref(1);
const totalPages = ref(0);
const itemsPerPage = 12;

const fetchCategory = async () => {
    try {
        const response = await axios.get(`/api/categories/${route.params.id}`);
        category.value = response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
    }
};

const fetchProducts = async () => {
    loading.value = true;
    try {
        const response = await axios.get(`/api/categories/${route.params.id}/products`, {
            params: {
                page: currentPage.value,
                limit: itemsPerPage,
                search: searchQuery.value,
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
    fetchCategory();
    fetchProducts();
});
</script>