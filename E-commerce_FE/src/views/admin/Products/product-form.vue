<template>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-3xl mx-auto">
            <h1 class="text-2xl font-bold mb-6">
                {{ isEditing ? 'Edit Product' : 'Create New Product' }}
            </h1>

            <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Basic Information -->
                <div class="bg-white shadow-md rounded-lg p-6 space-y-4">
                    <h2 class="text-lg font-semibold mb-4">Basic Information</h2>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Name</label>
                        <input v-model="form.name" type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea v-model="form.description" rows="4"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required></textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Category</label>
                        <select v-model="form.categoryId"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required>
                            <option value="">Select a category</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>
                </div>

                <!-- Pricing and Inventory -->
                <div class="bg-white shadow-md rounded-lg p-6 space-y-4">
                    <h2 class="text-lg font-semibold mb-4">Pricing & Inventory</h2>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700">Price</label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span class="text-gray-500 sm:text-sm">$</span>
                                </div>
                                <input v-model="form.price" type="number" step="0.01"
                                    class="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700">Stock</label>
                            <input v-model="form.stock" type="number"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                required />
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Status</label>
                        <select v-model="form.status"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <!-- Image Upload -->
                <div class="bg-white shadow-md rounded-lg p-6 space-y-4">
                    <h2 class="text-lg font-semibold mb-4">Product Images</h2>

                    <div>
                        <label class="block text-sm font-medium text-gray-700">Main Image</label>
                        <input type="file" @change="handleImageUpload" accept="image/*" class="mt-1 block w-full" />
                    </div>

                    <div v-if="form.image" class="mt-2">
                        <img :src="form.image" alt="Product preview" class="h-32 w-32 object-cover rounded-lg" />
                    </div>
                </div>

                <!-- Submit Button -->
                <div class="flex justify-end space-x-4">
                    <button type="button" @click="router.back()"
                        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        {{ isEditing ? 'Update Product' : 'Create Product' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const categories = ref([]);

const form = ref({
    name: '',
    description: '',
    categoryId: '',
    price: '',
    stock: '',
    status: 'active',
    image: null
});

const isEditing = computed(() => route.params.id);

const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/categories');
        categories.value = response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const fetchProduct = async () => {
    if (!isEditing.value) return;

    try {
        const response = await axios.get(`/api/products/${route.params.id}`);
        form.value = {
            ...response.data,
            categoryId: response.data.category.id
        };
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        form.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
};

const handleSubmit = async () => {
    try {
        if (isEditing.value) {
            await axios.put(`/api/products/${route.params.id}`, form.value);
        } else {
            await axios.post('/api/products', form.value);
        }
        router.push({ name: 'admin-products' });
    } catch (error) {
        console.error('Error saving product:', error);
    }
};

onMounted(() => {
    fetchCategories();
    fetchProduct();
});
</script>