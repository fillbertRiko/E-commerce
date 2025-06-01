<script setup>
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = ref({});
const isSubmitting = ref(false);
const submitSuccess = ref(false);

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.value.name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!formData.value.email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    newErrors.email = 'Please enter a valid email address';
  }
  
  if (!formData.value.subject.trim()) {
    newErrors.subject = 'Subject is required';
  }
  
  if (!formData.value.message.trim()) {
    newErrors.message = 'Message is required';
  }
  
  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  
  try {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    submitSuccess.value = true;
    formData.value = { name: '', email: '', subject: '', message: '' };
  } catch (error) {
    errors.value.submit = 'Failed to send message. Please try again later.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="bg-white">
    <div class="relative bg-primary-800">
      <div class="absolute inset-0">
        <img class="w-full h-full object-cover" src="https://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=60&&sat=-100" alt="Hỗ trợ khách hàng">
        <div class="absolute inset-0 bg-primary-800 mix-blend-multiply" aria-hidden="true"></div>
      </div>
      <div class="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Liên hệ với chúng tôi</h1>
        <p class="mt-6 text-xl text-primary-100 max-w-3xl">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy cho chúng tôi biết làm thế nào để giúp đỡ bạn tốt nhất.
        </p>
      </div>
    </div>

    <!-- Contact section -->
    <div class="relative bg-white">
      <div class="absolute inset-0">
        <div class="absolute inset-y-0 left-0 w-1/2 bg-gray-50"></div>
      </div>
      <div class="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
        <div class="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div class="max-w-lg mx-auto">
            <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Thông tin liên hệ
            </h2>
            <p class="mt-3 text-lg leading-6 text-gray-500">
              Bạn có thể liên hệ với chúng tôi qua các kênh sau:
            </p>
            <dl class="mt-8 text-base text-gray-500">
              <div>
                <dt class="sr-only">Địa chỉ</dt>
                <dd>
                  <p>123 Đường Nguyễn Huệ</p>
                  <p>Quận 1, TP.HCM</p>
                </dd>
              </div>
              <div class="mt-6">
                <dt class="sr-only">Số điện thoại</dt>
                <dd class="flex">
                  <svg class="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span class="ml-3">
                    +84 (28) 1234-5678
                  </span>
                </dd>
              </div>
              <div class="mt-3">
                <dt class="sr-only">Email</dt>
                <dd class="flex">
                  <svg class="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="ml-3">
                    support@eshop.vn
                  </span>
                </dd>
              </div>
            </dl>
            <p class="mt-6 text-base text-gray-500">
              Thời gian làm việc:
              <br>
              <span class="mt-1 block">Thứ 2 - Thứ 6: 8:30 - 17:30</span>
              <span class="block">Thứ 7: 8:30 - 12:00</span>
            </p>
          </div>
        </div>
        <div class="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
          <div class="max-w-lg mx-auto lg:max-w-none">
            <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-y-6">
              <div>
                <label for="full-name" class="sr-only">Họ và tên</label>
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autocomplete="name"
                  v-model="formData.name"
                  :class="['block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md', { 'form-control-error': errors.name }]"
                  placeholder="Họ và tên"
                >
                <p v-if="errors.name" class="form-error-message">{{ errors.name }}</p>
              </div>
              <div>
                <label for="email" class="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  v-model="formData.email"
                  :class="['block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md', { 'form-control-error': errors.email }]"
                  placeholder="Email"
                >
                <p v-if="errors.email" class="form-error-message">{{ errors.email }}</p>
              </div>
              <div>
                <label for="phone" class="sr-only">Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autocomplete="tel"
                  v-model="formData.subject"
                  :class="['block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md', { 'form-control-error': errors.subject }]"
                  placeholder="Số điện thoại"
                >
                <p v-if="errors.subject" class="form-error-message">{{ errors.subject }}</p>
              </div>
              <div>
                <label for="message" class="sr-only">Nội dung</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  v-model="formData.message"
                  :class="['block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 border-gray-300 rounded-md', { 'form-control-error': errors.message }]"
                  placeholder="Nội dung tin nhắn"
                ></textarea>
                <p v-if="errors.message" class="form-error-message">{{ errors.message }}</p>
              </div>
              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
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
                  {{ isSubmitting ? 'Sending...' : 'Gửi tin nhắn' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 