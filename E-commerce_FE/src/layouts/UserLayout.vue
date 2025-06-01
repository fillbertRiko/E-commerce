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

const userNavigation = [
  { name: 'Thông tin tài khoản', to: '/account' },
  { name: 'Đơn hàng của tôi', to: '/account/orders' },
  { name: 'Địa chỉ', to: '/account/addresses' },
  { name: 'Yêu thích', to: '/account/wishlist' },
  { name: 'Đánh giá của tôi', to: '/account/reviews' },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header with User Menu -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <TheHeader />
          
          <!-- User Menu -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="relative ml-3">
              <div>
                <button
                  type="button"
                  class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <span class="sr-only">Mở menu người dùng</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  >
                </button>
              </div>
              <div
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
              >
                <RouterLink
                  v-for="item in userNavigation"
                  :key="item.name"
                  :to="item.to"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {{ item.name }}
                </RouterLink>
                <button
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
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