<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';

const route = useRoute();

const showSidebar = computed(() => {
  return route.path.includes('/products') || route.path.includes('/categories');
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <TheHeader />
          
          <!-- Auth Buttons -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <RouterLink
              to="/login"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100"
            >
              Đăng nhập
            </RouterLink>
            <RouterLink
              to="/register"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Đăng ký
            </RouterLink>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar for Product Pages -->
      <TheSidebar v-if="showSidebar" class="w-64 hidden lg:block" />

      <!-- Main Content -->
      <main :class="['flex-1 p-6', { 'lg:ml-64': showSidebar }]">
        <RouterView />
      </main>
    </div>

    <TheFooter />
  </div>
</template> 