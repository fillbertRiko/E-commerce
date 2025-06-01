import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Profile.vue'),
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router; 