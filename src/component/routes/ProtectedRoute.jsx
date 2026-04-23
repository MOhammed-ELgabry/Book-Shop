// src/component/routes/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export default function ProtectedRoute({ children }) {
  const { token, hydrated } = useAuthStore();

  if (!hydrated) return null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}