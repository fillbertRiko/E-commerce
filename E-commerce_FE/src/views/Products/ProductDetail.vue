<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="spinner"></div>
            <p class="mt-2 text-gray-600">Loading product details...</p>
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
                    <h3 class="text-sm font-medium text-red-800">Error loading product</h3>
                    <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Product details -->
        <div v-else class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            <!-- Image gallery -->
            <div class="flex flex-col">
                <!-- Main image -->
                <div class="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                    <img :src="currentImage" :alt="product.name"
                        class="w-full h-full object-center object-cover hover:opacity-75">
                </div>

                <!-- Image selector -->
                <div class="mt-4 grid grid-cols-4 gap-4">
                    <button v-for="image in product.images" :key="image" @click="currentImage = image"
                        class="relative rounded-lg overflow-hidden hover:opacity-75"
                        :class="{ 'ring-2 ring-primary-500': currentImage === image }">
                        <img :src="image" :alt="product.name" class="w-full h-full object-center object-cover">
                    </button>
                </div>
            </div>

            <!-- Product info -->
            <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.name }}</h1>

                <!-- Price -->
                <div class="mt-3">
                    <h2 class="sr-only">Product information</h2>
                    <p class="text-3xl text-gray-900">${{ product.price }}</p>
                </div>

                <!-- Stock status -->
                <div class="mt-3">
                    <span :class="[
                        product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium'
                    ]">
                        {{ product.in_stock ? 'In Stock' : 'Out of Stock' }}
                    </span>
                </div>

                <!-- Description -->
                <div class="mt-6">
                    <h3 class="sr-only">Description</h3>
                    <div class="text-base text-gray-700 space-y-6" v-html="product.description"></div>
                </div>

                <!-- Add to cart form -->
                <div class="mt-6">
                    <div class="flex items-center space-x-4">
                        <div class="flex items-center">
                            <button @click="decrementQuantity"
                                class="rounded-l-md border border-gray-300 px-3 py-2 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <span class="sr-only">Decrease quantity</span>
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20 12H4" />
                                </svg>
                            </button>
                            <input type="number" v-model.number="quantity" min="1"
                                class="w-16 border-t border-b border-gray-300 text-center text-gray-900 focus:outline-none focus:ring-0">
                            <button @click="incrementQuantity"
                                class="rounded-r-md border border-gray-300 px-3 py-2 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                                <span class="sr-only">Increase quantity</span>
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v12M6 12h12" />
                                </svg>
                            </button>
                        </div>
                        <button @click="addToCart" :disabled="!product.in_stock"
                            class="flex-1 bg-primary-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed">
                            Add to Cart
                        </button>
                        <button @click="toggleWishlist"
                            class="rounded-md p-2 text-gray-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500">
                            <span class="sr-only">Add to wishlist</span>
                            <svg class="h-6 w-6" :class="{ 'text-primary-500 fill-current': isInWishlist }" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Product metadata -->
                <div class="mt-8 border-t border-gray-200 pt-8">
                    <h3 class="text-sm font-medium text-gray-900">Product Information</h3>
                    <div class="mt-4 space-y-6">
                        <p class="text-sm text-gray-600">SKU: {{ product.sku }}</p>
                        <p class="text-sm text-gray-600">Category: {{ product.category }}</p>
                        <div class="flex items-center">
                            <div class="flex items-center">
                                <StarRating :rating="product.rating" :reviews="product.reviews_count" />
                            </div>
                            <span class="ml-3 text-sm font-medium text-primary-600 hover:text-primary-500">
                                {{ product.reviews_count }} reviews
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Product reviews -->
        <div v-if="!loading && !error" class="max-w-2xl mx-auto mt-16 lg:max-w-none">
            <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Customer Reviews</h2>

            <div class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <!-- Review stats -->
                <div class="lg:col-span-4">
                    <div class="flex items-center">
                        <div>
                            <div class="flex items-center">
                                <StarRating :rating="product.rating" size="lg" />
                            </div>
                            <p class="mt-1 text-sm text-gray-500">
                                Based on {{ product.reviews_count }} reviews
                            </p>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h3 class="text-lg font-medium text-gray-900">Share your thoughts</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            If you've used this product, share your thoughts with other customers
                        </p>
                        <button @click="openReviewModal"
                            class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full">
                            Write a review
                        </button>
                    </div>
                </div>

                <!-- Review list -->
                <div class="mt-16 lg:col-span-8 lg:mt-0">
                    <div class="flow-root">
                        <div class="-my-12 divide-y divide-gray-200">
                            <div v-for="review in product.reviews" :key="review.id" class="py-12">
                                <div class="flex items-center">
                                    <img :src="review.avatar" :alt="review.author" class="h-12 w-12 rounded-full">
                                    <div class="ml-4">
                                        <h4 class="text-sm font-bold text-gray-900">{{ review.author }}</h4>
                                        <div class="mt-1 flex items-center">
                                            <StarRating :rating="review.rating" size="sm" />
                                        </div>
                                        <p class="mt-1 text-sm text-gray-500">
                                            {{ formatDate(review.created_at) }}
                                        </p>
                                    </div>
                                </div>
                                <div class="mt-4 space-y-6 text-sm text-gray-600">
                                    <p>{{ review.content }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Review Modal -->
        <BaseModal v-if="showReviewModal" @close="closeReviewModal">
            <template #title>Write a Review</template>
            <template #content>
                <form @submit.prevent="submitReview" class="space-y-4">
                    <div>
                        <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
                        <div class="mt-1">
                            <div class="flex items-center">
                                <button v-for="star in 5" :key="star" type="button" @click="reviewForm.rating = star"
                                    class="p-1 text-gray-400 hover:text-yellow-400 focus:outline-none"
                                    :class="{ 'text-yellow-400': star <= reviewForm.rating }">
                                    <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </button>
                            </div>
                            <p v-if="reviewErrors.rating" class="mt-1 text-sm text-red-600">{{ reviewErrors.rating }}
                            </p>
                        </div>
                    </div>

                    <div>
                        <label for="content" class="block text-sm font-medium text-gray-700">Review</label>
                        <textarea id="content" v-model="reviewForm.content" rows="4"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            :class="{ 'border-red-500': reviewErrors.content }"></textarea>
                        <p v-if="reviewErrors.content" class="mt-1 text-sm text-red-600">{{ reviewErrors.content }}</p>
                    </div>
                </form>
            </template>
            <template #footer>
                <div class="flex justify-end space-x-3">
                    <button @click="closeReviewModal"
                        class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button @click="submitReview" :disabled="isSubmittingReview"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Submit Review
                    </button>
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useNotification } from '@/composables/useNotification';
import { formatDate } from '@/utils/date';
import StarRating from '@/components/base/StarRating.vue';
import BaseModal from '@/components/base/BaseModal.vue';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const notification = useNotification();

