<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <router-link v-for="category in categories" :key="category.id"
                :to="{ name: 'category-products', params: { id: category.id } }" class="group">
                <div class="relative aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <img :src="category.image" :alt="category.name"
                        class="w-full h-full object-center object-cover group-hover:opacity-75" />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 right-0 p-4">
                        <h3 class="text-xl font-semibold text-white">{{ category.name }}</h3>
                        <p class="mt-1 text-sm text-white/80">{{ category.productsCount }} Products</p>
                    </div>
                </div>
            </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p class="mt-4 text-gray-600">Loading categories...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const categories = ref([]);
const loading = ref(true);

const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/categories');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchCategories();
});
</script>