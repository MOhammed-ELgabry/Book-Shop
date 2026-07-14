import { useAuthStore } from "../../store/auth";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const user = useAuthStore((s) => s.user);
;
  if (!user) return <Navigate to="/login" />;

  if (user.accountType !== "admin") {
    return <Navigate to="/" />;
    
  }

  return children;
}