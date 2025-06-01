import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import Home from '../views/Home.vue';
import Register from '../views/Auth/Register.vue';

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
    component: () => import('../views/Auth/Login.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/Auth/ForgotPassword.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('../views/Auth/ResetPassword.vue'),
    meta: { requiresGuest: true }
  },
  // User routes
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/User/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/User/Orders.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('../views/User/Wishlist.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/addresses',
    name: 'addresses',
    component: () => import('../views/User/Addresses.vue'),
    meta: { requiresAuth: true }
  },
  // Shop routes
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products/ProductList.vue')
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('../views/Products/ProductDetail.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/Categories/CategoryList.vue')
  },
  {
    path: '/categories/:id',
    name: 'category-products',
    component: () => import('../views/Categories/CategoryProducts.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/Cart/CartView.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/Cart/Checkout.vue'),
    meta: { requiresAuth: true }
  },
  // Admin routes
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin/Dashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'products',
        name: 'admin-products',
        component: () => import('../views/Admin/Products/ProductList.vue')
      },
      {
        path: 'products/create',
        name: 'admin-products-create',
        component: () => import('../views/Admin/Products/ProductForm.vue')
      },
      {
        path: 'products/:id/edit',
        name: 'admin-products-edit',
        component: () => import('../views/Admin/Products/ProductForm.vue')
      },
      {
        path: 'categories',
        name: 'admin-categories',
        component: () => import('../views/Admin/Categories/CategoryList.vue')
      },
      {
        path: 'orders',
        name: 'admin-orders',
        component: () => import('../views/Admin/Orders/OrderList.vue')
      },
      {
        path: 'customers',
        name: 'admin-customers',
        component: () => import('../views/Admin/Customers/CustomerList.vue')
      }
    ]
  },
  // Static pages
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/FAQ.vue')
  },
  // Error pages
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/errors/NotFound.vue')
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