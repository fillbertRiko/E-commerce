import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Home from '@/views/Home.vue';
import Register from '@/views/Auth/Register.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // Auth routes
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/Auth/forgot-password.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('@/views/Auth/reset-password.vue'),
    meta: { requiresGuest: true }
  },
  // User routes
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/User/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/User/Orders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orders/:id',
    name: 'order-detail',
    component: () => import('@/views/User/order-detail.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('@/views/User/Wishlist.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/addresses',
    name: 'addresses',
    component: () => import('@/views/User/Addresses.vue'),
    meta: { requiresAuth: true }
  },
  // Shop routes
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/Products/product-list.vue')
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('@/views/Products/product-detail.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('@/views/Categories/category-list.vue')
  },
  {
    path: '/categories/:id',
    name: 'category-products',
    component: () => import('@/views/Categories/category-products.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Cart/cart-view.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/Cart/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  // Admin routes
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/Dashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('@/views/admin/Products/product-list.vue')
      },
      {
        path: 'products/create',
        name: 'admin-products-create',
        component: () => import('@/views/admin/Products/product-form.vue')
      },
      {
        path: 'products/:id/edit',
        name: 'admin-products-edit',
        component: () => import('@/views/admin/Products/product-form.vue')
      },
      {
        path: 'categories',
        name: 'admin-categories',
        component: () => import('@/views/admin/categories/category-list.vue')
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('@/views/admin/Orders/order-list.vue')
      },
      {
        path: 'orders/:id',
        name: 'admin-order-detail',
        component: () => import('@/views/admin/Orders/order-detail.vue')
      },
      {
        path: 'customers',
        name: 'admin-customers',
        component: () => import('@/views/admin/Customers/customer-list.vue')
      },
      {
        path: 'customers/:id',
        name: 'admin-customer-detail',
        component: () => import('@/views/admin/Customers/customer-detail.vue')
      }
    ]
  },
  // Static pages
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/Contact.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/FAQ.vue')
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('@/views/Privacy.vue')
  },
  {
    path: '/returns',
    name: 'returns',
    component: () => import('@/views/Returns.vue')
  },
  {
    path: '/shipping',
    name: 'shipping',
    component: () => import('@/views/Shipping.vue')
  },
  // Error pages
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/errors/not-found.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  // Nếu route yêu cầu authentication
  if (requiresAuth) {
    if (!authStore.isAuthenticated) {
      // Redirect to login với return url
      return next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    }

    // Kiểm tra quyền admin nếu cần
    if (requiresAdmin && !authStore.isAdmin) {
      return next({ name: 'home' });
    }
  }

  // Nếu route yêu cầu guest (như login/register) và user đã đăng nhập
  if (requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'home' });
  }

  next();
});

export default router;