<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const isUserMenuOpen = ref(false);

const navigation = [
  { name: 'Home', to: '/' },
  { name: 'Products', to: '/products' },
  { name: 'Categories', to: '/categories' },
  { name: 'About', to: '/about' }
];

const userNavigation = [
  { name: 'Your Profile', to: '/profile' },
  { name: 'Orders', to: '/orders' },
  { name: 'Wishlist', to: '/wishlist' }
];

const toggleCart = () => {
  // Emit event to show cart sidebar
  emit('toggle-cart');
};

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<template>
  <header class="bg-white shadow">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center">
          <RouterLink to="/" class="text-2xl font-bold text-primary-600">
            E-Shop
          </RouterLink>
        </div>

        <!-- Navigation -->
        <div class="hidden md:flex md:items-center md:space-x-6">
          <RouterLink v-for="item in navigation" :key="item.name" :to="item.to"
            class="text-base font-medium text-gray-500 hover:text-gray-900">
            {{ item.name }}
          </RouterLink>
        </div>

        <!-- Right Section -->
        <div class="flex items-center space-x-6">
          <!-- Search -->
          <div class="flex lg:ml-6">
            <button class="p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Search</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          <!-- Cart -->
          <div class="flow-root">
            <button class="group -m-2 flex items-center p-2" @click="toggleCart">
              <svg class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                {{ cartStore.itemCount }}
              </span>
            </button>
          </div>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900">
              <img :src="authStore.user?.avatar || '/default-avatar.png'" alt="" class="h-8 w-8 rounded-full">
            </button>

            <!-- Dropdown menu -->
            <div v-if="isUserMenuOpen"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <RouterLink v-for="item in userNavigation" :key="item.name" :to="item.to"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="isUserMenuOpen = false">
                {{ item.name }}
              </RouterLink>
              <button @click="logout" class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                Sign out
              </button>
            </div>
          </div>

          <!-- Auth Buttons -->
          <div v-else class="hidden md:flex md:items-center md:space-x-6">
            <RouterLink to="/login" class="text-base font-medium text-gray-500 hover:text-gray-900">
              Sign in
            </RouterLink>
            <RouterLink to="/register"
              class="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white hover:bg-primary-700">
              Sign up
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>