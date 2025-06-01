<script setup>
import { RouterView, useRoute } from 'vue-router';
import { computed } from 'vue';
import TheHeader from '@/components/layout/TheHeader.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import TheSidebar from '@/components/layout/TheSidebar.vue';

const route = useRoute();

const showSidebar = computed(() => {
  // Chỉ hiển thị sidebar trong các trang liên quan đến sản phẩm
  return route.path.includes('/products') || route.path.includes('/categories');
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <TheHeader />

    <div class="flex">
      <!-- Sidebar -->
      <TheSidebar v-if="showSidebar" class="w-64 hidden lg:block" />

      <!-- Main Content -->
      <main :class="['flex-1 p-6', { 'lg:ml-64': showSidebar }]">
        <RouterView />
      </main>
    </div>

    <!-- Footer -->
    <TheFooter />
  </div>
</template> 