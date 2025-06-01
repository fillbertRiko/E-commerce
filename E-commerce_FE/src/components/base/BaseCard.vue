<script setup>
defineProps({
    title: {
        type: String,
        default: ''
    },
    subtitle: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div v-if="loading" class="p-4">
            <div class="animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="space-y-3 mt-4">
                    <div class="h-4 bg-gray-200 rounded"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </div>

        <template v-else>
            <div v-if="title || subtitle" class="px-4 py-5 sm:px-6">
                <h3 v-if="title" class="text-lg font-medium leading-6 text-gray-900">
                    {{ title }}
                </h3>
                <p v-if="subtitle" class="mt-1 max-w-2xl text-sm text-gray-500">
                    {{ subtitle }}
                </p>
            </div>

            <div class="px-4 py-5 sm:p-6">
                <slot></slot>
            </div>

            <div v-if="$slots.footer" class="px-4 py-4 sm:px-6 bg-gray-50">
                <slot name="footer"></slot>
            </div>
        </template>
    </div>
</template>