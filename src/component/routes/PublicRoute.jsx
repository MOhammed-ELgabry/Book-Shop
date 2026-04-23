// src/component/routes/PublicRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export default function PublicRoute({ children }) {
  const { token, hydrated } = useAuthStore();

  if (!hydrated) return null; // ممكن skeleton صغير لو حابب

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}