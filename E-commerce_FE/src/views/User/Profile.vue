<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Profile header -->
        <div class="md:flex md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
                <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    Profile Settings
                </h2>
            </div>
        </div>

        <div class="mt-8">
            <div class="max-w-3xl mx-auto">
                <!-- Profile form -->
                <form @submit.prevent="handleSubmit" class="space-y-8 divide-y divide-gray-200">
                    <div class="space-y-8 divide-y divide-gray-200">
                        <div>
                            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <!-- Avatar -->
                                <div class="sm:col-span-6">
                                    <label class="block text-sm font-medium text-gray-700">
                                        Photo
                                    </label>
                                    <div class="mt-2 flex items-center">
                                        <img v-if="formData.avatar" :src="formData.avatar" alt="Profile"
                                            class="h-12 w-12 rounded-full" />
                                        <span v-else class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            <svg class="h-full w-full text-gray-300" fill="currentColor"
                                                viewBox="0 0 24 24">
                                                <path
                                                    d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <button type="button"
                                            class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                            Change
                                        </button>
                                    </div>
                                </div>

                                <!-- Full Name -->
                                <div class="sm:col-span-3">
                                    <label for="fullName" class="block text-sm font-medium text-gray-700">
                                        Full name
                                    </label>
                                    <div class="mt-1">
                                        <input type="text" id="fullName" v-model="formData.fullName"
                                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            :class="{ 'border-red-500': errors.fullName }" />
                                        <p v-if="errors.fullName" class="mt-2 text-sm text-red-600">
                                            {{ errors.fullName }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Email -->
                                <div class="sm:col-span-3">
                                    <label for="email" class="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div class="mt-1">
                                        <input type="email" id="email" v-model="formData.email"
                                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            :class="{ 'border-red-500': errors.email }" />
                                        <p v-if="errors.email" class="mt-2 text-sm text-red-600">
                                            {{ errors.email }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Phone -->
                                <div class="sm:col-span-3">
                                    <label for="phone" class="block text-sm font-medium text-gray-700">
                                        Phone number
                                    </label>
                                    <div class="mt-1">
                                        <input type="tel" id="phone" v-model="formData.phone"
                                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            :class="{ 'border-red-500': errors.phone }" />
                                        <p v-if="errors.phone" class="mt-2 text-sm text-red-600">
                                            {{ errors.phone }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Address -->
                                <div class="sm:col-span-6">
                                    <label for="address" class="block text-sm font-medium text-gray-700">
                                        Address
                                    </label>
                                    <div class="mt-1">
                                        <textarea id="address" v-model="formData.address" rows="3"
                                            class="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                            :class="{ 'border-red-500': errors.address }"></textarea>
                                        <p v-if="errors.address" class="mt-2 text-sm text-red-600">
                                            {{ errors.address }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-5">
                        <div class="flex justify-end">
                            <button type="button"
                                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                @click="resetForm">
                                Cancel
                            </button>
                            <button type="submit" :disabled="isLoading"
                                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                :class="{ 'opacity-75 cursor-not-allowed': isLoading }">
                                <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useNotification } from '@/composables/useNotification';
import { useFormValidation } from '@/composables/useFormValidation';

const { user, updateProfile } = useAuth();
const notification = useNotification();

const formData = ref({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    avatar: ''
});

const { errors, validate } = useFormValidation(formData.value, {
    fullName: ['required', 'min:3'],
    email: ['required', 'email'],
    phone: ['required', 'phone'],
    address: ['required', 'min:10']
});

const isLoading = ref(false);

onMounted(() => {
    if (user.value) {
        formData.value = {
            fullName: user.value.fullName,
            email: user.value.email,
            phone: user.value.phone,
            address: user.value.address,
            avatar: user.value.avatar
        };
    }
});

const handleSubmit = async () => {
    if (!validate()) return;

    try {
        isLoading.value = true;
        await updateProfile(formData.value);
        notification.success('Profile updated successfully');
    } catch (error) {
        notification.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
        isLoading.value = false;
    }
};

const resetForm = () => {
    if (user.value) {
        formData.value = {
            fullName: user.value.fullName,
            email: user.value.email,
            phone: user.value.phone,
            address: user.value.address,
            avatar: user.value.avatar
        };
    }
};
</script>