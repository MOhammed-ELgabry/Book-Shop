

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

  // ================= INIT =================
  useEffect(() => {
    if (!user?.id) return;

    const loadData = async () => {
      await initCart(user);
      await fetchOrders();
    };

    loadData();
  }, [user?.id]);

  // ================= ORDERS =================
  const fetchOrders = async () => {
    if (!user?.id) return;

    setOrdersLoading(true);
    try {
      const res = await api.get(
        `/orders?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book&populate=seller&populate=paymentProof`
      );

      setOrders(res?.data?.data || []);
    } catch {
      Swal.fire({ icon: "error", title: "Failed to load orders" });
    } finally {
      setOrdersLoading(false);
    }
  };

  // ================= TOTAL =================
  const subtotal = cart.reduce((acc, i) => {
    const price = Number(i.price) || 0;
    return acc + price * i.quantity;
  }, 0);

  const shipping = cart.length ? 10 : 0;
  const total = subtotal + shipping;

  // ================= INPUT =================
  const handleChange = (e) => {
    setCheckoutData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= CHECKOUT =================
 const handleCheckout = async () => {
  if (!user?.id) return;

  if (!checkoutData.address || !checkoutData.phone) {
    Swal.fire({
      icon: "warning",
      title: "Missing address or phone",
    });
    return;
  }

  if (!paymentMethod) {
    Swal.fire({
      icon: "warning",
      title: "Choose payment method",
    });
    return;
  }

  setCheckoutLoading(true);

  try {
    const orderItems = cart.map((item) => ({
      quantity: item.quantity,
      book: item.bookId,
    }));

    // ================= VISA =================
    if (paymentMethod === "visa") {
      const res = await api.post("/orders/create-checkout-session", {
        cartItems: orderItems,
        total,
        address: checkoutData.address,
        phone: checkoutData.phone,

        cardName: checkoutData.cardName,
        cardNumber: checkoutData.cardNumber,
        expiry: checkoutData.expiry,
        cvv: checkoutData.cvv,
      });

      if (!res.data?.checkoutUrl) {
        throw new Error("No checkout URL returned");
      }

      window.location.href = res.data.checkoutUrl;
      return;
    }

    // ================= CASH / WALLET =================
    let uploadedImageId = null;

    if (paymentProof) {
      const formData = new FormData();
      formData.append("files", paymentProof);

      const uploadRes = await api.post("/upload", formData);
      uploadedImageId = uploadRes.data?.[0]?.id;
    }

    await api.post("/orders", {
      data: {
        users_permissions_user: user.id,
        items: orderItems,
        total,
        address: checkoutData.address,
        phone: checkoutData.phone,
        paymentMethod,
        paymentStatus: "pending",
        paymentProof: uploadedImageId,
        orderStatus: "pending",
      },
    });

    await clearCart(user);

    Swal.fire({
      icon: "success",
      title: "Order placed successfully 🎉",
    });

    setShowCheckoutModal(false);
    setPaymentProof(null);

    setCheckoutData({
      address: "",
      phone: "",
      walletType: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });

    await fetchOrders();
  } catch (err) {
    console.log(err);

    Swal.fire({
      icon: "error",
      title: "Checkout failed",
      text:
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message,
    });
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
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>

          <button
            onClick={() => setShowOrdersModal(true)}
            className="bg-black text-white px-5 py-3 rounded-xl"
          >
            My Orders
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-xl">
            Empty Cart
          </div>
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
              onCheckout={() => setShowCheckoutModal(true)}
            />
          </div>
        )}
      </div>

      <CheckoutModal
        show={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
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
        onClose={() => setShowOrdersModal(false)}
        orders={orders}
        ordersLoading={ordersLoading}
      />

      <Footer />
    </div>
  );
}