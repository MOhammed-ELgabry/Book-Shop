import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGoogleRedirectResult } from "../auth/googleAuth";
import { useAuthStore } from "../store/auth";
import Swal from "sweetalert2";

export default function GoogleRedirectHandler() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processRedirect = async () => {
      try {
        const result = await handleGoogleRedirectResult(navigate, setUser);
        
        if (result) {
          Swal.fire({
            icon: "success",
            title: "Login Success",
            timer: 1500,
            showConfirmButton: false,
          });
          navigate("/");
        } else {
          // لم يتم العودة من Google بعد، ننتظر قليلاً ثم نعيد التوجيه للصفحة الرئيسية
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } catch (err) {
        console.error(err);
        setError("Google login failed. Please try again.");
        Swal.fire("Error", "Google login failed", "error");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    processRedirect();
  }, [navigate, setUser]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl font-semibold">Processing Google login...</div>
    </div>
  );
}