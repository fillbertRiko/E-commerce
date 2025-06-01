import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from './useNotification';
import { useErrorHandler } from './useErrorHandler';

export const useAuth = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const notification = useNotification();
  const { withErrorHandler } = useErrorHandler();

  // Computed properties
  const user = computed(() => authStore.user);
  const isAuthenticated = computed(() => authStore.isAuthenticated);
  const isAdmin = computed(() => authStore.isAdmin);
  const isLoading = computed(() => authStore.loading);

  // Login
  const login = async (credentials) => {
    return withErrorHandler(async () => {
      await authStore.login(credentials);
      notification.success('Welcome back!');
      router.push('/');
    });
  };

  // Register
  const register = async (userData) => {
    return withErrorHandler(async () => {
      await authStore.register(userData);
      notification.success('Registration successful! Welcome!');
      router.push('/');
    });
  };

  // Logout
  const logout = async () => {
    return withErrorHandler(async () => {
      await authStore.logout();
      notification.success('You have been logged out.');
      router.push('/login');
    });
  };

  // Update profile
  const updateProfile = async (profileData) => {
    return withErrorHandler(async () => {
      await authStore.updateProfile(profileData);
      notification.success('Profile updated successfully.');
    });
  };

  // Initialize auth state
  const initializeAuth = async () => {
    return withErrorHandler(async () => {
      await authStore.initialize();
    });
  };

  // Check if user has required role
  const hasRole = (role) => {
    return user.value?.role === role;
  };

  // Check if user has required permission
  const hasPermission = (permission) => {
    return user.value?.permissions?.includes(permission);
  };

  // Require authentication
  const requireAuth = async (to, from, next) => {
    if (!isAuthenticated.value) {
      notification.warning('Please login to continue.');
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  };

  // Require guest
  const requireGuest = (to, from, next) => {
    if (isAuthenticated.value) {
      next('/');
    } else {
      next();
    }
  };

  // Require role
  const requireRole = (role) => {
    return (to, from, next) => {
      if (!isAuthenticated.value) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        });
      } else if (!hasRole(role)) {
        notification.error('You do not have permission to access this page.');
        next('/');
      } else {
        next();
      }
    };
  };

  return {
    // State
    user,
    isAuthenticated,
    isAdmin,
    isLoading,

    // Methods
    login,
    register,
    logout,
    updateProfile,
    initializeAuth,
    hasRole,
    hasPermission,

    // Route guards
    requireAuth,
    requireGuest,
    requireRole
  };
}; 