import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

export default function SellerRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const type = user?.accountType?.toLowerCase();

  if (type !== "seller" && type !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}