
// import { useEffect, useState } from "react";
// import { useCartStore, initCart } from "../store/CartStore";
// import { useAuthStore } from "../store/auth";
// import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import Swal from "sweetalert2";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import "animate.css";
// import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";
// export default function Cart() {
//   const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
//   const user = useAuthStore((state) => state.user);
//   const token = useAuthStore((state) => state.token);

//   const [openModal, setOpenModal] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [showVisa, setShowVisa] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (user && token) initCart(user, token);
//     if (user && token) fetchOrders();
//   }, [user, token]);

//   const fetchOrders = async () => {
//     try {
//       const res = await fetch("http://localhost:1337/api/orders?populate=*");
//       const data = await res.json();
//       setOrders(data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   const shipping = cart.length > 0 ? 10 : 0;
//   const total = subtotal + shipping;

//   const handleCashOrCOD = async (method, data) => {
//     setLoading(true);
//     try {
//       await new Promise((r) => setTimeout(r, 1500));
//       Swal.fire({ icon: "success", title: "Order placed successfully", timer: 1500, showConfirmButton: false });
//       clearCart();
//       setOpenModal(false);
//       setShowVisa(false);
//       setSelectedMethod("");
//       fetchOrders();
//     } catch {
//       Swal.fire("Error", "Payment failed", "error");
//     } finally {
//       setLoading(false);
//     }
//   };
// if (loading) return <CartPageSkeleton />;
//   return (
//     <div className="bg-gray-50 min-h-[100vh] overflow-x-hidden">
//       <NavBar />

//       <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}></div>

//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

//         {cart.length === 0 ? (
//           <div className="text-center text-gray-500">Your cart is empty 😢</div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-8">

//             <div className="lg:col-span-2 flex flex-col gap-6">
//               {cart.map((item) => (
//                 <div key={item.id} className="bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row gap-4 items-center sm:items-center">
//                   <img src={item.img} alt={item.name} className="w-24 h-32 object-cover rounded-lg shrink-0 max-w-full"/>

//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold">{item.name}</h2>
//                     <p className="text-gray-500">${item.price}</p>

//                     <div className="flex items-center gap-3 mt-3">
//                       <button onClick={() => updateQuantity(item.id, item.quantity - 1, token)} disabled={item.quantity <= 1} className="w-8 h-8 bg-gray-200 rounded">-</button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => updateQuantity(item.id, item.quantity + 1, token)} className="w-8 h-8 bg-gray-200 rounded">+</button>
//                     </div>
//                   </div>

//                   <div className="text-right">
//                     <p className="font-bold text-lg">${item.price * item.quantity}</p>
//                     <button onClick={() => removeFromCart(item.id, token)} className="text-red-500 text-sm mt-2">Remove</button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow h-fit">
//               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//               <div className="flex justify-between mb-2"><span>Subtotal</span><span>${subtotal}</span></div>
//               <div className="flex justify-between mb-2"><span>Shipping</span><span>${shipping}</span></div>
//               <div className="border-t my-4"></div>
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span className="text-pink-600">${total}</span>
//               </div>

//               <button onClick={() => setOpenModal(true)} className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl hover:scale-105 transition">
//                 Checkout
//               </button>
//             </div>
//           </div>
//         )}

//         {/* MAIN MODAL */}
// {openModal && (
//   <div onClick={() => setOpenModal(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
//     <div
//       onClick={(e) => e.stopPropagation()}
//       className="bg-white w-[95%] max-w-[800px] p-6 md:p-10 rounded-3xl shadow-2xl animate__animated animate__zoomIn"
//     >
//       <h2 className="text-3xl font-bold text-center mb-4">Choose Payment Method</h2>

//       {/* TOTAL */}
//       <div className="text-center mb-6">
//         <p className="text-gray-500">Total Amount</p>
//         <p className="text-4xl font-bold text-pink-600">${total}</p>
//       </div>

//       <div className="grid grid-cols-2 gap-5">
//         {/* Vodafone */}
//         <div
//           onClick={() => setSelectedMethod("vodafone")}
//           className="bg-red-600 text-white p-5 rounded-xl text-center font-bold cursor-pointer hover:scale-105 transition"
//         >
//           Vodafone Cash
//         </div>

//         {/* Etisalat */}
//         <div
//           onClick={() => setSelectedMethod("etisalat")}
//           className="bg-green-500 text-white p-5 rounded-xl text-center font-bold cursor-pointer hover:scale-105 transition"
//         >
//           Etisalat Cash
//         </div>

//         {/* Orange */}
//         <div
//           onClick={() => setSelectedMethod("orange")}
//           className="bg-orange-500 text-white p-5 rounded-xl text-center font-bold cursor-pointer hover:scale-105 transition"
//         >
//           Orange Cash
//         </div>

