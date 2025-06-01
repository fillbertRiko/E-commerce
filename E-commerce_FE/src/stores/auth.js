import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authService } from '@/services/auth';
import { STORAGE_KEYS } from '@/utils/constants';

export const useAuthStore = defineStore('auth', () => {
    // State
    const user = ref(null);
    const token = ref(localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN));
    const loading = ref(false);
    const error = ref(null);

    // Getters
    const isAuthenticated = computed(() => !!token.value);
    const isAdmin = computed(() => user.value?.role === 'admin');

    // Actions
    const setUser = (userData) => {
        user.value = userData;
    };

    const setToken = (tokenValue) => {
        token.value = tokenValue;
        if (tokenValue) {
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, tokenValue);
        } else {
            localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        }
    };

    const login = async (credentials) => {
        try {
            loading.value = true;
            error.value = null;
            const response = await authService.login(credentials);
            setToken(response.token);
            setUser(response.user);
            return response;
        } catch (err) {
            error.value = err.response?.data?.message || 'Login failed';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const register = async (userData) => {
        try {
            loading.value = true;
            error.value = null;
            const response = await authService.register(userData);
            setToken(response.token);
            setUser(response.user);
            return response;
        } catch (err) {
            error.value = err.response?.data?.message || 'Registration failed';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const logout = async () => {
        try {
            loading.value = true;
            error.value = null;
            await authService.logout();
            clearAuth();
        } catch (err) {
            error.value = err.response?.data?.message || 'Logout failed';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const fetchUser = async () => {
        try {
            loading.value = true;
            error.value = null;
            const response = await authService.getUser();
            setUser(response.user);
            return response;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to fetch user';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const updateProfile = async (profileData) => {
        try {
            loading.value = true;
            error.value = null;
            const response = await authService.updateProfile(profileData);
            setUser(response.user);
            return response;
        } catch (err) {
            error.value = err.response?.data?.message || 'Failed to update profile';
            throw err;
        } finally {
            loading.value = false;
        }
    };

    const clearAuth = () => {
        setUser(null);
        setToken(null);
        error.value = null;
    };

    // Initialize
    const initialize = async () => {
        if (token.value && !user.value) {
            try {
                await fetchUser();
            } catch (err) {
                clearAuth();
            }
        }
    };

    return {
        // State
        user,
        token,
        loading,
        error,

        // Getters
        isAuthenticated,
        isAdmin,

        // Actions
        login,
        register,
        logout,
        fetchUser,
        updateProfile,
        clearAuth,
        initialize
    };
});