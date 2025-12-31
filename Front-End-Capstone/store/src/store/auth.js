import { create } from "zustand";
import { login, getProfile } from "../utils/api";

export const useAuthStore = create((set) => ({
  user: null,
  // Safe check for localStorage during initial load
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
      localStorage.removeItem("refresh");
    }
    set({ user: null, token: null });
  },

  fetchProfile: async () => {
    try {
      const profile = await getProfile();
      set({ user: profile });
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  },
}));