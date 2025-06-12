<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="spinner"></div>
            <p class="mt-2 text-gray-600">Loading checkout...</p>
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
                    <h3 class="text-sm font-medium text-red-800">Error loading checkout</h3>
                    <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                </div>
            </div>
        </div>

        <!-- Checkout content -->
        <div v-else>
            <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                <!-- Checkout form -->
                <div class="lg:col-span-7">
                    <form @submit.prevent="handleSubmit">
                        <!-- Contact Information -->
                        <div class="space-y-6">
                            <div>
                                <h2 class="text-lg font-medium text-gray-900">Contact Information</h2>
                                <p class="mt-1 text-sm text-gray-500">
                                    We'll use this email to send your order confirmation.
                                </p>

                                <div class="mt-6">
                                    <label for="email" class="block text-sm font-medium text-gray-700">Email
                                        address</label>
                                    <div class="mt-1">
                                        <input type="email" id="email" v-model="form.email" required
                                            class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                    </div>
                                </div>
                            </div>

                            <!-- Shipping Address -->
                            <div class="pt-6">
                                <h2 class="text-lg font-medium text-gray-900">Shipping Address</h2>

                                <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="firstName" class="block text-sm font-medium text-gray-700">First
                                            name</label>
                                        <div class="mt-1">
                                            <input type="text" id="firstName" v-model="form.firstName" required
                                                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-3">
                                        <label for="lastName" class="block text-sm font-medium text-gray-700">Last
                                            name</label>
                                        <div class="mt-1">
                                            <input type="text" id="lastName" v-model="form.lastName" required
                                                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-6">
                                        <label for="address" class="block text-sm font-medium text-gray-700">Street
                                            address</label>
                                        <div class="mt-1">
                                            <input type="text" id="address" v-model="form.address" required
                                                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                                        <div class="mt-1">
                                            <input type="text" id="city" v-model="form.city" required
                                                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label for="state" class="block text-sm font-medium text-gray-700">State /
                                            Province</label>
                                        <div class="mt-1">
                                            <input type="text" id="state" v-model="form.state" required
                                                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label for="postalCode" class="block text-sm font-medium text-gray-700">ZIP /
                                            Postal
                                            code</label>
                                        <div class="mt-1">
                                            <input type="text" id="postalCode" v-model="form.postalCode" required
                                                class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Shipping Method -->
                            <div class="pt-6">
                                <h2 class="text-lg font-medium text-gray-900">Shipping Method</h2>

                                <div class="mt-6">
                                    <div class="space-y-4">
                                        <div v-for="method in shippingMethods" :key="method.id"
                                            class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                                            :class="[form.shippingMethod === method.id ? 'border-primary-500' : 'border-gray-300']"
                                            @click="form.shippingMethod = method.id">
                                            <div class="flex-1 flex">
                                                <div class="flex flex-col">
                                                    <div class="flex justify-between">
                                                        <div class="flex items-center">
                                                            <div class="text-sm">
                                                                <p class="font-medium text-gray-900">
                                                                    {{ method.name }}
                                                                </p>
                                                                <p class="text-gray-500">
                                                                    {{ method.description }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p class="text-sm font-medium text-gray-900">
                                                            ${{ method.price.toFixed(2) }}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Payment -->
                            <div class="pt-6">
                                <h2 class="text-lg font-medium text-gray-900">Payment</h2>

                                <div class="mt-6">
                                    <div class="space-y-4">
                                        <div v-for="method in paymentMethods" :key="method.id"
                                            class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                                            :class="[form.paymentMethod === method.id ? 'border-primary-500' : 'border-gray-300']"
                                            @click="form.paymentMethod = method.id">
                                            <div class="flex-1 flex">
                                                <div class="flex flex-col">
                                                    <div class="flex justify-between items-center">
                                                        <div class="flex items-center">
                                                            <img :src="method.icon" :alt="method.name"
                                                                class="h-8 w-auto mr-3">
                                                            <div class="text-sm">
                                                                <p class="font-medium text-gray-900">
                                                                    {{ method.name }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Credit Card Details (show only when credit card is selected) -->
                                    <div v-if="form.paymentMethod === 'credit-card'" class="mt-6 space-y-4">
                                        <div>
                                            <label for="cardNumber" class="block text-sm font-medium text-gray-700">Card
                                                number</label>
                                            <div class="mt-1">
                                                <input type="text" id="cardNumber" v-model="form.cardNumber"
                                                    placeholder="1234 1234 1234 1234" required
                                                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-3 gap-4">
                                            <div class="col-span-2">
                                                <label for="expiryDate"
                                                    class="block text-sm font-medium text-gray-700">Expiry
                                                    date</label>
                                                <div class="mt-1">
                                                    <input type="text" id="expiryDate" v-model="form.expiryDate"
                                                        placeholder="MM/YY" required
                                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                                </div>
                                            </div>

                                            <div>
                                                <label for="cvc"
                                                    class="block text-sm font-medium text-gray-700">CVC</label>
                                                <div class="mt-1">
                                                    <input type="text" id="cvc" v-model="form.cvc" placeholder="123"
                                                        required
                                                        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Submit button -->
                        <div class="mt-10 pt-6 border-t border-gray-200">
                            <button type="submit"
                                class="w-full bg-primary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-primary-500">
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>

                <!-- Order summary -->
                <div class="mt-10 lg:mt-0 lg:col-span-5">
                    <div class="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                        <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

                        <div class="mt-6 space-y-4">
                            <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <img :src="item.product.image" :alt="item.product.name"
                                        class="w-16 h-16 rounded object-center object-cover">
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-gray-900">{{ item.product.name }}</p>
                                        <p class="text-sm text-gray-500">Qty {{ item.quantity }}</p>
                                    </div>
                                </div>
                                <p class="text-sm font-medium text-gray-900">
                                    ${{ (item.product.price * item.quantity).toFixed(2) }}
                                </p>
                            </div>

                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="text-sm text-gray-600">Subtotal</dt>
                                <dd class="text-sm font-medium text-gray-900">${{ subtotal.toFixed(2) }}</dd>
                            </div>

                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="text-sm text-gray-600">Shipping</dt>
                                <dd class="text-sm font-medium text-gray-900">${{ shipping.toFixed(2) }}</dd>
                            </div>

                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="text-sm text-gray-600">Tax</dt>
                                <dd class="text-sm font-medium text-gray-900">${{ tax.toFixed(2) }}</dd>
                            </div>

                            <div class="border-t border-gray-200 pt-4 flex items-center justify-between">
                                <dt class="text-base font-medium text-gray-900">Order total</dt>
                                <dd class="text-base font-medium text-gray-900">${{ total.toFixed(2) }}</dd>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 text-sm text-center">
                        <p class="text-gray-500">
                            By placing your order, you agree to our
                            <router-link to="/terms" class="text-primary-600 font-medium hover:text-primary-500">
                                Terms and Conditions
                            </router-link>
                            and
                            <router-link to="/privacy" class="text-primary-600 font-medium hover:text-primary-500">
                                Privacy Policy
                            </router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useOrderStore } from '@/stores/order';
import { useNotification } from '@/composables/useNotification';

const router = useRouter();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const notification = useNotification();

const loading = ref(true);
const error = ref(null);

// Form data
const form = ref({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvc: ''
});

// Shipping methods
const shippingMethods = [
    {
        id: 'standard',
        name: 'Standard Shipping',
        description: 'Delivery in 4-6 business days',
        price: 5.00
    },
    {
        id: 'express',
        name: 'Express Shipping',
        description: 'Delivery in 2-3 business days',
        price: 15.00
    },
    {
        id: 'overnight',
        name: 'Overnight Shipping',
        description: 'Next day delivery',
        price: 25.00
    }
];

// Payment methods
const paymentMethods = [
    {
        id: 'credit-card',
        name: 'Credit Card',
        icon: '/images/payment/credit-card.svg'
    },
    {
        id: 'paypal',
        name: 'PayPal',
        icon: '/images/payment/paypal.svg'
    }
];

// Get cart items from store
const cartItems = computed(() => cartStore.items);

// Calculate totals
const subtotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
    }, 0);
});

