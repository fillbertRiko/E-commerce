<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="product" class="max-w-7xl mx-auto">
            <!-- Breadcrumb -->
            <nav class="flex mb-8" aria-label="Breadcrumb">
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
                            <router-link :to="{ name: 'products' }"
                                class="text-gray-700 hover:text-gray-900 ml-1 md:ml-2">
                                Products
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
                            <span class="text-gray-500 ml-1 md:ml-2">{{ product.name }}</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <!-- Product Info -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Product Images -->
                <div class="space-y-4">
                    <div class="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                        <img :src="selectedImage || product.image" :alt="product.name"
                            class="w-full h-full object-center object-cover" />
                    </div>
                    <div class="grid grid-cols-4 gap-4">
                        <button v-for="(image, index) in product.images" :key="index" @click="selectedImage = image"
                            class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ring-2 ring-transparent hover:ring-indigo-500"
                            :class="{ 'ring-indigo-500': selectedImage === image }">
                            <img :src="image" :alt="'Product image ' + (index + 1)"
                                class="w-full h-full object-center object-cover" />
                        </button>
                    </div>
                </div>

                <!-- Product Details -->
                <div class="space-y-6">
                    <div>
                        <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
                        <p class="mt-1 text-lg text-gray-500">{{ product.category }}</p>
                    </div>

                    <div class="flex items-center space-x-4">
                        <span class="text-3xl font-bold text-gray-900">${{ product.price.toFixed(2) }}</span>
                        <span v-if="product.oldPrice" class="text-lg text-gray-500 line-through">
                            ${{ product.oldPrice.toFixed(2) }}
                        </span>
                    </div>

                    <!-- Rating -->
                    <div class="flex items-center space-x-2">
                        <div class="flex">
                            <star-rating :rating="product.rating" :read-only="true" />
                        </div>
                        <span class="text-sm text-gray-500">({{ product.reviewsCount }} reviews)</span>
                    </div>

                    <!-- Stock Status -->
                    <div>
                        <span :class="{
                            'px-2 py-1 text-sm rounded-full': true,
                            'bg-green-100 text-green-800': product.stock > 0,
                            'bg-red-100 text-red-800': product.stock === 0
                        }">
                            {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
                        </span>
                        <span v-if="product.stock > 0" class="ml-2 text-sm text-gray-500">
                            {{ product.stock }} units available
                        </span>
                    </div>

                    <!-- Add to Cart -->
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center border rounded-md">
                            <button @click="decrementQuantity"
                                class="px-3 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
                                :disabled="quantity <= 1">
                                -
                            </button>
                            <input v-model.number="quantity" type="number" min="1" :max="product.stock"
                                class="w-16 text-center border-x py-2" />
                            <button @click="incrementQuantity"
                                class="px-3 py-2 text-gray-600 hover:text-gray-700 disabled:opacity-50"
                                :disabled="quantity >= product.stock">
                                +
                            </button>
                        </div>
                        <button @click="addToCart"
                            class="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                            :disabled="product.stock === 0">
                            Add to Cart
                        </button>
                        <button @click="toggleWishlist" class="p-3 rounded-md border hover:bg-gray-50"
                            :class="{ 'text-red-500': isInWishlist }">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path v-if="isInWishlist" fill-rule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clip-rule="evenodd" />
                                <path v-else fill-rule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clip-rule="evenodd" stroke="currentColor" stroke-width="2" fill="none" />
                            </svg>
                        </button>
                    </div>

                    <!-- Description -->
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900">Description</h2>
                        <div class="mt-2 prose prose-sm text-gray-500" v-html="product.description"></div>
                    </div>

                    <!-- Specifications -->
                    <div v-if="product.specifications">
                        <h2 class="text-lg font-semibold text-gray-900">Specifications</h2>
                        <dl class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                            <div v-for="(value, key) in product.specifications" :key="key">
                                <dt class="text-sm font-medium text-gray-500">{{ key }}</dt>
                                <dd class="mt-1 text-sm text-gray-900">{{ value }}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            <!-- Reviews Section -->
            <div class="mt-16">
                <h2 class="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                <div class="mt-8 space-y-8">
                    <div v-for="review in product.reviews" :key="review.id" class="border-b pb-8">
                        <div class="flex items-center mb-4">
                            <div class="flex items-center">
                                <star-rating :rating="review.rating" :read-only="true" />
                            </div>
                            <span class="ml-4 text-sm text-gray-500">{{ formatDate(review.createdAt) }}</span>
                        </div>
                        <p class="font-medium">{{ review.title }}</p>
                        <p class="mt-2 text-gray-600">{{ review.comment }}</p>
                        <div class="mt-4 flex items-center">
                            <span class="text-sm font-medium text-gray-900">{{ review.author }}</span>
                            <span class="mx-2 text-gray-500">&middot;</span>
                            <span class="text-sm text-gray-500">Verified Purchase</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-else class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p class="mt-4 text-gray-600">Loading product details...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import StarRating from '@/components/StarRating.vue';
import axios from 'axios';

const route = useRoute();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const product = ref(null);
const selectedImage = ref(null);
const quantity = ref(1);
const isInWishlist = ref(false);

const fetchProduct = async () => {
    try {
        const response = await axios.get(`/api/products/${route.params.id}`);
        product.value = response.data;
        selectedImage.value = product.value.image;
        isInWishlist.value = wishlistStore.isInWishlist(product.value.id);
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

const incrementQuantity = () => {
    if (quantity.value < product.value.stock) {
        quantity.value++;
    }
};

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const addToCart = () => {
    cartStore.addItem({
        id: product.value.id,
        name: product.value.name,
        price: product.value.price,
        image: product.value.image,
        quantity: quantity.value
    });
};

const toggleWishlist = () => {
    if (isInWishlist.value) {
        wishlistStore.removeFromWishlist(product.value.id);
    } else {
        wishlistStore.addToWishlist({
            id: product.value.id,
            name: product.value.name,
            price: product.value.price,
            image: product.value.image
        });
    }
    isInWishlist.value = !isInWishlist.value;
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

onMounted(() => {
    fetchProduct();
});
</script>