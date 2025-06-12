<template>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 sm:px-0 flex justify-between items-center">
            <h1 class="text-2xl font-semibold text-gray-900">My Addresses</h1>
            <button @click="openAddressModal()"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Add New Address
            </button>
        </div>

        <div class="mt-8">
            <!-- Loading state -->
            <div v-if="loading" class="text-center">
                <div class="spinner"></div>
                <p class="mt-2 text-gray-600">Loading your addresses...</p>
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
                        <h3 class="text-sm font-medium text-red-800">Error loading addresses</h3>
                        <p class="mt-2 text-sm text-red-700">{{ error }}</p>
                    </div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else-if="!addresses.length" class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No addresses</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by adding a new address.</p>
                <div class="mt-6">
                    <button @click="openAddressModal()"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Add Address
                    </button>
                </div>
            </div>

            <!-- Address list -->
            <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="address in addresses" :key="address.id"
                    class="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900">
                                {{ address.name }}
                                <span v-if="address.is_default"
                                    class="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Default
                                </span>
                            </h3>
                            <p class="mt-1 text-sm text-gray-500">{{ address.phone }}</p>
                        </div>
                        <div class="flex space-x-2">
                            <button @click="openAddressModal(address)"
                                class="text-gray-400 hover:text-gray-500 focus:outline-none">
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                            <button v-if="!address.is_default" @click="deleteAddress(address.id)"
                                class="text-gray-400 hover:text-red-500 focus:outline-none">
                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-sm text-gray-500">{{ formatAddress(address) }}</p>
                    </div>
                    <div v-if="!address.is_default" class="mt-4">
                        <button @click="setDefaultAddress(address.id)"
                            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                            Set as Default
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Address Modal -->
        <BaseModal v-if="showAddressModal" @close="closeAddressModal">
            <template #title>
                {{ editingAddress ? 'Edit Address' : 'Add New Address' }}
            </template>
            <template #content>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" id="name" v-model="addressForm.name"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            :class="{ 'border-red-500': formErrors.name }">
                        <p v-if="formErrors.name" class="mt-1 text-sm text-red-600">{{ formErrors.name }}</p>
                    </div>

                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" id="phone" v-model="addressForm.phone"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            :class="{ 'border-red-500': formErrors.phone }">
                        <p v-if="formErrors.phone" class="mt-1 text-sm text-red-600">{{ formErrors.phone }}</p>
                    </div>

                    <div>
                        <label for="street" class="block text-sm font-medium text-gray-700">Street Address</label>
                        <input type="text" id="street" v-model="addressForm.street"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                            :class="{ 'border-red-500': formErrors.street }">
                        <p v-if="formErrors.street" class="mt-1 text-sm text-red-600">{{ formErrors.street }}</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                            <input type="text" id="city" v-model="addressForm.city"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                :class="{ 'border-red-500': formErrors.city }">
                            <p v-if="formErrors.city" class="mt-1 text-sm text-red-600">{{ formErrors.city }}</p>
                        </div>

                        <div>
                            <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                            <input type="text" id="state" v-model="addressForm.state"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                :class="{ 'border-red-500': formErrors.state }">
                            <p v-if="formErrors.state" class="mt-1 text-sm text-red-600">{{ formErrors.state }}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="postal_code" class="block text-sm font-medium text-gray-700">Postal Code</label>
                            <input type="text" id="postal_code" v-model="addressForm.postal_code"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                :class="{ 'border-red-500': formErrors.postal_code }">
                            <p v-if="formErrors.postal_code" class="mt-1 text-sm text-red-600">{{ formErrors.postal_code
                                }}</p>
                        </div>

                        <div>
                            <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                            <input type="text" id="country" v-model="addressForm.country"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                :class="{ 'border-red-500': formErrors.country }">
                            <p v-if="formErrors.country" class="mt-1 text-sm text-red-600">{{ formErrors.country }}</p>
                        </div>
                    </div>

                    <div class="flex items-center">
                        <input type="checkbox" id="is_default" v-model="addressForm.is_default"
                            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
                        <label for="is_default" class="ml-2 block text-sm text-gray-900">
                            Set as default address
                        </label>
                    </div>
                </form>
            </template>
            <template #footer>
                <div class="flex justify-end space-x-3">
                    <button @click="closeAddressModal"
                        class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Cancel
                    </button>
                    <button @click="handleSubmit" :disabled="isSubmitting"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        {{ editingAddress ? 'Update' : 'Add' }}
                    </button>
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useAddressStore } from '@/stores/address';
import { useNotification } from '@/composables/useNotification';
import BaseModal from '@/components/base/BaseModal.vue';

const addressStore = useAddressStore();
const notification = useNotification();

const addresses = ref([]);
const loading = ref(true);
const error = ref(null);
const showAddressModal = ref(false);
const editingAddress = ref(null);
const isSubmitting = ref(false);
const formErrors = ref({});

const addressForm = reactive({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    is_default: false
});

const resetForm = () => {
    Object.keys(addressForm).forEach(key => {
        addressForm[key] = '';
    });
    addressForm.is_default = false;
    formErrors.value = {};
};

const openAddressModal = (address = null) => {
    if (address) {
        editingAddress.value = address;
        Object.keys(addressForm).forEach(key => {
            addressForm[key] = address[key];
        });
    } else {
        editingAddress.value = null;
        resetForm();
    }
    showAddressModal.value = true;
};

const closeAddressModal = () => {
    showAddressModal.value = false;
    resetForm();
};

const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.state} ${address.postal_code}, ${address.country}`;
};

const validateForm = () => {
    const errors = {};
    if (!addressForm.name) errors.name = 'Name is required';
    if (!addressForm.phone) errors.phone = 'Phone number is required';
    if (!addressForm.street) errors.street = 'Street address is required';
    if (!addressForm.city) errors.city = 'City is required';
    if (!addressForm.state) errors.state = 'State is required';
    if (!addressForm.postal_code) errors.postal_code = 'Postal code is required';
    if (!addressForm.country) errors.country = 'Country is required';

    formErrors.value = errors;
    return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
        isSubmitting.value = true;
        if (editingAddress.value) {
            await addressStore.updateAddress(editingAddress.value.id, addressForm);
            notification.success('Address updated successfully');
        } else {
            await addressStore.addAddress(addressForm);
            notification.success('Address added successfully');
        }
        await fetchAddresses();
        closeAddressModal();
    } catch (err) {
        notification.error(err.message);
    } finally {
        isSubmitting.value = false;
    }
};

const deleteAddress = async (id) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
        await addressStore.deleteAddress(id);
        await fetchAddresses();
        notification.success('Address deleted successfully');
    } catch (err) {
        notification.error(err.message);
    }
};

const setDefaultAddress = async (id) => {
    try {
        await addressStore.setDefaultAddress(id);
        await fetchAddresses();
        notification.success('Default address updated');
    } catch (err) {
        notification.error(err.message);
    }
};

const fetchAddresses = async () => {
    try {
        loading.value = true;
        addresses.value = await addressStore.fetchAddresses();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchAddresses);
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