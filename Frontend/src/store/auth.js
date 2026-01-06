// store/auth.js - Basic version for testing
import { create } from 'zustand';

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
        avatar: user.avatar
      }));
    } else {
      localStorage.removeItem('userInfo');
    }
  },

  signUp: async (email, password, name, role) => {
    try {
      console.log('Auth store: Signing up user', { email, name, role });
      
      // Simulate API call - replace this with your actual authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      const user = {
        id: 'user-' + Date.now(),
        email,
        name,
        role,
        avatar: `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`
      };
      
      set({ user });
      localStorage.setItem('userInfo', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        userType: user.role,
        avatar: user.avatar
      }));
      
      return { success: true, user };
      
    } catch (error) {
      console.error('Auth store error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    }
  },

  signInWithGoogle: async () => {
    // Implement Google sign-in
    return { success: false, error: 'Google sign-in not implemented' };
  },

  signInWithFacebook: async () => {
    // Implement Facebook sign-in
    return { success: false, error: 'Facebook sign-in not implemented' };
  },

  signOut: () => {
    set({ user: null });
    localStorage.removeItem('userInfo');
  }
}));