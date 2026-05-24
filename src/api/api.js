
import axios from "axios";
import { useAuthStore } from "../store/auth";

const api = axios.create({
  baseURL: "http://localhost:1337/api",
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("[API] Request to:", config.url, "Token exists:", !!token);
  return config;
});

export default api;