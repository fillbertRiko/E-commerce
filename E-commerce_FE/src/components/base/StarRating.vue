<template>
    <div class="flex items-center">
        <div class="flex items-center">
            <template v-for="index in 5" :key="index">
                <svg :class="[
                    index <= rating ? 'text-yellow-400' : 'text-gray-300',
                    sizeClasses.icon
                ]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            </template>
        </div>
        <p v-if="reviews !== undefined" :class="['ml-2', sizeClasses.text]">
            {{ reviews }} {{ reviews === 1 ? 'review' : 'reviews' }}
        </p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    rating: {
        type: Number,
        required: true,
        validator: value => value >= 0 && value <= 5
    },
    reviews: {
        type: Number,
        default: undefined
    },
    size: {
        type: String,
        default: 'md',
        validator: value => ['sm', 'md', 'lg'].includes(value)
    }
});

const sizeClasses = computed(() => {
    const sizes = {
        sm: {
            icon: 'h-4 w-4',
            text: 'text-xs text-gray-600'
        },
        md: {
            icon: 'h-5 w-5',
            text: 'text-sm text-gray-600'
        },
        lg: {
            icon: 'h-6 w-6',
            text: 'text-base text-gray-600'
        }
    };
    return sizes[props.size];
});
</script>