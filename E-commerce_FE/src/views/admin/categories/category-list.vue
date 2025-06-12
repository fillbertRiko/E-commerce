<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold">Categories Management</h1>
            <button @click="openCreateModal" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add Category
            </button>
        </div>

        <!-- Categories Table -->
        <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Products Count
                        </th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="category in categories" :key="category.id">
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ category.name }}
                        </td>
                        <td class="px-6 py-4">
                            {{ category.description }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            {{ category.productsCount }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button @click="editCategory(category)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                                Edit
                            </button>
                            <button @click="deleteCategory(category.id)" class="text-red-600 hover:text-red-900">
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
const categories = ref([]);

const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/categories');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const openCreateModal = () => {
    // Implement create modal logic
};

const editCategory = (category) => {
    // Implement edit logic
};

const deleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
        await axios.delete(`/api/categories/${id}`);
        await fetchCategories();
    } catch (error) {
        console.error('Error deleting category:', error);
    }
};

onMounted(() => {
    fetchCategories();
});
</script>