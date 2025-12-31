import { create } from "zustand";
import { login, getProfile } from "../utils/api";

export const useAuthStore = create((set) => ({
  user: null,
  // Safely access localStorage only in the browser
  token: typeof window !== "undefined" ? localStorage.getItem("access") : null,

  login: async (username, password) => {
    try {
      const { access } = await login({ username, password });
      set({ token: access });
      if (typeof window !== "undefined") {
        localStorage.setItem("access", access);
      }
      const profile = await getProfile();
      set({ user: profile });
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access");
    }
    set({ user: null, token: null });
  },
}));