//         {/* Visa */}
//         <div
//           onClick={() => setShowVisa(true)}
//           className="bg-blue-600 text-white p-5 rounded-xl text-center font-bold cursor-pointer hover:scale-105 transition"
//         >
//           Pay with Visa
//         </div>
//       </div>

//       {/* CASH */}
//       {(selectedMethod === "vodafone" || selectedMethod === "orange" || selectedMethod === "etisalat") && (
//         <div className="mt-6 text-center">
//           <p className="text-lg font-semibold">Send to:</p>
//           <p className="text-2xl font-bold text-pink-600">01006164484</p>

//           <button
//             onClick={() => handleCashOrCOD(selectedMethod)}
//             className="mt-4 w-full bg-pink-600 text-white py-3 rounded-xl hover:scale-105 transition"
//           >
//             Confirm Payment
//           </button>
//         </div>
//       )}
//     </div>
//   </div>
// )}

// {/* VISA MODAL */}

//         {showVisa && (
//           <div onClick={() => setShowVisa(false)} className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
//             <div onClick={(e) => e.stopPropagation()} className="bg-white w-[90%] md:w-[600px] p-8 rounded-3xl">

//               <h2 className="text-xl font-bold text-center mb-4">Pay with Visa</h2>
//               <p className="text-center font-bold text-blue-600 mb-4">${total}</p>

//               <Formik
//                 initialValues={{ cardNumber: "", name: "", mm: "", yy: "", cvv: "" }}
//                 validationSchema={Yup.object({
//                   cardNumber: Yup.string().required().matches(/^[0-9]{16}$/),
//                   name: Yup.string().required(),
//                   mm: Yup.string().required(),
//                   yy: Yup.string().required(),
//                   cvv: Yup.string().required(),
//                 })}
//                 onSubmit={(v) => handleCashOrCOD("visa", v)}
//               >
//                 <Form className="flex flex-col gap-3">
//                   <Field name="cardNumber" placeholder="Card Number" className="border p-3 rounded-xl" />
//                   <Field name="name" placeholder="Name" className="border p-3 rounded-xl" />
//                   <div className="flex gap-2">
//                     <Field name="mm" placeholder="MM" className="border p-3 rounded-xl w-1/2" />
//                     <Field name="yy" placeholder="YY" className="border p-3 rounded-xl w-1/2" />
//                   </div>
//                   <Field name="cvv" placeholder="CVV" className="border p-3 rounded-xl" />

//                   <button type="submit" className="bg-blue-600 text-white py-3 rounded-xl">Pay Now</button>
//                 </Form>
//               </Formik>

//               <button onClick={() => setShowVisa(false)} className="mt-4 w-full bg-gray-200 py-2 rounded-lg">Back</button>

//             </div>
//           </div>
//         )}

//         {orders.length > 0 && (
//           <div className="mt-10">
//             <h2 className="text-2xl font-bold mb-4">Order History</h2>
//             {orders.map((o, i) => (
//               <div key={i} className="p-4 bg-white rounded-xl shadow flex justify-between">
//                 <span>Order #{i + 1}</span>
//                 <span>${o.total || 0}</span>
//               </div>
//             ))}
//           </div>
//         )}

//       </div>

//       <Footer />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useCartStore, initCart } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "animate.css";
import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";

// 🔥 الجديد
import api from "../api/api";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const user = useAuthStore((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [showVisa, setShowVisa] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      initCart(user);
      fetchOrders();
    }
  }, [user]);

  // 🔥 بدل fetch → api
  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders?populate=*");
      setOrders(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  // 🔥 هنا بقى هنعمل order حقيقي
  const handleCashOrCOD = async (method, data) => {
    setLoading(true);
    try {
      // 🧠 حفظ الأوردر في Strapi
      await api.post("/orders", {
        data: {
          items: cart,
          total: total,
          paymentMethod: method,
          user: user?.id,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Order placed successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      clearCart();
      setOpenModal(false);
      setShowVisa(false);
      setSelectedMethod("");
      fetchOrders();
    } catch (err) {
      Swal.fire("Error", "Payment failed", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <CartPageSkeleton />;

  return (
    <div className="bg-gray-50 min-h-[100vh] overflow-x-hidden">
      <NavBar />

      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            Your cart is empty 😢
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* PRODUCTS */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">${item.price}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-8 h-8 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ${item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>

              <div className="border-t my-4"></div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-pink-600">${total}</span>
              </div>

              <button
                onClick={() => setOpenModal(true)}
                className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl"
              >
                Checkout
              </button>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {orders.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {orders.map((o, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-xl shadow flex justify-between"
              >
                <span>Order #{i + 1}</span>
                <span>${o.attributes?.total || 0}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}