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
  `/orders?filters[users_permissions_user][id][$eq]=${user.id}` +
  `&populate[items][populate]=book` +
  `&populate[users_permissions_user]=true` +
  `&populate[seller]=true` +
  `&populate[paymentProof]=true`
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

  // ✅ Wallet Validation
  if (paymentMethod === "wallet" && !checkoutData.walletType) {
    Swal.fire({
      icon: "warning",
      title: "Choose wallet type",
    });
    return;
  }

  if (paymentMethod === "wallet" && !paymentProof) {
    Swal.fire({
      icon: "warning",
      title: "Upload payment proof",
      text: "Payment screenshot is required for wallet payments.",
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
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <NavBar />

      <div
        className="w-full h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Your Shopping Cart
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Review Your Items</h2>
            <p className="text-gray-500 mt-1">Manage your books before proceeding to checkout.</p>
          </div>

          <button
            onClick={() => setShowOrdersModal(true)}
            className="bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-all shadow-sm flex items-center gap-2"
          >
            <span>📦</span> My Orders
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-20 text-center rounded-3xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-2xl font-bold mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-8">Looks like you haven't added any books to your cart yet.</p>
            <a 
              href="/books" 
              className="bg-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700 transition-colors inline-block"
            >
              Explore Books
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
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