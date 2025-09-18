import { create } from "zustand";
import { login, getProfile } from "../utils/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("access") || null,

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
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
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
