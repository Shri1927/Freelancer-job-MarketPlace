// store/auth.js
import { create } from 'zustand';
import api from '../lib/api';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,

  setUser: (user) => {
    set({ user });
    // Store user info in localStorage for persistence
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        userType: user.role, // DashboardRouter looks for userType
        avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
      }));
    } else {
      localStorage.removeItem('userInfo');
    }
  },

  signUp: async (email, password, name, role) => {
    set({ loading: true });
    try {
      console.log('Auth store: Signing up user', { email, name, role });
      
      const response = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation: password,
        role
      });
      
      const { token, user } = response.data;
      
      // Store token
      localStorage.setItem('auth_token', token);
      
      // Format user data
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
      };
      
      set({ user: userData, loading: false });
      localStorage.setItem('userInfo', JSON.stringify({
        ...userData,
        userType: user.role
      }));
      
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('Auth store error:', error);
      set({ loading: false });
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  },

  signIn: async (email, password) => {
    set({ loading: true });
    try {
      console.log('Auth store: Signing in user', { email });
      
      const response = await api.post('/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Store token
      localStorage.setItem('auth_token', token);
      
      // Format user data
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
      };
      
      set({ user: userData, loading: false });
      localStorage.setItem('userInfo', JSON.stringify({
        ...userData,
        userType: user.role
      }));
      
      return { success: true, user: userData };
      
    } catch (error) {
      console.error('Auth store error:', error);
      set({ loading: false });
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      return { 
        success: false, 
        error: errorMessage
      };
    }
  },

  signOut: async () => {
    try {
      // Call logout API if token exists
      const token = localStorage.getItem('auth_token');
      if (token) {
        await api.post('/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null });
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userInfo');
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return false;
    }

    try {
      const response = await api.get('/me');
      const user = response.data;
      
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`
      };
      
      set({ user: userData });
      localStorage.setItem('userInfo', JSON.stringify({
        ...userData,
        userType: user.role
      }));
      
      return true;
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userInfo');
      set({ user: null });
      return false;
    }
  },

  signInWithGoogle: async () => {
    // Implement Google sign-in
    return { success: false, error: 'Google sign-in not implemented' };
  },

  signInWithFacebook: async () => {
    // Implement Facebook sign-in
    return { success: false, error: 'Facebook sign-in not implemented' };
  }
}));