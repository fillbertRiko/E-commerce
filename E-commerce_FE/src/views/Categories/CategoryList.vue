<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const categories = ref([]);
const isLoading = ref(true);
const error = ref(null);

const fetchCategories = async () => {
  try {
    isLoading.value = true;
    // TODO: Replace with actual API call
    const response = await fetch('/api/categories');
    const data = await response.json();
    categories.value = data;
  } catch (err) {
    error.value = 'Failed to load categories. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Categories
        </h2>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="mt-8 flex justify-center">
      <svg class="animate-spin h-8 w-8 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="mt-8">
      <div class="bg-danger-50 border-l-4 border-danger-500 p-4" role="alert">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-danger-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-danger-700">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Grid -->
    <div v-else class="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Category Card -->
      <RouterLink
        v-for="category in categories"
        :key="category.id"
        :to="{ name: 'products', query: { category: category.id }}"
        class="relative rounded-lg overflow-hidden bg-white shadow hover:shadow-lg transition-shadow duration-300"
      >
        <div class="aspect-w-3 aspect-h-2">
          <img 
            :src="category.image" 
            :alt="category.name"
            class="w-full h-full object-center object-cover"
          >
          <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <h3 class="text-2xl font-bold text-white">{{ category.name }}</h3>
        </div>
      </RouterLink>

      <!-- Empty State -->
      <div v-if="categories.length === 0" class="col-span-full text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No categories</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding some categories.</p>
      </div>
    </div>
  </div>
</template> 