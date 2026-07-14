
// import { useEffect, useRef } from "react";
// import {
//   useNavigate,
//   useSearchParams,
//   Navigate,
// } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useAuthStore } from "../store/auth";
// import { useCartStore } from "../store/CartStore";
// import api from "../api/api";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const user = useAuthStore((s) => s.user);
//   const clearCart = useCartStore((s) => s.clearCart);

//   const sessionId = searchParams.get("session_id");

//   // Prevent running twice (React StrictMode)
//   const executed = useRef(false);

//   // ==========================
//   // First Layer Protection
//   // ==========================
//   if (!sessionId) {
//     return <Navigate to="/" replace />;
//   }

//   useEffect(() => {
//     if (executed.current) return;
//     executed.current = true;

//     const completePayment = async () => {
//       try {
       

//         // ==========================
//         // Validate Session
//         // ==========================
      

//         const validateRes = await api.get(
//           `/orders/validate-session/${sessionId}`
//         );

       

//         // ==========================
//         // Confirm Payment
//         // ==========================
//         const confirmRes = await api.post(
//           "/orders/confirm-payment",
//           {
//             sessionId,
//           }
//         );

        

//         // ==========================
//         // Clear Cart
//         // ==========================
//         if (user) {
//           await clearCart(user);
//         }

//         // ==========================
//         // Success Alert
//         // ==========================
//         await Swal.fire({
//           icon: "success",
//           title: "Payment Successful 🎉",
//           text: "Your order is being processed",
//           timer: 1800,
//           showConfirmButton: false,
//         });

//         // ==========================
//         // Redirect
//         // ==========================
//         navigate("/cart", {
//           replace: true,
//         });

//       } catch (err) {
      

//        await Swal.fire({
//     icon: "error",
//     title: "Payment Failed",
//     text:
//       err.response?.data?.error?.message ||
//       err.response?.data?.message ||
//       err.message ||
//       "Something went wrong. Please try again.",
//     confirmButtonColor: "#f97316",
//   });

//   navigate("/", {
//     replace: true,
//   });
//       }
//     };

//     completePayment();
//   }, [sessionId]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

//         {/* Spinner */}
//         <div className="flex justify-center mb-6">
//           <div className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-green-600 animate-spin"></div>
//         </div>

//         <h1 className="text-2xl font-bold text-gray-800">
//           Verifying Payment...
//         </h1>

//         <p className="mt-3 text-gray-500">
//           Please wait while we securely verify your payment.
//         </p>

//         {/* Skeleton */}
//         <div className="mt-8 space-y-3 animate-pulse">
//           <div className="h-3 bg-gray-200 rounded w-full"></div>
//           <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
//           <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";
import {
  useNavigate,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore } from "../store/auth";
import { useCartStore } from "../store/CartStore";
import api from "../api/api";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const user = useAuthStore((s) => s.user);
  const clearCart = useCartStore((s) => s.clearCart);

  const sessionId = searchParams.get("session_id");

  // Prevent running twice (React StrictMode)
  const executed = useRef(false);

  // ==========================
  // First Layer Protection
  // ==========================
  if (!sessionId) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (executed.current) return;
    executed.current = true;

    const completePayment = async () => {
      try {
        // ==========================
        // Validate Session
        // ==========================
        await api.get(`/orders/validate-session/${sessionId}`);

        // ==========================
        // Confirm Payment
        // ==========================
        await api.post("/orders/confirm-payment", {
          sessionId,
        });

        // ==========================
        // Clear Cart
        // ==========================
        if (user) {
          await clearCart(user);
        }

        // ==========================
        // Success Alert
        // ==========================
        await Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          text: "Your order is being processed.",
          timer: 1800,
          showConfirmButton: false,
          confirmButtonColor: "#f97316",
        });

        // ==========================
        // Redirect
        // ==========================
        navigate("/cart", {
          replace: true,
        });
      } catch (err) {
        await Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text:
            err.response?.data?.error?.message ||
            err.response?.data?.message ||
            err.message ||
            "Something went wrong. Please try again.",
          confirmButtonColor: "#f97316",
        });

        navigate("/", {
          replace: true,
        });
      }
    };

    completePayment();
  }, [sessionId, user, clearCart, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-green-600 animate-spin"></div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          Verifying Payment...
        </h1>

        <p className="mt-3 text-gray-500">
          Please wait while we securely verify your payment.
        </p>

        {/* Skeleton */}
        <div className="mt-8 space-y-3 animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    </div>
  );
}