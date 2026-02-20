import { create } from 'zustand';
import { apiFetch } from '@/lib/apiClient';

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('userInfo', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        userType: user.role,
        avatar: user.avatar,
      }));
    } else {
      localStorage.removeItem('userInfo');
    }
  },

  signUp: async (email, password, name, role) => {
    try {
      const data = await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: password,
          role,
        }),
      });

      const token = data.token;
      const user = data.user;

      if (token) {
        localStorage.setItem('authToken', token);
      }

      set({ user });
      localStorage.setItem('userInfo', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        userType: user.role,
        avatar: user.avatar,
      }));

      return { success: true, user };
    } catch (error) {
      console.error('Auth store signUp error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    }
  },

  signIn: async (email, password) => {
    try {
      const data = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const token = data.token;
      const user = data.user;

      if (token) {
        localStorage.setItem('authToken', token);
      }

      set({ user });
      localStorage.setItem('userInfo', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        userType: user.role,
        avatar: user.avatar,
      }));

      return { success: true, user };
    } catch (error) {
      console.error('Auth store signIn error:', error);
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    }
  },

  signInWithGoogle: async () => {
    return { success: false, error: 'Google sign-in not implemented' };
  },

  signInWithFacebook: async () => {
    return { success: false, error: 'Facebook sign-in not implemented' };
  },

  signOut: async () => {
    try {
      await apiFetch('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error (ignored):', error);
    }

    set({ user: null });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('authToken');
  },
}));