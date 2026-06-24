// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useAuthStore } from "../store/auth";
// import { useCartStore } from "../store/CartStore";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();

//   const user = useAuthStore((s) => s.user);
//   const clearCart = useCartStore((s) => s.clearCart);

// useEffect(() => {
//   const completePayment = async () => {
//     if (user) {
//       await clearCart(user);
//     }

//     Swal.fire({
//       icon: "success",
//       title: "Payment Successful 🎉",
//       text: "Your order is being processed",
//       timer: 2000,
//       showConfirmButton: false,
//     });

//     setTimeout(() => {
//       navigate("/cart", { replace: true });
//     }, 2000);
//   };

//   completePayment();
// }, [navigate, user, clearCart]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <h1 className="text-4xl font-bold text-green-600">
//         Payment Successful 🎉
//       </h1>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/auth";
import { useCartStore } from "../store/CartStore";
import api from "../api/api"; // عدل المسار لو ملف api عندك في مكان مختلف

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const user = useAuthStore((s) => s.user);
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    const completePayment = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        if (!sessionId) {
          throw new Error("Session ID not found");
        }

        await api.post("/orders/confirm-payment", {
          sessionId,
        });

        if (user) {
          await clearCart(user);
        }

        Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          text: "Your order is being processed",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/cart", { replace: true });
        }, 2000);
      } catch (err) {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: "Could not confirm payment",
        });
      }
    };

    completePayment();
  }, [navigate, user, clearCart, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
    </div>
  );
}