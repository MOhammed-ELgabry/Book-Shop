
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import Swal from "sweetalert2";
import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";
import api from "../api/api";
import CartItems from "../component/cart/CartItems";
import CartSummary from "../component/cart/CartSummary";
import CheckoutModal from "../component/cart/CheckoutModal";
import OrdersModal from "../component/cart/OrdersModal";

export default function Cart() {
  const [paymentProof, setPaymentProof] = useState(null);
  const {
    cart,
    initCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loading,
  } = useCartStore();

  const user = useAuthStore((s) => s.user);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checkoutData, setCheckoutData] = useState({
    address: "",
    phone: "",
    walletType: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // ======================
  // جلب البيانات عند تحميل الصفحة
  // ======================
  useEffect(() => {
    if (!user?.id) return;
    const loadData = async () => {
      await initCart(user);
      await fetchOrders();
    };
    loadData();
  }, [user?.id]);

  // ======================
  // جلب الطلبات
  // ======================
  const fetchOrders = async () => {
    if (!user?.id) return;
    setOrdersLoading(true);
    try {
      const res = await api.get(
  `/orders?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book&populate[seller][populate]=*&populate=paymentProof`
);
      setOrders(res?.data?.data || []);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to load orders" });
    } finally {
      setOrdersLoading(false);
    }
  };

  // ======================
  // حساب الإجماليات
  // ======================
  const subtotal = cart.reduce((acc, i) => {
    const price = Number(i.price) || 0;
    const qty = Number(i.quantity) || 0;
    return acc + price * qty;
  }, 0);
  const shipping = cart.length ? 10 : 0;
  const total = subtotal + shipping;

  // ======================
  // معالجة تغيير الحقول
  // ======================
  const handleChange = (e) => {
    setCheckoutData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================
  // فتح / إغلاق نافذة الطلب
  // ======================
  const handleOpenCheckout = () => setShowCheckoutModal(true);
  const handleCloseCheckout = () => {
    setShowCheckoutModal(false);
    setPaymentMethod("");
  };

  // ======================
  // فتح نافذة الطلبات
  // ======================
  const handleOpenOrders = async () => {
    await fetchOrders();
    setShowOrdersModal(true);
  };
  const handleCloseOrders = () => setShowOrdersModal(false);

  // ======================
  // تأكيد الطلب
  // ======================
  const handleCheckout = async () => {
    if (!user?.id) return;

    // التحقق من الحقول الأساسية
    if (!checkoutData.address || !checkoutData.phone) {
      Swal.fire({ icon: "warning", title: "Missing Data", text: "Please fill address and phone" });
      return;
    }
    if (!paymentMethod) {
      Swal.fire({ icon: "warning", title: "Choose payment method" });
      return;
    }
    if (paymentMethod === "visa") {
      if (!checkoutData.cardName || !checkoutData.cardNumber || !checkoutData.expiry || !checkoutData.cvv) {
        Swal.fire({ icon: "warning", title: "Complete Visa Data" });
        return;
      }
    }
    if (paymentMethod === "wallet") {
      if (!checkoutData.walletType) {
        Swal.fire({ icon: "warning", title: "Choose Wallet Type" });
        return;
      }
      if (!paymentProof) {
        Swal.fire({ icon: "warning", title: "Upload payment screenshot", text: "Payment proof is required" });
        return;
      }
    }

    setCheckoutLoading(true);
    try {
      // تجهيز عناصر الطلب
      const orderItems = cart.map((item) => ({
        quantity: item.quantity,
        book: item.bookId,
      }));

      // رفع إثبات الدفع إن وجد
      let uploadedImageId = null;
      if (paymentProof) {
        const formData = new FormData();
        formData.append("files", paymentProof);
        const uploadRes = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedImageId = uploadRes.data?.[0]?.id;
      }

      // إنشاء الطلب
      const payload = {
        data: {
          users_permissions_user: user.id,
          items: orderItems,
          total: total,
          address: checkoutData.address,
          phone: checkoutData.phone,
          paymentMethod: paymentMethod,
          paymentStatus: "pending",
          paymentProof: uploadedImageId,
          orderStatus: "pending",
        },
      };
      await api.post("/orders", payload);
      await clearCart(user);

      Swal.fire({
        icon: "success",
        title: "Order placed successfully 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      // إعادة تعيين النموذج
      setCheckoutData({
        address: "",
        phone: "",
        walletType: "",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });
      handleCloseCheckout();
      await fetchOrders();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to place order" });
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <CartPageSkeleton />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />

      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <button
            onClick={handleOpenOrders}
            className="bg-black text-white px-5 py-3 rounded-xl"
          >
            My Orders
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl">Empty Cart</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <CartItems
              items={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              user={user}
            />
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onCheckout={handleOpenCheckout}
            />
          </div>
        )}
      </div>

      <CheckoutModal
        show={showCheckoutModal}
        onClose={handleCloseCheckout}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        checkoutData={checkoutData}
        handleChange={handleChange}
        checkoutLoading={checkoutLoading}
        handleCheckout={handleCheckout}
        paymentProof={paymentProof}
        setPaymentProof={setPaymentProof}
      />

      <OrdersModal
        show={showOrdersModal}
        onClose={handleCloseOrders}
        orders={orders}
        ordersLoading={ordersLoading}
      />

      <Footer />
    </div>
  );
}