<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Reset your password
            </h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form class="space-y-6" @submit.prevent="handleSubmit">
                    <!-- Password Field -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <div class="mt-1">
                            <input id="password" v-model="formData.password" type="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                :class="{ 'border-red-500': errors.password }" />
                            <p v-if="errors.password" class="mt-2 text-sm text-red-600">
                                {{ errors.password }}
                            </p>
                        </div>
                    </div>

                    <!-- Confirm Password Field -->
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
                            Confirm New Password
                        </label>
                        <div class="mt-1">
                            <input id="confirmPassword" v-model="formData.confirmPassword" type="password" required
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                :class="{ 'border-red-500': errors.confirmPassword }" />
                            <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600">
                                {{ errors.confirmPassword }}
                            </p>
                        </div>
                    </div>

                    <div>
                        <button type="submit" :disabled="isLoading"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            :class="{ 'opacity-75 cursor-not-allowed': isLoading }">
                            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Reset Password
                        </button>
                    </div>
                </form>

                <div class="mt-6">
                    <div class="relative">
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500">
                                Remember your password?
                                <RouterLink to="/login" class="font-medium text-primary-600 hover:text-primary-500">
                                    Sign in
                                </RouterLink>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { useNotification } from '@/composables/useNotification';
import { useFormValidation } from '@/composables/useFormValidation';

const route = useRoute();
const router = useRouter();
const { resetPassword } = useAuth();
const notification = useNotification();

const formData = ref({
    password: '',
    confirmPassword: '',
    token: route.query.token
});

const { errors, validate } = useFormValidation(formData.value, {
    password: ['required', 'min:8'],
    confirmPassword: ['required', (value) => value === formData.value.password || 'Passwords do not match']
});

const isLoading = ref(false);

const handleSubmit = async () => {
    if (!validate()) return;

    try {
        isLoading.value = true;
        await resetPassword({
            token: formData.value.token,
            password: formData.value.password
        });
        notification.success('Password has been reset successfully');
        router.push('/login');
    } catch (error) {
        notification.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
        isLoading.value = false;
    }
};
</script>