import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  signIn: (email, role = 'freelancer') => set({ isAuthenticated: true, user: { id: 'u1', email, role, name: 'Demo User' } }),
  signOut: () => set({ isAuthenticated: false, user: null }),
}))