const product = ref(null);
const loading = ref(true);
const error = ref(null);
const currentImage = ref('');
const quantity = ref(1);
const isInWishlist = ref(false);

// Review modal state
const showReviewModal = ref(false);
const isSubmittingReview = ref(false);
const reviewForm = ref({
    rating: 0,
    content: ''
});
const reviewErrors = ref({});

const fetchProduct = async () => {
    try {
        loading.value = true;
        product.value = await productStore.fetchProduct(route.params.id);
        currentImage.value = product.value.images[0];
        isInWishlist.value = wishlistStore.isInWishlist(product.value.id);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const incrementQuantity = () => {
    quantity.value++;
};

const decrementQuantity = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const addToCart = async () => {
    try {
        await cartStore.addToCart({
            productId: product.value.id,
            quantity: quantity.value
        });
        notification.success('Product added to cart');
    } catch (err) {
        notification.error('Failed to add product to cart');
    }
};

const toggleWishlist = async () => {
    try {
        if (isInWishlist.value) {
            await wishlistStore.removeFromWishlist(product.value.id);
            notification.success('Product removed from wishlist');
        } else {
            await wishlistStore.addToWishlist(product.value.id);
            notification.success('Product added to wishlist');
        }
        isInWishlist.value = !isInWishlist.value;
    } catch (err) {
        notification.error('Failed to update wishlist');
    }
};

const openReviewModal = () => {
    showReviewModal.value = true;
    reviewForm.value = {
        rating: 0,
        content: ''
    };
    reviewErrors.value = {};
};

const closeReviewModal = () => {
    showReviewModal.value = false;
};

const validateReviewForm = () => {
    const errors = {};
    if (!reviewForm.value.rating) errors.rating = 'Please select a rating';
    if (!reviewForm.value.content) errors.content = 'Please write your review';
    else if (reviewForm.value.content.length < 10) errors.content = 'Review must be at least 10 characters long';

    reviewErrors.value = errors;
    return Object.keys(errors).length === 0;
};

const submitReview = async () => {
    if (!validateReviewForm()) return;

    try {
        isSubmittingReview.value = true;
        await productStore.addReview(product.value.id, reviewForm.value);
        await fetchProduct(); // Refresh product data to show new review
        notification.success('Review submitted successfully');
        closeReviewModal();
    } catch (err) {
        notification.error(err.message);
    } finally {
        isSubmittingReview.value = false;
    }
};

onMounted(fetchProduct);
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