<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const email = ref('');
const isSubmitting = ref(false);
const error = ref('');
const successMessage = ref('');

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const handleSubmit = async () => {
  // Reset states
  error.value = '';
  successMessage.value = '';
  
  // Validate email
  if (!email.value.trim()) {
    error.value = 'Vui lòng nhập email';
    return;
  }
  
  if (!validateEmail(email.value)) {
    error.value = 'Vui lòng nhập địa chỉ email hợp lệ';
    return;
  }

  isSubmitting.value = true;

  try {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    successMessage.value = 'Nếu tài khoản tồn tại với email này, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.';
    email.value = ''; // Clear the form
  } catch (err) {
    error.value = 'Không thể xử lý yêu cầu của bạn. Vui lòng thử lại sau.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Đặt lại mật khẩu
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại mật khẩu.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Success Message -->
        <div v-if="successMessage" 
             class="mb-4 rounded-md bg-green-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-green-800">
                {{ successMessage }}
              </p>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" 
             class="mb-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-red-800">
                {{ error }}
              </p>
            </div>
          </div>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Địa chỉ email
            </label>
            <div class="mt-1">
              <input 
                id="email" 
                v-model="email"
                name="email" 
                type="email" 
                autocomplete="email" 
                required
                :disabled="isSubmitting"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
            </div>
          </div>

          <div>
            <button 
              type="submit"
              :disabled="isSubmitting"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
            >
              <svg 
                v-if="isSubmitting"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isSubmitting ? 'Đang gửi...' : 'Gửi hướng dẫn đặt lại' }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Hoặc
              </span>
            </div>
          </div>

          <div class="mt-6 flex flex-col space-y-4 items-center justify-center text-sm">
            <RouterLink 
              :to="{ name: 'login' }" 
              class="font-medium text-primary-600 hover:text-primary-500"
            >
              Quay lại đăng nhập
            </RouterLink>
            <RouterLink 
              :to="{ name: 'register' }" 
              class="font-medium text-gray-600 hover:text-gray-500"
            >
              Tạo tài khoản mới
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 