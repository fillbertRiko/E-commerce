<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="md:flex md:items-center md:justify-between mb-8">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {{ isEditing ? 'Edit Product' : 'Add New Product' }}
                </h2>
            </div>
            <div class="mt-4 flex md:mt-0 md:ml-4">
                <router-link to="/admin/products"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Back to Products
                </router-link>
            </div>
        </div>

        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="spinner"></div>
            <p class="mt-2 text-gray-600">Loading product data...</p>
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
                    <h3 class="text-sm font-medium text-red-800">Error</h3>
                    <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Product form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-8">
            <!-- Basic Information -->
            <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Basic Information</h3>
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label for="name" class="block text-sm font-medium text-gray-700">Product Name</label>
                            <div class="mt-1">
                                <input type="text" id="name" v-model="form.name"
                                    class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required>
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label for="sku" class="block text-sm font-medium text-gray-700">SKU</label>
                            <div class="mt-1">
                                <input type="text" id="sku" v-model="form.sku"
                                    class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required>
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                            <div class="mt-1">
                                <textarea id="description" v-model="form.description" rows="4"
                                    class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pricing and Inventory -->
            <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Pricing & Inventory</h3>
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-2">
                            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
                            <div class="mt-1">
                                <input type="number" id="price" v-model="form.price" step="0.01" min="0"
                                    class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required>
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="stock" class="block text-sm font-medium text-gray-700">Stock</label>
                            <div class="mt-1">
                                <input type="number" id="stock" v-model="form.stock" min="0"
                                    class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required>
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
                            <div class="mt-1">
                                <select id="category" v-model="form.category"
                                    class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    required>
                                    <option v-for="category in categories" :key="category.id" :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Images -->
            <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">Images</h3>
                    <div class="mt-6">
                        <div class="flex items-center space-x-4">
                            <div v-if="form.image" class="flex-shrink-0">
                                <img :src="form.image" alt="Product image" class="h-24 w-24 object-cover rounded-md">
                            </div>
                            <div>
                                <input type="file" @change="handleImageUpload" accept="image/*"
                                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Submit -->
            <div class="flex justify-end">
                <button type="button" @click="$router.push('/admin/products')"
                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mr-3">
                    Cancel
                </button>
                <button type="submit"
                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    {{ isEditing ? 'Update Product' : 'Create Product' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useNotification } from '@/composables/useNotification';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const notification = useNotification();

const loading = ref(true);
const error = ref(null);
const categories = ref([]);

const isEditing = computed(() => !!route.params.id);

const form = ref({
    name: '',
    sku: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    image: ''
});

const loadCategories = async () => {
    try {
        categories.value = await productStore.fetchCategories();
    } catch (err) {
        error.value = 'Failed to load categories';
    }
};

const loadProduct = async () => {
    if (!isEditing.value) {
        loading.value = false;
        return;
    }

    try {
        const product = await productStore.fetchProduct(route.params.id);
        form.value = {
            name: product.name,
            sku: product.sku,
            description: product.description,
            price: product.price,
            stock: product.stock,
            category: product.category,
            image: product.image
        };
    } catch (err) {
        error.value = 'Failed to load product';
    } finally {
        loading.value = false;
    }
};

const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            form.value.image = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const handleSubmit = async () => {
    try {
        if (isEditing.value) {
            await productStore.updateProduct(route.params.id, form.value);
            notification.success('Product updated successfully');
        } else {
            await productStore.createProduct(form.value);
            notification.success('Product created successfully');
        }
        router.push('/admin/products');
    } catch (err) {
        notification.error(err.message || 'Failed to save product');
    }
};

onMounted(async () => {
    await Promise.all([loadCategories(), loadProduct()]);
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