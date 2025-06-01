<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AdminLayout from '@/layouts/AdminLayout.vue';
import UserLayout from '@/layouts/UserLayout.vue';
import GuestLayout from '@/layouts/GuestLayout.vue';
import NotificationContainer from '@/components/NotificationContainer.vue';

const route = useRoute();
const authStore = useAuthStore();

// Khởi tạo authentication khi app khởi động
onMounted(async () => {
  await authStore.initializeAuth();
});

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);

const currentLayout = computed(() => {
  // Nếu đường dẫn bắt đầu bằng /admin và user là admin, sử dụng AdminLayout
  if (route.path.startsWith('/admin') && isAdmin.value) {
    return AdminLayout;
  }

  // Nếu người dùng đã đăng nhập, sử dụng UserLayout
  if (isAuthenticated.value) {
    return UserLayout;
  }

  // Mặc định sử dụng GuestLayout
  return GuestLayout;
});
</script>

<template>
  <component :is="currentLayout">
    <router-view />
  </component>
  <NotificationContainer />
</template>

<style>
@import '@/assets/main.css';
</style>