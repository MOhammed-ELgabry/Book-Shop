
// import axios from "axios";
// import { useAuthStore } from "../store/auth";

// const api = axios.create({
//  baseURL: `${import.meta.env.VITE_API_URL}/api`,
// });

// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   console.log("[API] Request to:", config.url, "Token exists:", !!token);
//   return config;
// });

// export default api;
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
    console.log(
      "[API]",
      config.method?.toUpperCase(),
      config.url,
      "| token:",
      !!token
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;