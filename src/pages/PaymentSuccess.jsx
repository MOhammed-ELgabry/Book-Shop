import { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import Swal from "sweetalert2";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { cart, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);

  const sessionId = searchParams.get("session_id");

  // 👇 مهم جدًا لمنع تكرار إنشاء الطلب
  const hasRun = useRef(false);

  useEffect(() => {
    const createOrderAfterPayment = async () => {
      if (!user?.id || !sessionId) return;
      if (hasRun.current) return;

      hasRun.current = true;

      try {
        const saved = localStorage.getItem("pendingOrder");
        const orderData = JSON.parse(saved);
const orderItems = orderData?.items?.map((item) => ({
  quantity: item.quantity,
  book: item.book?.id || item.bookId,
}));
        const payload = {
          data: {
            users_permissions_user: user.id,
            items: orderItems,
            total: orderData.total,
            address: orderData.address,
            phone: orderData.phone,

            paymentMethod: "visa",
            paymentStatus: "paid",   // ✅ هنا التغيير المهم
            orderStatus: "confirmed",
          },
        };
console.log("ORDER PAYLOAD:", payload);
        await api.post("/orders", payload);

        await clearCart(user);

        localStorage.removeItem("pendingOrder");

        Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
        });

        // ⬅️ يرجع للكارت بعد 2 ثانية
        setTimeout(() => {
          navigate("/cart", { replace: true });
        }, 1500);

      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Order creation failed",
        });
      }
    };

    createOrderAfterPayment();
  }, [sessionId, user]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">
        Payment Successful 🎉
      </h1>
    </div>
  );
}