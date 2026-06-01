import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export default function SellerProtectedRoute({
  children,
}) {
  const { token, hydrated, user } =
    useAuthStore();

  // ======================
  // WAIT HYDRATION
  // ======================
  if (!hydrated) return null;

  // ======================
  // NO LOGIN
  // ======================
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ======================
  // NOT SELLER
  // ======================
  if (
    user?.role !== "seller" &&
    user?.role !== "admin"
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}