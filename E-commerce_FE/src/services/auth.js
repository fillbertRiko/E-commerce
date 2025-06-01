import api, { endpoints } from './api';

export const authService = {
  async login(credentials) {
    // Get CSRF cookie first
    await api.get(endpoints.auth.csrf);
    
    const response = await api.post(endpoints.auth.login, credentials);
    return response.data;
  },

  async register(userData) {
    // Get CSRF cookie first
    await api.get(endpoints.auth.csrf);
    
    const response = await api.post(endpoints.auth.register, userData);
    return response.data;
  },

  async logout() {
    const response = await api.post(endpoints.auth.logout);
    return response.data;
  },

  async getUser() {
    const response = await api.get(endpoints.auth.user);
    return response.data;
  },

  async updateProfile(profileData) {
    const response = await api.patch(endpoints.user.updateProfile, profileData);
    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },

  async resetPassword(data) {
    const response = await api.post('/reset-password', data);
    return response.data;
  },

  async verifyEmail(token) {
    const response = await api.get(`/email/verify/${token}`);
    return response.data;
  },

  async resendVerificationEmail() {
    const response = await api.post('/email/verification-notification');
    return response.data;
  }
}; 