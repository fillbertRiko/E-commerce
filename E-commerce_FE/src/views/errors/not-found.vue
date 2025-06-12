<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="max-w-xl w-full text-center">
            <div class="mb-8">
                <h1 class="text-9xl font-bold text-gray-900">404</h1>
                <p class="text-2xl font-medium text-gray-600 mt-4">Page Not Found</p>
                <p class="text-gray-500 mt-2">
                    The page you're looking for doesn't exist or has been moved.
                </p>
            </div>
            <div class="space-x-4">
                <router-link to="/"
                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                    Go Home
                </router-link>
                <button @click="router.back()"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    Go Back
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>