const shipping = computed(() => {
    const method = shippingMethods.find(m => m.id === form.value.shippingMethod);
    return method ? method.price : 0;
});

const tax = computed(() => {
    return subtotal.value * 0.1; // 10% tax
});

const total = computed(() => {
    return subtotal.value + shipping.value + tax.value;
});

// Handle form submission
const handleSubmit = async () => {
    try {
        loading.value = true;
        error.value = null;

        // Create order
        const order = await orderStore.createOrder({
            ...form.value,
            items: cartItems.value,
            subtotal: subtotal.value,
            shipping: shipping.value,
            tax: tax.value,
            total: total.value
        });

        // Clear cart
        await cartStore.clearCart();

        // Show success message
        notification.success('Order placed successfully');

        // Redirect to order confirmation
        router.push({
            name: 'order-confirmation',
            params: { id: order.id }
        });
    } catch (err) {
        error.value = err.message;
        notification.error('Failed to place order');
    } finally {
        loading.value = false;
    }
};

// Load cart data
const loadCart = async () => {
    try {
        loading.value = true;
        error.value = null;
        await cartStore.fetchCart();

        // Pre-fill form with user data if available
        const user = cartStore.user;
        if (user) {
            form.value.email = user.email;
            form.value.firstName = user.firstName;
            form.value.lastName = user.lastName;
        }
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    loadCart();
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