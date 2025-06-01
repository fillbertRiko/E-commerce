<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'info',
        validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    dismissible: {
        type: Boolean,
        default: false
    },
    show: {
        type: Boolean,
        default: true
    }
});

const emit = defineEmits(['close']);

const alertClasses = computed(() => {
    const baseClasses = 'rounded-md p-4';

    const typeClasses = {
        success: 'bg-green-50 border border-green-200',
        error: 'bg-red-50 border border-red-200',
        warning: 'bg-yellow-50 border border-yellow-200',
        info: 'bg-blue-50 border border-blue-200'
    };

    return `${baseClasses} ${typeClasses[props.type]}`;
});

const iconClasses = computed(() => {
    const baseClasses = 'h-5 w-5';

    const typeClasses = {
        success: 'text-green-400',
        error: 'text-red-400',
        warning: 'text-yellow-400',
        info: 'text-blue-400'
    };

    return `${baseClasses} ${typeClasses[props.type]}`;
});

const textClasses = computed(() => {
    const typeClasses = {
        success: 'text-green-800',
        error: 'text-red-800',
        warning: 'text-yellow-800',
        info: 'text-blue-800'
    };

    return typeClasses[props.type];
});
</script>

<template>
    <div v-if="show" :class="alertClasses" role="alert">
        <div class="flex">
            <div class="flex-shrink-0">
                <!-- Success Icon -->
                <svg v-if="type === 'success'" :class="iconClasses" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <!-- Error Icon -->
                <svg v-else-if="type === 'error'" :class="iconClasses" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <!-- Warning Icon -->
                <svg v-else-if="type === 'warning'" :class="iconClasses" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>

                <!-- Info Icon -->
                <svg v-else :class="iconClasses" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>

            <div class="ml-3 flex-1">
                <div :class="[textClasses, 'text-sm']">
                    <slot></slot>
                </div>
            </div>

            <div v-if="dismissible" class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                    <button type="button" :class="[
                        textClasses,
                        'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2'
                    ]" @click="$emit('close')">
                        <span class="sr-only">Dismiss</span>
                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>