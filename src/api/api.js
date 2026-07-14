

import axios from "axios";
import { useAuthStore } from "../store/auth";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

// ======================
// REQUEST INTERCEPTOR
// ======================
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // optional debug (شيله في production)
   

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;