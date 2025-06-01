<template>
    <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>

        <!-- Category Filter -->
        <div class="mb-6">
            <h4 class="font-medium text-sm text-gray-700 mb-2">Categories</h4>
            <div class="space-y-2">
                <label v-for="category in categories" :key="category.id" class="flex items-center">
                    <input type="checkbox" :value="category.id" v-model="selectedCategories"
                        class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                    <span class="ml-2 text-sm text-gray-600">{{ category.name }}</span>
                </label>
            </div>
        </div>

        <!-- Price Range Filter -->
        <div class="mb-6">
            <h4 class="font-medium text-sm text-gray-700 mb-2">Price Range</h4>
            <div class="space-y-2">
                <div>
                    <label class="block text-sm text-gray-600">Min Price</label>
                    <input type="number" v-model="priceRange.min"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                </div>
                <div>
                    <label class="block text-sm text-gray-600">Max Price</label>
                    <input type="number" v-model="priceRange.max"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                </div>
            </div>
        </div>

        <!-- Sort Options -->
        <div class="mb-6">
            <h4 class="font-medium text-sm text-gray-700 mb-2">Sort By</h4>
            <select v-model="sortBy"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="name_asc">Name: A to Z</option>
                <option value="name_desc">Name: Z to A</option>
            </select>
        </div>

        <!-- Rating Filter -->
        <div class="mb-6">
            <h4 class="font-medium text-sm text-gray-700 mb-2">Rating</h4>
            <div class="space-y-2">
                <label v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center">
                    <input type="checkbox" :value="rating" v-model="selectedRatings"
                        class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                    <span class="ml-2 text-sm text-gray-600">
                        {{ rating }} Stars & Up
                    </span>
                </label>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-2">
            <BaseButton block @click="applyFilters">
                Apply Filters
            </BaseButton>
            <BaseButton variant="secondary" @click="resetFilters">
                Reset
            </BaseButton>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';

const props = defineProps({
    categories: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['filter']);

const selectedCategories = ref([]);
const priceRange = ref({ min: '', max: '' });
const sortBy = ref('newest');
const selectedRatings = ref([]);

const applyFilters = () => {
    emit('filter', {
        categories: selectedCategories.value,
        price: {
            min: priceRange.value.min || null,
            max: priceRange.value.max || null
        },
        sort: sortBy.value,
        ratings: selectedRatings.value
    });
};

const resetFilters = () => {
    selectedCategories.value = [];
    priceRange.value = { min: '', max: '' };
    sortBy.value = 'newest';
    selectedRatings.value = [];
    applyFilters();
};

// Watch for changes and auto-apply filters
watch([selectedCategories, priceRange, sortBy, selectedRatings], () => {
    applyFilters();
}, { deep: true });
</script>