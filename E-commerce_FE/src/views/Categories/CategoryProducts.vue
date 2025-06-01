<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="spinner"></div>
            <p class="mt-2 text-gray-600">Loading products...</p>
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
                    <h3 class="text-sm font-medium text-red-800">Error loading products</h3>
                    <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Category header -->
        <div v-else class="pb-5 border-b border-gray-200">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div class="flex-1 min-w-0">
                    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        {{ category.name }}
                    </h2>
                    <p class="mt-2 text-sm text-gray-500">
                        {{ category.description }}
                    </p>
                </div>
                <div class="mt-4 flex sm:mt-0 sm:ml-4">
                    <div class="flex items-center space-x-4">
                        <!-- Sort dropdown -->
                        <div class="relative">
                            <select v-model="sortBy"
                                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                                <option value="newest">Newest</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="name">Name</option>
                            </select>
                        </div>

                        <!-- View toggle -->
                        <div class="flex items-center space-x-2">
                            <button @click="viewMode = 'grid'"
                                :class="[viewMode === 'grid' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-500']"
                                class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button @click="viewMode = 'list'"
                                :class="[viewMode === 'list' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-500']"
                                class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filters -->
            <div class="mt-4">
                <div class="sm:flex sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <!-- Price range -->
                    <div class="flex items-center space-x-2">
                        <input type="number" v-model="filters.minPrice" placeholder="Min price"
                            class="block w-24 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                        <span class="text-gray-500">-</span>
                        <input type="number" v-model="filters.maxPrice" placeholder="Max price"
                            class="block w-24 sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500">
                    </div>

                    <!-- Rating filter -->
                    <div class="flex items-center space-x-2">
                        <label class="text-sm text-gray-700">Min rating:</label>
                        <select v-model="filters.rating"
                            class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md">
                            <option value="">All</option>
                            <option v-for="rating in [4, 3, 2, 1]" :key="rating" :value="rating">
                                {{ rating }}+ stars
                            </option>
                        </select>
                    </div>

                    <!-- Clear filters -->
                    <button v-if="hasActiveFilters" @click="clearFilters"
                        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Clear filters
                    </button>
                </div>
            </div>
        </div>

        <!-- Product grid -->
        <div v-if="viewMode === 'grid'" class="mt-6">
            <div v-if="filteredProducts.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p class="mt-1 text-sm text-gray-500">
                    Try adjusting your filters or search criteria.
                </p>
            </div>

            <div v-else
                class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="mt-6 flex justify-center">
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button @click="page = page - 1" :disabled="page === 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">Previous</span>
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button v-for="pageNumber in totalPages" :key="pageNumber" @click="page = pageNumber" :class="[page === pageNumber ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        'relative inline-flex items-center px-4 py-2 border text-sm font-medium']">
                        {{ pageNumber }}
                    </button>
                    <button @click="page = page + 1" :disabled="page === totalPages"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span class="sr-only">Next</span>
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>

        <!-- Product list -->
        <div v-else class="mt-6">
            <div v-if="filteredProducts.length === 0" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No products found</h3>
                <p class="mt-1 text-sm text-gray-500">
                    Try adjusting your filters or search criteria.
                </p>
            </div>

            <div v-else class="overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" class="divide-y divide-gray-200">
                    <li v-for="product in filteredProducts" :key="product.id">
                        <router-link :to="{ name: 'product-detail', params: { id: product.id } }"
                            class="block hover:bg-gray-50">
                            <div class="flex items-center px-4 py-4 sm:px-6">
                                <div class="flex-shrink-0 h-20 w-20">
                                    <img :src="product.image" :alt="product.name"
                                        class="h-full w-full object-center object-cover rounded-md">
                                </div>
                                <div class="min-w-0 flex-1 px-4">
                                    <div class="flex items-center justify-between">
                                        <p class="text-sm font-medium text-primary-600 truncate">{{ product.name }}</p>
                                        <div class="ml-2 flex-shrink-0 flex">
                                            <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                                :class="[product.in_stock ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800']">
                                                {{ product.in_stock ? 'In stock' : 'Out of stock' }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="mt-2 flex justify-between">
                                        <div>
                                            <p class="flex items-center text-sm text-gray-500">
                                                <StarRating :rating="product.rating" size="sm" />
                                                <span class="ml-2">({{ product.review_count }})</span>
                                            </p>
                                            <p class="mt-1 text-sm text-gray-500">
                                                {{ product.description }}
                                            </p>
                                        </div>
                                        <p class="text-sm font-medium text-gray-900">${{ product.price.toFixed(2) }}</p>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>

                <!-- Pagination -->
                <div v-if="totalPages > 1"
                    class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div class="flex-1 flex justify-center">
                        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button @click="page = page - 1" :disabled="page === 1"
                                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span class="sr-only">Previous</span>
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button v-for="pageNumber in totalPages" :key="pageNumber" @click="page = pageNumber"
                                :class="[page === pageNumber ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium']">
                                {{ pageNumber }}
                            </button>
                            <button @click="page = page + 1" :disabled="page === totalPages"
                                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span class="sr-only">Next</span>
                                <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCategoryStore } from '@/stores/category';
import { useProductStore } from '@/stores/product';
import ProductCard from '@/components/products/ProductCard.vue';
import StarRating from '@/components/common/StarRating.vue';

const route = useRoute();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const loading = ref(true);
const error = ref(null);
const category = ref(null);
const products = ref([]);
const page = ref(1);
const perPage = ref(12);
const totalPages = ref(0);
const viewMode = ref('grid');
const sortBy = ref('newest');

// Filters
const filters = ref({
    minPrice: '',
    maxPrice: '',
    rating: ''
});

// Computed property to check if any filters are active
const hasActiveFilters = computed(() => {
    return filters.value.minPrice !== '' ||
        filters.value.maxPrice !== '' ||
        filters.value.rating !== '';
});

// Clear all filters
const clearFilters = () => {
    filters.value = {
        minPrice: '',
        maxPrice: '',
        rating: ''
    };
};

// Filter and sort products
const filteredProducts = computed(() => {
    let result = [...products.value];

    // Apply filters
    if (filters.value.minPrice !== '') {
        result = result.filter(product => product.price >= Number(filters.value.minPrice));
    }
    if (filters.value.maxPrice !== '') {
        result = result.filter(product => product.price <= Number(filters.value.maxPrice));
    }
    if (filters.value.rating !== '') {
        result = result.filter(product => product.rating >= Number(filters.value.rating));
    }

    // Apply sorting
    switch (sortBy.value) {
        case 'price_asc':
            result.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            result.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
        default:
            result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
    }

    return result;
});

// Fetch category and its products
const fetchCategoryProducts = async () => {
    try {
        loading.value = true;
        error.value = null;

        const [categoryData, productsData] = await Promise.all([
            categoryStore.fetchCategory(route.params.id),
            productStore.fetchProductsByCategory(route.params.id, {
                page: page.value,
                per_page: perPage.value
            })
        ]);

        category.value = categoryData;
        products.value = productsData.products;
        totalPages.value = Math.ceil(productsData.total / perPage.value);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Watch for changes in page or filters
watch([page, filters, sortBy], () => {
    fetchCategoryProducts();
});

// Watch for changes in route params
watch(
    () => route.params.id,
    (newId) => {
        if (newId) {
            page.value = 1;
            clearFilters();
            fetchCategoryProducts();
        }
    }
);

onMounted(() => {
    if (route.params.id) {
        fetchCategoryProducts();
    }
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