<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue';

const isSidebarOpen = ref(true);

const adminNavigation = [
  { name: 'Tổng quan', to: '/admin', icon: 'dashboard' },
  { name: 'Sản phẩm', to: '/admin/products', icon: 'shopping-bag' },
  { name: 'Đơn hàng', to: '/admin/orders', icon: 'shopping-cart' },
  { name: 'Khách hàng', to: '/admin/customers', icon: 'users' },
  { name: 'Danh mục', to: '/admin/categories', icon: 'folder' },
  { name: 'Khuyến mãi', to: '/admin/promotions', icon: 'gift' },
  { name: 'Báo cáo', to: '/admin/reports', icon: 'chart-bar' },
  { name: 'Cài đặt', to: '/admin/settings', icon: 'cog' },
];

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Admin Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out',
        { '-translate-x-full': !isSidebarOpen }
      ]"
    >
      <div class="flex items-center justify-between h-16 px-4 bg-gray-900">
        <RouterLink to="/admin" class="text-xl font-bold text-white">
          Admin Panel
        </RouterLink>
        <button
          class="p-1 text-gray-400 hover:text-white lg:hidden"
          @click="toggleSidebar"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav class="mt-5 px-2">
        <RouterLink
          v-for="item in adminNavigation"
          :key="item.name"
          :to="item.to"
          class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <span class="truncate">{{ item.name }}</span>
        </RouterLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div :class="['lg:pl-64', { 'pl-0': !isSidebarOpen }]">
      <!-- Top Navigation -->
      <header class="bg-white shadow">
        <div class="flex items-center justify-between h-16 px-4">
          <button
            class="p-1 text-gray-400 hover:text-gray-500 lg:hidden"
            @click="toggleSidebar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div class="flex items-center">
            <button class="flex items-center text-sm text-gray-700 hover:text-gray-900">
              <span class="mr-2">Admin</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template> 