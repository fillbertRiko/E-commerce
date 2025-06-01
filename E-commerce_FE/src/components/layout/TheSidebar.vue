<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import ProductFilter from '@/components/product/ProductFilter.vue';

const route = useRoute();
const categories = ref([
  { id: 1, name: 'Electronics', productCount: 150 },
  { id: 2, name: 'Clothing', productCount: 320 },
  { id: 3, name: 'Books', productCount: 80 },
  { id: 4, name: 'Home & Garden', productCount: 200 },
  { id: 5, name: 'Sports', productCount: 90 }
]);

const filters = [
  {
    id: 'price',
    name: 'Giá',
    options: [
      { value: '0-100000', label: 'Dưới 100.000đ' },
      { value: '100000-300000', label: '100.000đ - 300.000đ' },
      { value: '300000-500000', label: '300.000đ - 500.000đ' },
      { value: '500000-1000000', label: '500.000đ - 1.000.000đ' },
      { value: '1000000+', label: 'Trên 1.000.000đ' },
    ],
  },
  {
    id: 'color',
    name: 'Màu sắc',
    options: [
      { value: 'white', label: 'Trắng' },
      { value: 'black', label: 'Đen' },
      { value: 'gray', label: 'Xám' },
      { value: 'red', label: 'Đỏ' },
      { value: 'blue', label: 'Xanh' },
    ],
  },
  {
    id: 'size',
    name: 'Kích thước',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
    ],
  },
];

const expandedCategories = ref(new Set());
const isFiltersExpanded = ref(false);

const toggleCategory = (categoryName) => {
  if (expandedCategories.value.has(categoryName)) {
    expandedCategories.value.delete(categoryName);
  } else {
    expandedCategories.value.add(categoryName);
  }
};

const toggleFilters = () => {
  isFiltersExpanded.value = !isFiltersExpanded.value;
};

const isActiveCategory = (categoryId) => {
  return route.params.id === categoryId.toString();
};

const handleFilter = (filters) => {
  // Implement the logic to handle filtering
};
</script>

<template>
  <aside class="w-64 h-full bg-white shadow-lg">
    <div class="h-full flex flex-col">
      <!-- Categories -->
      <div class="p-4 border-b">
        <h3 class="text-lg font-medium text-gray-900">Categories</h3>
        <div class="mt-4 space-y-4">
          <RouterLink v-for="category in categories" :key="category.id"
            :to="{ name: 'category', params: { id: category.id } }"
            class="block text-sm text-gray-600 hover:text-primary-600"
            :class="{ 'text-primary-600 font-medium': isActiveCategory(category.id) }">
            {{ category.name }}
            <span class="text-gray-400">({{ category.productCount }})</span>
          </RouterLink>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex-1 p-4 overflow-y-auto">
        <ProductFilter :categories="categories" @filter="handleFilter" />
      </div>
    </div>
  </aside>
</template>