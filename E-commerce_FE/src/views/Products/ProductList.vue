<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);
const isLoading = ref(true);
const error = ref(null);

const fetchProducts = async () => {
  try {
    isLoading.value = true;
    // TODO: Replace with actual API call
    const response = await fetch('/api/products');
    const data = await response.json();
    products.value = data;
  } catch (err) {
    error.value = 'Failed to load products. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="md:flex md:items-center md:justify-between">
      <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Products
        </h2>
      </div>
      <div class="mt-4 flex md:mt-0 md:ml-4">
        <div class="relative rounded-md shadow-sm">
          <input
            type="text"
            class="form-control"
            placeholder="Search products..."
          >
        </div>
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

    <!-- Product Grid -->
    <div v-else class="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <!-- Product Card -->
      <div v-for="product in products" :key="product.id" class="bg-white rounded-lg shadow overflow-hidden">
        <div class="aspect-w-3 aspect-h-2">
          <img 
            :src="product.image" 
            :alt="product.name"
            class="w-full h-full object-center object-cover"
          >
        </div>
        <div class="p-4">
          <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
          <div class="mt-3 flex items-center justify-between">
            <p class="text-lg font-bold text-primary-600">${{ product.price }}</p>
            <button class="btn btn-primary">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="products.length === 0" class="col-span-full text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No products</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding some products.</p>
      </div>
    </div>
  </div>
</template> 