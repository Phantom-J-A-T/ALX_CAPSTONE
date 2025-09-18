import { create } from "zustand";
import API from "./api"; 

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  login: async (username, password) => {
    try {
      const res = await api.post("/token/", { username, password });
      const token = res.data.access;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Decode token payload to get is_staff flag
      const payload = JSON.parse(atob(token.split(".")[1]));
      set({ user: { username: payload.username, is_staff: payload.is_staff }, token });
    } catch (err) {
      throw new Error("Invalid credentials");
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
    delete api.defaults.headers.common["Authorization"];
  },
}));
