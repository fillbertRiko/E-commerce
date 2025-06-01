<template>
    <div class="flex items-center py-4 border-b">
        <!-- Product Image -->
        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
            <img :src="item.image" :alt="item.name" class="h-full w-full object-cover object-center">
        </div>

        <!-- Product Details -->
        <div class="ml-4 flex flex-1 flex-col">
            <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                        <RouterLink :to="{ name: 'product-detail', params: { id: item.productId } }">
                            {{ item.name }}
                        </RouterLink>
                    </h3>
                    <p class="ml-4">{{ formatPrice(item.price) }}</p>
                </div>
                <p class="mt-1 text-sm text-gray-500">
                    {{ item.variant }}
                </p>
            </div>
            <div class="flex flex-1 items-end justify-between text-sm">
                <!-- Quantity Controls -->
                <div class="flex items-center">
                    <button class="text-gray-500 hover:text-gray-700 p-1" @click="updateQuantity(item.quantity - 1)"
                        :disabled="item.quantity <= 1">
                        -
                    </button>
                    <span class="mx-2 min-w-[2rem] text-center">{{ item.quantity }}</span>
                    <button class="text-gray-500 hover:text-gray-700 p-1" @click="updateQuantity(item.quantity + 1)">
                        +
                    </button>
                </div>

                <!-- Remove Button -->
                <div class="flex">
                    <button type="button" class="font-medium text-primary-600 hover:text-primary-500"
                        @click="removeItem">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { formatPrice } from '@/utils/helpers';

const props = defineProps({
    item: {
        type: Object,
        required: true,
        validator: (value) => {
            return value.id && value.name && value.price && value.quantity;
        }
    }
});

const cartStore = useCartStore();

const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;
    await cartStore.updateItemQuantity(props.item.id, newQuantity);
};

const removeItem = async () => {
    await cartStore.removeItem(props.item.id);
};
</script>