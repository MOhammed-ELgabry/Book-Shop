
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../api/api";
import { useAuthStore } from "../store/auth";

export default function GoogleCallback() {
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const loginWithGoogle = async () => {
      try {
        // 🔥 jwt الحقيقي من سترابي
        const jwt = params.get("access_token");

        

        if (!jwt) {
          navigate("/login");
          return;
        }

        // 🔥 هات بيانات اليوزر الحقيقي
        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });

        const user = res.data;

        

        // 🔥 خزّن اليوزر الحقيقي + jwt
        setUser(user, jwt);

        Swal.fire({
          icon: "success",
          title: "Login Success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      } catch (err)  {
       

        Swal.fire({
    icon: "error",
    title: "Google Login Failed",
    text:
      err.response?.data?.error?.message ||
      err.message ||
      "Unable to sign in with Google.",
    confirmButtonColor: "#f97316",
  });

        navigate("/login");
      }
    };

    loginWithGoogle();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      Logging in with Google...
    </div>
  );
}