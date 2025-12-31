import { create } from "zustand";
import { login, getProfile } from "../utils/api";

// Helper to safely get the token
const getSafeToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("access") || null;
  }
  return null;
};

export const useAuthStore = create((set) => ({
  user: null,
  token: getSafeToken(), // Use the safe helper here

  login: async (username, password) => {
    try {
      const { access } = await login({ username, password });
      set({ token: access });
      localStorage.setItem("access", access);

      const profile = await getProfile();
      set({ user: profile });
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
    set({ user: null, token: null });
  },
  // ... rest of your code
}));