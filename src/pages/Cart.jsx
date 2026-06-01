
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import Swal from "sweetalert2";
import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";
import api from "../api/api";

const BASE_URL = "http://localhost:1337";

export default function Cart() {
  const {
    cart,
    initCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loading,
  } = useCartStore();

  const user = useAuthStore((s) => s.user);

  const [checkoutLoading, setCheckoutLoading] =
    useState(false);

  // ======================
  // CHECKOUT MODAL
  // ======================
  const [showCheckoutModal, setShowCheckoutModal] =
    useState(false);

  // ======================
  // ORDERS MODAL
  // ======================
  const [showOrdersModal, setShowOrdersModal] =
    useState(false);

  // ======================
  // ORDERS
  // ======================
  const [orders, setOrders] = useState([]);

  const [ordersLoading, setOrdersLoading] =
    useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("");

  // ======================
  // FORM DATA
  // ======================
  const [checkoutData, setCheckoutData] =
    useState({
      address: "",
      phone: "",
      walletType: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    });

  // ======================
  // INIT CART
  // ======================


  // ======================
// INIT CART + FETCH ORDERS
// ======================
useEffect(() => {
  if (!user?.id) return;

  const loadData = async () => {
    await initCart(user);

    // 🔥 IMPORTANT
    // LOAD ORDERS AFTER REFRESH
    await fetchOrders();
  };

  loadData();
}, [user?.id]);
  // ======================
  // GET ORDERS
  // ======================
  const fetchOrders = async () => {
    if (!user?.id) return;

    setOrdersLoading(true);

    try {
      const res = await api.get(
        // `/orders?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book`
          `/orders?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book&populate=seller`
      );

      const ordersData =
        res?.data?.data || [];

      setOrders(ordersData);

    } catch (err) {

      Swal.fire({
        icon: "error",
        title: "Failed to load orders",
      });

    } finally {

      setOrdersLoading(false);
    }
  };

  // ======================
  // SAFE TOTALS
  // ======================
  const subtotal = cart.reduce((acc, i) => {
    const price = Number(i.price) || 0;
    const qty = Number(i.quantity) || 0;

    return acc + price * qty;
  }, 0);

  const shipping = cart.length ? 10 : 0;

  const total = subtotal + shipping;

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    setCheckoutData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================
  // OPEN CHECKOUT
  // ======================
  const handleOpenCheckout = () => {
    setShowCheckoutModal(true);
  };

  // ======================
  // CLOSE CHECKOUT
  // ======================
  const handleCloseCheckout = () => {
    setShowCheckoutModal(false);

    setPaymentMethod("");
  };

  // ======================
  // OPEN ORDERS
  // ======================
  const handleOpenOrders = async () => {
    await fetchOrders();

    setShowOrdersModal(true);
  };

  // ======================
  // CLOSE ORDERS
  // ======================
  const handleCloseOrders = () => {
    setShowOrdersModal(false);
  };

  // ======================
  // CONFIRM ORDER
  // ======================
  const handleCheckout = async () => {
    if (!user?.id) return;

    // ======================
    // VALIDATION
    // ======================
    if (
      !checkoutData.address ||
      !checkoutData.phone
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Data",
        text: "Please fill address and phone",
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

    // ======================
    // VISA VALIDATION
    // ======================
    if (paymentMethod === "visa") {
      if (
        !checkoutData.cardName ||
        !checkoutData.cardNumber ||
        !checkoutData.expiry ||
        !checkoutData.cvv
      ) {
        Swal.fire({
          icon: "warning",
          title: "Complete Visa Data",
        });

        return;
      }
    }

    // ======================
    // WALLET VALIDATION
    // ======================
    if (paymentMethod === "wallet") {
      if (!checkoutData.walletType) {
        Swal.fire({
          icon: "warning",
          title: "Choose Wallet Type",
        });

        return;
      }
    }

    setCheckoutLoading(true);

    try {
      // ======================
      // ORDER ITEMS
      // ======================
      const orderItems = cart.map((item) => ({
        quantity: item.quantity,
        book: item.bookId,
      }));

      // ======================
      // CREATE ORDER PAYLOAD
      // ======================
      const payload = {
        data: {
          users_permissions_user: user.id,

          items: orderItems,

          total: total,

          address: checkoutData.address,

          phone: checkoutData.phone,

          paymentMethod: paymentMethod,

          orderStatus: "pending",
        },
      };

      
      // ======================
      // CREATE ORDER
      // ======================
      await api.post(
        "/orders",
        payload
      );

      // ======================
      // CLEAR CART
      // ======================
      await clearCart(user);

      Swal.fire({
        icon: "success",
        title:
          "Order placed successfully 🎉",
        timer: 1500,
        showConfirmButton: false,
      });

      // ======================
      // RESET FORM
      // ======================
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

      Swal.fire({
        icon: "error",
        title: "Failed to place order",
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
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">

          <h1 className="text-3xl font-bold">
            Shopping Cart
          </h1>

          {/* {orders.length > 0 && (
            <button
              onClick={handleOpenOrders}
              className="bg-black text-white px-5 py-3 rounded-xl"
            >
              My Orders
            </button>
          )} */}
   <button
  onClick={handleOpenOrders}
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

            {/* ======================
                ITEMS
            ====================== */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {cart.map((item) => {

                const imgUrl =
                  item?.img ||
                  item?.book?.img?.url ||
                  item?.book?.img?.data?.attributes
                    ?.url ||
                  null;

                const finalImg = imgUrl
                  ? imgUrl.startsWith("http")
                    ? imgUrl
                    : `${BASE_URL}${imgUrl}`
                  : null;

                return (
                  <div
                    key={item.bookId}
                    className="bg-white p-4 rounded-xl shadow flex gap-4"
                  >

                    {/* IMAGE */}
                    {finalImg && (
                      <img
                        src={finalImg}
                        className="w-24 h-32 object-cover rounded"
                        alt={item.name}
                      />
                    )}

                    {/* CONTENT */}
                    <div className="flex-1">

                      <h2 className="font-semibold text-lg">
                        {item.name}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        ${item.price}
                      </p>

                      {/* QUANTITY */}
                      <div className="flex gap-2 mt-4 items-center">

                        <button
                          className="border px-3 py-1 rounded"
                          onClick={() => {

                            if (
                              item.quantity <= 1
                            )
                              return;

                            updateQuantity(
                              item.bookId,
                              item.quantity - 1,
                              user
                            );
                          }}
                        >
                          -
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          className="border px-3 py-1 rounded"
                          onClick={() =>
                            updateQuantity(
                              item.bookId,
                              item.quantity + 1,
                              user
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* REMOVE */}
                    <button
                      className="text-red-500"
                      onClick={() =>
                        removeFromCart(
                          item.bookId,
                          user
                        )
                      }
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ======================
                SUMMARY
            ====================== */}
            <div className="bg-white p-6 rounded-xl h-fit">

              <div className="mb-3">
                Subtotal: ${subtotal}
              </div>

              <div className="mb-3">
                Shipping: ${shipping}
              </div>

              <div className="font-bold text-lg">
                Total: ${total}
              </div>

              <button
                onClick={handleOpenCheckout}
                className="w-full mt-4 bg-pink-600 text-white p-3 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* {/* ======================
          CHECKOUT MODAL
      ====================== */}
      {showCheckoutModal && (
        <div
          onClick={handleCloseCheckout}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
          >

            <h2 className="text-2xl font-bold mb-6">
              Checkout
            </h2>

            {/* PAYMENT METHODS */}
            <div className="flex flex-col gap-3 mb-6">

              <button
                onClick={() =>
                  setPaymentMethod("visa")
                }
                className={`border p-3 rounded-lg text-left ${
                  paymentMethod === "visa"
                    ? "border-pink-600 bg-pink-50"
                    : ""
                }`}
              >
                💳 Visa / Mastercard
              </button>

              <button
                onClick={() =>
                  setPaymentMethod("wallet")
                }
                className={`border p-3 rounded-lg text-left ${
                  paymentMethod === "wallet"
                    ? "border-pink-600 bg-pink-50"
                    : ""
                }`}
              >
                📱 Mobile Wallet
              </button>

              <button
                onClick={() =>
                  setPaymentMethod("cash")
                }
                className={`border p-3 rounded-lg text-left ${
                  paymentMethod === "cash"
                    ? "border-pink-600 bg-pink-50"
                    : ""
                }`}
              >
                🚚 Cash On Delivery
              </button>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col gap-4 mb-6">

              <input
                type="text"
                name="address"
                value={checkoutData.address}
                onChange={handleChange}
                placeholder="Address"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                name="phone"
                value={checkoutData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border p-3 rounded-lg"
              />
            </div>

            {/* VISA FORM */}
            {paymentMethod === "visa" && (
              <div className="flex flex-col gap-4 mb-6">

                <input
                  type="text"
                  name="cardName"
                  value={
                    checkoutData.cardName
                  }
                  onChange={handleChange}
                  placeholder="Card Holder Name"
                  className="border p-3 rounded-lg"
                />

                <input
                  type="text"
                  name="cardNumber"
                  value={
                    checkoutData.cardNumber
                  }
                  onChange={handleChange}
                  placeholder="Card Number"
                  className="border p-3 rounded-lg"
                />

                <div className="grid grid-cols-2 gap-4">

                  <input
                    type="text"
                    name="expiry"
                    value={
                      checkoutData.expiry
                    }
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="border p-3 rounded-lg"
                  />

                  <input
                    type="text"
                    name="cvv"
                    value={checkoutData.cvv}
                    onChange={handleChange}
                    placeholder="CVV"
                    className="border p-3 rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* WALLET FORM */}
            {paymentMethod === "wallet" && (
              <div className="flex flex-col gap-4 mb-6">

                <select
                  name="walletType"
                  value={
                    checkoutData.walletType
                  }
                  onChange={handleChange}
                  className="border p-3 rounded-lg"
                >
                  <option value="">
                    Choose Wallet
                  </option>

                  <option value="vodafone">
                    Vodafone Cash
                  </option>

                  <option value="orange">
                    Orange Cash
                  </option>

                  <option value="etisalat">
                    Etisalat Cash
                  </option>

                  <option value="we">
                    WE Pay
                  </option>
                </select>

                {checkoutData.walletType && (
                  <div className="border rounded-xl p-4 bg-gray-50">

                    <p className="text-sm text-gray-500 mb-2">
                      Send payment to:
                    </p>

                    <p className="text-xl font-bold text-pink-600">
                      {{
                        vodafone: "01006164484",
                        orange: "01111111111",
                        etisalat: "01222222222",
                        we: "01533333333",
                      }[
                        checkoutData.walletType
                      ]}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-4">

              <button
                onClick={handleCloseCheckout}
                className="flex-1 border p-3 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="flex-1 bg-pink-600 text-white p-3 rounded-lg"
              >
                {checkoutLoading
                  ? "Processing..."
                  : "Confirm Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================
          ORDERS MODAL
      ====================== */}
      {showOrdersModal && (
        <div
          onClick={handleCloseOrders}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="bg-white w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
          >

            <h2 className="text-2xl font-bold mb-6">
              My Orders
            </h2>

            {ordersLoading ? (

              <div className="text-center py-10">
                Loading...
              </div>

            ) : orders.length === 0 ? (

              <div className="text-center py-10">
                No orders found
              </div>

            ) : (

              <div className="flex flex-col gap-6">

                {orders.map((order) => {
                   const sellerName =
    order?.seller?.username ||
    order?.seller?.name ||
    order?.seller?.email ||
    "Not assigned";
                  const status =
                    order?.orderStatus;

                  return (
                    <div
                      key={order.id}
                      className="border rounded-2xl p-5"
                    >

                      {/* HEADER */}
                      <div className="flex items-center justify-between mb-4">

                        <div>
                          <h3 className="font-bold text-lg">
                            Order #{order.id}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>

                       
                        <div className="flex flex-wrap gap-2">

  {/* ORDER STATUS */}
  
  <div
    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
      status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : status === "accepted"
        ? "bg-green-100 text-green-700"
        : status === "rejected"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700"
    }`}
  >
    Order: {status}
  </div>

  {/* PAYMENT STATUS */}
  <div
    className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
      order?.paymentStatus === "paid"
        ? "bg-green-100 text-green-700"
        : order?.paymentStatus === "failed"
        ? "bg-red-100 text-red-700"
        : "bg-yellow-100 text-yellow-700"
    }`}
  >
    Payment: {order?.paymentStatus || "pending"}
  </div>

</div>
                      </div>

                      {/* INFO */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">

                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">
                            Payment Method
                          </p>

                          <p className="font-semibold capitalize">
                            {order.paymentMethod}
                          </p>
                        </div>
                                  <div className="mb-3 bg-blue-50 p-3 rounded-xl">
  <p className="text-sm text-gray-500">Seller</p>
  <p className="font-semibold text-blue-700">
    {sellerName}
  </p>
</div>
                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">
                            Total
                          </p>

                          <p className="font-semibold">
                            ${order.total}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">
                            Address
                          </p>

                          <p className="font-semibold">
                            {order.address}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl">
                          <p className="text-sm text-gray-500">
                            Phone
                          </p>

                          <p className="font-semibold">
                            {order.phone}
                          </p>
                        </div>
                      </div>

                      {/* DELIVERY */}
                      <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-4">

                        <p className="text-sm text-gray-500">
                          Expected Delivery
                        </p>

                        <p className="font-bold text-pink-600">
                          Within 2 - 4 Days
                        </p>
                      </div>

                      {/* ITEMS */}
                      <div className="flex flex-col gap-3">

                        {order?.items?.map(
                          (item, index) => (

                            <div
                              key={index}
                              className="flex items-center justify-between border rounded-xl p-3"
                            >

                              <div>
                                <h4 className="font-semibold">
                                  {
                                    item?.book
                                      ?.title
                                  }
                                </h4>

                                <p className="text-sm text-gray-500">
                                  Quantity:
                                  {" "}
                                  {
                                    item?.quantity
                                  }
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )} 

      <Footer />
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useCartStore } from "../store/CartStore";
// import { useAuthStore } from "../store/auth";
// import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import Swal from "sweetalert2";
// import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";
// import api from "../api/api";

// const BASE_URL = "http://localhost:1337";

// export default function Cart() {
//   const {
//     cart,
//     initCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     loading,
//   } = useCartStore();

//   const user = useAuthStore((s) => s.user);

//   const [checkoutLoading, setCheckoutLoading] =
//     useState(false);

//   const [showCheckoutModal, setShowCheckoutModal] =
//     useState(false);

//   const [showOrdersModal, setShowOrdersModal] =
//     useState(false);

//   const [orders, setOrders] = useState([]);

//   const [ordersLoading, setOrdersLoading] =
//     useState(false);

//   const [paymentMethod, setPaymentMethod] =
//     useState("");

//   const [checkoutData, setCheckoutData] =
//     useState({
//       address: "",
//       phone: "",
//       walletType: "",
//       cardName: "",
//       cardNumber: "",
//       expiry: "",
//       cvv: "",
//     });

//   useEffect(() => {
//     if (!user?.id) return;

//     const loadData = async () => {
//       await initCart(user);
//       await fetchOrders();
//     };

//     loadData();
//   }, [user?.id]);

//   // ======================
//   // GET ORDERS (UPDATED ONLY HERE)
//   // ======================
//   const fetchOrders = async () => {
//     if (!user?.id) return;

//     setOrdersLoading(true);

//     try {
//       const res = await api.get(
//         `/orders?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book&populate=seller`
//       );

//       const ordersData =
//         res?.data?.data || [];

//       setOrders(ordersData);
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to load orders",
//       });
//     } finally {
//       setOrdersLoading(false);
//     }
//   };

//   const subtotal = cart.reduce((acc, i) => {
//     const price = Number(i.price) || 0;
//     const qty = Number(i.quantity) || 0;

//     return acc + price * qty;
//   }, 0);

//   const shipping = cart.length ? 10 : 0;

//   const total = subtotal + shipping;

//   const handleChange = (e) => {
//     setCheckoutData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleOpenCheckout = () => {
//     setShowCheckoutModal(true);
//   };

//   const handleCloseCheckout = () => {
//     setShowCheckoutModal(false);
//     setPaymentMethod("");
//   };

//   const handleOpenOrders = async () => {
//     await fetchOrders();
//     setShowOrdersModal(true);
//   };

//   const handleCloseOrders = () => {
//     setShowOrdersModal(false);
//   };

//   const handleCheckout = async () => {
//     if (!user?.id) return;

//     if (!checkoutData.address || !checkoutData.phone) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Data",
//         text: "Please fill address and phone",
//       });
//       return;
//     }

//     if (!paymentMethod) {
//       Swal.fire({
//         icon: "warning",
//         title: "Choose payment method",
//       });
//       return;
//     }

//     if (paymentMethod === "visa") {
//       if (
//         !checkoutData.cardName ||
//         !checkoutData.cardNumber ||
//         !checkoutData.expiry ||
//         !checkoutData.cvv
//       ) {
//         Swal.fire({
//           icon: "warning",
//           title: "Complete Visa Data",
//         });
//         return;
//       }
//     }

//     if (paymentMethod === "wallet") {
//       if (!checkoutData.walletType) {
//         Swal.fire({
//           icon: "warning",
//           title: "Choose Wallet Type",
//         });
//         return;
//       }
//     }

//     setCheckoutLoading(true);

//     try {
//       const orderItems = cart.map((item) => ({
//         quantity: item.quantity,
//         book: item.bookId,
//       }));

//       const payload = {
//         data: {
//           users_permissions_user: user.id,
//           items: orderItems,
//           total: total,
//           address: checkoutData.address,
//           phone: checkoutData.phone,
//           paymentMethod: paymentMethod,
//           orderStatus: "pending",
//         },
//       };

//       await api.post("/orders", payload);

//       await clearCart(user);

//       Swal.fire({
//         icon: "success",
//         title: "Order placed successfully 🎉",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       setCheckoutData({
//         address: "",
//         phone: "",
//         walletType: "",
//         cardName: "",
//         cardNumber: "",
//         expiry: "",
//         cvv: "",
//       });

//       handleCloseCheckout();

//       await fetchOrders();
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to place order",
//       });
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   if (loading) return <CartPageSkeleton />;

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <NavBar />

//       <div
//         className="w-full h-48 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//         }}
//       />

//       <div className="max-w-7xl mx-auto px-6 py-10">

//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-3xl font-bold">
//             Shopping Cart
//           </h1>

//           <button
//             onClick={handleOpenOrders}
//             className="bg-black text-white px-5 py-3 rounded-xl"
//           >
//             My Orders
//           </button>
//         </div>

//         {cart.length === 0 ? (
//           <div className="bg-white p-10 text-center rounded-xl">
//             Empty Cart
//           </div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-8">

//             <div className="lg:col-span-2 flex flex-col gap-6">

//               {cart.map((item) => {

//                 const imgUrl =
//                   item?.img ||
//                   item?.book?.img?.url ||
//                   item?.book?.img?.data?.attributes?.url ||
//                   null;

//                 const finalImg = imgUrl
//                   ? imgUrl.startsWith("http")
//                     ? imgUrl
//                     : `${BASE_URL}${imgUrl}`
//                   : null;

//                 return (
//                   <div
//                     key={item.bookId}
//                     className="bg-white p-4 rounded-xl shadow flex gap-4"
//                   >
//                     {finalImg && (
//                       <img
//                         src={finalImg}
//                         className="w-24 h-32 object-cover rounded"
//                         alt={item.name}
//                       />
//                     )}

//                     <div className="flex-1">
//                       <h2 className="font-semibold text-lg">
//                         {item.name}
//                       </h2>

//                       <p className="text-gray-500 mt-1">
//                         ${item.price}
//                       </p>

//                       <div className="flex gap-2 mt-4 items-center">
//                         <button
//                           className="border px-3 py-1 rounded"
//                           onClick={() => {
//                             if (item.quantity <= 1) return;

//                             updateQuantity(
//                               item.bookId,
//                               item.quantity - 1,
//                               user
//                             );
//                           }}
//                         >
//                           -
//                         </button>

//                         <span>{item.quantity}</span>

//                         <button
//                           className="border px-3 py-1 rounded"
//                           onClick={() =>
//                             updateQuantity(
//                               item.bookId,
//                               item.quantity + 1,
//                               user
//                             )
//                           }
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>

//                     <button
//                       className="text-red-500"
//                       onClick={() =>
//                         removeFromCart(item.bookId, user)
//                       }
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="bg-white p-6 rounded-xl h-fit">
//               <div className="mb-3">
//                 Subtotal: ${subtotal}
//               </div>

//               <div className="mb-3">
//                 Shipping: ${shipping}
//               </div>

//               <div className="font-bold text-lg">
//                 Total: ${total}
//               </div>

//               <button
//                 onClick={handleOpenCheckout}
//                 className="w-full mt-4 bg-pink-600 text-white p-3 rounded"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ================= ORDERS MODAL ================= */}
//       {showOrdersModal && (
//         <div
//           onClick={handleCloseOrders}
//           className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             className="bg-white w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
//           >
//             <h2 className="text-2xl font-bold mb-6">
//               My Orders
//             </h2>

//             {ordersLoading ? (
//               <div className="text-center py-10">
//                 Loading...
//               </div>
//             ) : orders.length === 0 ? (
//               <div className="text-center py-10">
//                 No orders found
//               </div>
//             ) : (
//               <div className="flex flex-col gap-6">

//                 {orders.map((order) => {

//                   const sellerName =
//                     order?.seller?.username ||
//                     order?.seller?.name ||
//                     order?.seller?.email ||
//                     "Not assigned";

//                   return (
//                     <div
//                       key={order.id}
//                       className="border rounded-2xl p-5"
//                     >

//                       {/* 🔥 ADDED SELLER (ONLY CHANGE) */}
//                       <div className="mb-3 bg-blue-50 p-3 rounded-xl">
//                         <p className="text-sm text-gray-500">
//                           Seller
//                         </p>
//                         <p className="font-semibold text-blue-700">
//                           {sellerName}
//                         </p>
//                       </div>

//                       <div className="flex items-center justify-between mb-4">
//                         <div>
//                           <h3 className="font-bold text-lg">
//                             Order #{order.id}
//                           </h3>

//                           <p className="text-sm text-gray-500">
//                             {new Date(order.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>

//                         <div className="flex flex-wrap gap-2">
//                           <div className="px-4 py-2 rounded-full text-sm font-semibold capitalize bg-yellow-100 text-yellow-700">
//                             Order: {order.orderStatus}
//                           </div>

//                           <div className="px-4 py-2 rounded-full text-sm font-semibold capitalize bg-green-100 text-green-700">
//                             Payment: {order.paymentStatus || "pending"}
//                           </div>
//                         </div>
//                       </div>

//                       <div className="grid md:grid-cols-2 gap-4 mb-4">
//                         <div className="bg-gray-50 p-4 rounded-xl">
//                           <p className="text-sm text-gray-500">
//                             Payment Method
//                           </p>
//                           <p className="font-semibold capitalize">
//                             {order.paymentMethod}
//                           </p>
//                         </div>

//                         <div className="bg-gray-50 p-4 rounded-xl">
//                           <p className="text-sm text-gray-500">
//                             Total
//                           </p>
//                           <p className="font-semibold">
//                             ${order.total}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex flex-col gap-3">
//                         {order?.items?.map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex justify-between border p-3 rounded-xl"
//                           >
//                             <span>
//                               {item?.book?.title}
//                             </span>
//                             <span>x{item.quantity}</span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }