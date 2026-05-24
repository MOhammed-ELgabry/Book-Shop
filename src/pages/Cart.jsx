
// // import { useEffect, useState } from "react";
// // import { useCartStore, initCart } from "../store/CartStore";
// // import { useAuthStore } from "../store/auth";
// // import NavBar from "../component/NavBar";
// // import Footer from "../component/Footer";
// // import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// // import Swal from "sweetalert2";
// // import { Formik, Form, Field } from "formik";
// // import * as Yup from "yup";
// // import "animate.css";
// // import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";

// // // 🔥 الجديد
// // import api from "../api/api";

// // export default function Cart() {
// //   const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
// //   const user = useAuthStore((state) => state.user);

// //   const [openModal, setOpenModal] = useState(false);
// //   const [selectedMethod, setSelectedMethod] = useState("");
// //   const [showVisa, setShowVisa] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [orders, setOrders] = useState([]);

// //   useEffect(() => {
// //     if (user) {
// //       initCart(user);
// //       fetchOrders();
// //     }
// //   }, [user]);

// //   // 🔥 بدل fetch → api
// //   const fetchOrders = async () => {
// //     try {
// //       const res = await api.get("/orders?populate=*");
// //       setOrders(res.data.data || []);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
// //   const shipping = cart.length > 0 ? 10 : 0;
// //   const total = subtotal + shipping;

// //   // 🔥 هنا بقى هنعمل order حقيقي
// //   const handleCashOrCOD = async (method, data) => {
// //     setLoading(true);
// //     try {
// //       // 🧠 حفظ الأوردر في Strapi
// //       await api.post("/orders", {
// //         data: {
// //           items: cart,
// //           total: total,
// //           paymentMethod: method,
// //           user: user?.id,
// //         },
// //       });

// //       Swal.fire({
// //         icon: "success",
// //         title: "Order placed successfully",
// //         timer: 1500,
// //         showConfirmButton: false,
// //       });

// //       clearCart();
// //       setOpenModal(false);
// //       setShowVisa(false);
// //       setSelectedMethod("");
// //       fetchOrders();
// //     } catch (err) {
// //       Swal.fire("Error", "Payment failed", "error");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <CartPageSkeleton />;

// //   return (
// //     <div className="bg-gray-50 min-h-[100vh] overflow-x-hidden">
// //       <NavBar />

// //       <div
// //         className="w-full h-48 bg-cover bg-center"
// //         style={{ backgroundImage: `url(${bgImage})` }}
// //       ></div>

// //       <div className="max-w-7xl mx-auto px-6 py-10">
// //         <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

// //         {cart.length === 0 ? (
// //           <div className="text-center text-gray-500">
// //             Your cart is empty 😢
// //           </div>
// //         ) : (
// //           <div className="grid lg:grid-cols-3 gap-8">

// //             {/* PRODUCTS */}
// //             <div className="lg:col-span-2 flex flex-col gap-6">
// //               {cart.map((item) => (
// //                 <div
// //                   key={item.id}
// //                   className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
// //                 >
// //                   <img
// //                     src={item.img}
// //                     alt={item.name}
// //                     className="w-24 h-32 object-cover rounded-lg"
// //                   />

// //                   <div className="flex-1">
// //                     <h2 className="text-lg font-semibold">{item.name}</h2>
// //                     <p className="text-gray-500">${item.price}</p>

// //                     <div className="flex items-center gap-3 mt-3">
// //                       <button
// //                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
// //                         disabled={item.quantity <= 1}
// //                         className="w-8 h-8 bg-gray-200 rounded"
// //                       >
// //                         -
// //                       </button>
// //                       <span>{item.quantity}</span>
// //                       <button
// //                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
// //                         className="w-8 h-8 bg-gray-200 rounded"
// //                       >
// //                         +
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <div className="text-right">
// //                     <p className="font-bold text-lg">
// //                       ${item.price * item.quantity}
// //                     </p>
// //                     <button
// //                       onClick={() => removeFromCart(item.id)}
// //                       className="text-red-500 text-sm mt-2"
// //                     >
// //                       Remove
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>

// //             {/* SUMMARY */}
// //             <div className="bg-white p-6 rounded-xl shadow h-fit">
// //               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

// //               <div className="flex justify-between mb-2">
// //                 <span>Subtotal</span>
// //                 <span>${subtotal}</span>
// //               </div>

// //               <div className="flex justify-between mb-2">
// //                 <span>Shipping</span>
// //                 <span>${shipping}</span>
// //               </div>

// //               <div className="border-t my-4"></div>

// //               <div className="flex justify-between font-bold text-lg">
// //                 <span>Total</span>
// //                 <span className="text-pink-600">${total}</span>
// //               </div>

// //               <button
// //                 onClick={() => setOpenModal(true)}
// //                 className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl"
// //               >
// //                 Checkout
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* ORDERS */}
// //         {orders.length > 0 && (
// //           <div className="mt-10">
// //             <h2 className="text-2xl font-bold mb-4">Order History</h2>
// //             {orders.map((o, i) => (
// //               <div
// //                 key={i}
// //                 className="p-4 bg-white rounded-xl shadow flex justify-between"
// //               >
// //                 <span>Order #{i + 1}</span>
// //                 <span>${o.attributes?.total || 0}</span>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       <Footer />
// //     </div>
// //   );
// // }

// ما قبل اخر تعديل 

// import { useEffect, useState } from "react";
// import { useCartStore } from "../store/CartStore";
// import { useAuthStore } from "../store/auth";
// import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import Swal from "sweetalert2";
// import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";

// export default function Cart() {
//   const {
//     cart,
//     initCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     loading,
//   } = useCartStore();

//   const user = useAuthStore((state) => state.user);

//   const [checkoutLoading, setCheckoutLoading] =
//     useState(false);

//   // =========================
//   // LOAD CART
//   // =========================
//   useEffect(() => {
//     if (user?.id) {
//       initCart(user);
//     }
//   }, [user]);

//   // =========================
//   // CALCULATIONS
//   // =========================
//   const subtotal = cart.reduce(
//     (acc, item) =>
//       acc +
//       Number(item.price) *
//         Number(item.quantity),
//     0
//   );

//   const shipping = cart.length > 0 ? 10 : 0;

//   const total = subtotal + shipping;

//   // =========================
//   // CHECKOUT
//   // =========================
//   const handleCheckout = async () => {
//     if (!user?.id) {
//       Swal.fire({
//         icon: "error",
//         title: "Please login first",
//       });

//       return;
//     }

//     setCheckoutLoading(true);

//     try {
//       await clearCart(user);

//       Swal.fire({
//         icon: "success",
//         title: "Order placed successfully",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (err) {
//       console.log(err);

//       Swal.fire({
//         icon: "error",
//         title: "Checkout failed",
//       });
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   // =========================
//   // REMOVE ITEM
//   // =========================
//   const handleRemove = async (
//     bookDocumentId
//   ) => {
//     await removeFromCart(
//       bookDocumentId,
//       user
//     );

//     Swal.fire({
//       icon: "success",
//       title: "Removed from cart",
//       timer: 1200,
//       showConfirmButton: false,
//     });
//   };

//   // =========================
//   // LOADING
//   // =========================
//   if (loading) return <CartPageSkeleton />;

//   return (
//     <div className="bg-gray-50 min-h-screen overflow-x-hidden">
//       <NavBar />

//       {/* HERO */}
//       <div
//         className="w-full h-48 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//         }}
//       />

//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <h1 className="text-3xl font-bold mb-8">
//           Shopping Cart
//         </h1>

//         {/* EMPTY STATE */}
//         {cart.length === 0 ? (
//           <div className="bg-white rounded-xl shadow p-10 text-center">
//             <h2 className="text-2xl font-semibold text-gray-700">
//               Your cart is empty 😢
//             </h2>

//             <p className="text-gray-500 mt-2">
//               Add some books and come back here
//             </p>
//           </div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* ITEMS */}
//             <div className="lg:col-span-2 flex flex-col gap-6">
//               {cart.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
//                 >
//                   {/* IMAGE */}
//                   {item.img ? (
//                     <img
//                       src={item.img}
//                       alt={item.name}
//                       className="w-24 h-32 object-cover rounded-lg"
//                     />
//                   ) : (
//                     <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
//                       No Image
//                     </div>
//                   )}

//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold">
//                       {item.name}
//                     </h2>

//                     <p className="text-gray-500">
//                       ${item.price}
//                     </p>

//                     {/* QUANTITY */}
//                     <div className="flex items-center gap-3 mt-3">
//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.documentId,
//                             item.quantity - 1,
//                             user
//                           )
//                         }
//                         disabled={
//                           item.quantity <= 1
//                         }
//                         className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
//                       >
//                         -
//                       </button>

//                       <span className="font-medium">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.documentId,
//                             item.quantity + 1,
//                             user
//                           )
//                         }
//                         className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   {/* PRICE + REMOVE */}
//                   <div className="text-right">
//                     <p className="font-bold text-lg">
//                       $
//                       {Number(item.price) *
//                         Number(
//                           item.quantity
//                         )}
//                     </p>

//                     <button
//                       onClick={() =>
//                         handleRemove(
//                           item.documentId
//                         )
//                       }
//                       className="text-red-500 text-sm mt-2 hover:text-red-700"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SUMMARY */}
//             <div className="bg-white p-6 rounded-xl shadow h-fit">
//               <h2 className="text-xl font-semibold mb-4">
//                 Order Summary
//               </h2>

//               <div className="flex justify-between mb-2">
//                 <span>Subtotal</span>

//                 <span>${subtotal}</span>
//               </div>

//               <div className="flex justify-between mb-2">
//                 <span>Shipping</span>

//                 <span>${shipping}</span>
//               </div>

//               <div className="border-t my-4" />

//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>

//                 <span className="text-pink-600">
//                   ${total}
//                 </span>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={checkoutLoading}
//                 className="w-full mt-6 bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-xl disabled:opacity-50"
//               >
//                 {checkoutLoading
//                   ? "Processing..."
//                   : "Checkout"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { useCartStore } from "../store/CartStore";
// import { useAuthStore } from "../store/auth";
// import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import Swal from "sweetalert2";
// import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";

// export default function Cart() {
//   const {
//     cart,
//     initCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     loading,
//   } = useCartStore();

//   const user = useAuthStore((state) => state.user);

//   const [checkoutLoading, setCheckoutLoading] =
//     useState(false);

//   // =========================
//   // LOAD CART
//   // =========================
//   useEffect(() => {
//     if (user?.id) {
//       initCart(user);
//     }
//   }, [user]);

//   // =========================
//   // CALCULATIONS
//   // =========================
//   const subtotal = cart.reduce(
//     (acc, item) =>
//       acc +
//       Number(item.price) *
//         Number(item.quantity),
//     0
//   );

//   const shipping = cart.length > 0 ? 10 : 0;

//   const total = subtotal + shipping;

//   // =========================
//   // CHECKOUT
//   // =========================
//   const handleCheckout = async () => {
//     if (!user?.id) {
//       Swal.fire({
//         icon: "error",
//         title: "Please login first",
//       });

//       return;
//     }

//     setCheckoutLoading(true);

//     try {
//       await clearCart(user);

//       Swal.fire({
//         icon: "success",
//         title: "Order placed successfully",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (err) {
//       console.log(err);

//       Swal.fire({
//         icon: "error",
//         title: "Checkout failed",
//       });
//     } finally {
//       setCheckoutLoading(false);
//     }
//   };

//   // =========================
//   // REMOVE ITEM
//   // =========================
//   const handleRemove = async (
//     bookId
//   ) => {
//     await removeFromCart(
//       bookId,
//       user
//     );

//     Swal.fire({
//       icon: "success",
//       title: "Removed from cart",
//       timer: 1200,
//       showConfirmButton: false,
//     });
//   };

//   // =========================
//   // LOADING
//   // =========================
//   if (loading) return <CartPageSkeleton />;

//   return (
//     <div className="bg-gray-50 min-h-screen overflow-x-hidden">
//       <NavBar />

//       {/* HERO */}
//       <div
//         className="w-full h-48 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//         }}
//       />

//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <h1 className="text-3xl font-bold mb-8">
//           Shopping Cart
//         </h1>

//         {/* EMPTY STATE */}
//         {cart.length === 0 ? (
//           <div className="bg-white rounded-xl shadow p-10 text-center">
//             <h2 className="text-2xl font-semibold text-gray-700">
//               Your cart is empty 😢
//             </h2>

//             <p className="text-gray-500 mt-2">
//               Add some books and come back here
//             </p>
//           </div>
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* ITEMS */}
//             <div className="lg:col-span-2 flex flex-col gap-6">
//               {cart.map((item, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
//                 >
//                   {/* IMAGE */}
//                   {item.img ? (
//                     <img
//                       src={item.img}
//                       alt={item.name}
//                       className="w-24 h-32 object-cover rounded-lg"
//                     />
//                   ) : (
//                     <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
//                       No Image
//                     </div>
//                   )}

//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold">
//                       {item.name}
//                     </h2>

//                     <p className="text-sm text-gray-500 mb-1">
//                       {item.author}
//                     </p>

//                     <p className="text-gray-500">
//                       ${item.price}
//                     </p>

//                     {/* QUANTITY */}
//                     <div className="flex items-center gap-3 mt-3">
//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.bookId,
//                             item.quantity - 1,
//                             user
//                           )
//                         }
//                         disabled={
//                           item.quantity <= 1
//                         }
//                         className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
//                       >
//                         -
//                       </button>

//                       <span className="font-medium">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.bookId,
//                             item.quantity + 1,
//                             user
//                           )
//                         }
//                         className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>

//                   {/* PRICE + REMOVE */}
//                   <div className="text-right">
//                     <p className="font-bold text-lg">
//                       $
//                       {Number(item.price) *
//                         Number(
//                           item.quantity
//                         )}
//                     </p>

//                     <button
//                       onClick={() =>
//                         handleRemove(
//                           item.bookId
//                         )
//                       }
//                       className="text-red-500 text-sm mt-2 hover:text-red-700"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SUMMARY */}
//             <div className="bg-white p-6 rounded-xl shadow h-fit">
//               <h2 className="text-xl font-semibold mb-4">
//                 Order Summary
//               </h2>

//               <div className="flex justify-between mb-2">
//                 <span>Subtotal</span>

//                 <span>${subtotal}</span>
//               </div>

//               <div className="flex justify-between mb-2">
//                 <span>Shipping</span>

//                 <span>${shipping}</span>
//               </div>

//               <div className="border-t my-4" />

//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>

//                 <span className="text-pink-600">
//                   ${total}
//                 </span>
//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={checkoutLoading}
//                 className="w-full mt-6 bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-xl disabled:opacity-50"
//               >
//                 {checkoutLoading
//                   ? "Processing..."
//                   : "Checkout"}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }
//deepseek




// import { useEffect, useState } from "react";
// import { useCartStore } from "../store/CartStore";
// import { useAuthStore } from "../store/auth";
// import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import Swal from "sweetalert2";
// import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";

// export default function Cart() {

//   const {
//     cart,
//     initCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     loading,
//   } = useCartStore();

//   const user = useAuthStore((state) => state.user);

//   const [checkoutLoading, setCheckoutLoading] =
//     useState(false);

//   // ======================
//   // INIT CART
//   // ======================
//   useEffect(() => {

//     if (user?.id) {
//       initCart();
//     }

//   }, [user?.id]);

//   // ======================
//   // TOTALS
//   // ======================
//   const subtotal = cart.reduce(
//     (acc, item) =>
//       acc +
//       Number(item.price) *
//         Number(item.quantity),
//     0
//   );

//   const shipping =
//     cart.length > 0 ? 10 : 0;

//   const total = subtotal + shipping;

//   // ======================
//   // CHECKOUT
//   // ======================
//   const handleCheckout = async () => {

//     if (!user?.id) {

//       Swal.fire({
//         icon: "error",
//         title: "Please login first",
//       });

//       return;
//     }

//     setCheckoutLoading(true);

//     try {

//       await clearCart();

//       Swal.fire({
//         icon: "success",
//         title: "Order placed successfully",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//     } catch (err) {

//       console.log(err);

//       Swal.fire({
//         icon: "error",
//         title: "Checkout failed",
//       });

//     } finally {

//       setCheckoutLoading(false);

//     }
//   };

//   // ======================
//   // REMOVE
//   // ======================
//   const handleRemove = async (bookId) => {

//     await removeFromCart(bookId);

//     Swal.fire({
//       icon: "success",
//       title: "Removed from cart",
//       timer: 1200,
//       showConfirmButton: false,
//     });
//   };

//   if (loading) return <CartPageSkeleton />;

//   return (
//     <div className="bg-gray-50 min-h-screen overflow-x-hidden">

//       <NavBar />

//       {/* HERO */}
//       <div
//         className="w-full h-48 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//         }}
//       />

//       {/* CONTENT */}
//       <div className="max-w-7xl mx-auto px-6 py-10">

//         <h1 className="text-3xl font-bold mb-8">
//           Shopping Cart
//         </h1>

//         {cart.length === 0 ? (

//           <div className="bg-white rounded-xl shadow p-10 text-center">

//             <h2 className="text-2xl font-semibold text-gray-700">
//               Your cart is empty 😢
//             </h2>

//             <p className="text-gray-500 mt-2">
//               Add some books and come back here
//             </p>

//           </div>

//         ) : (

//           <div className="grid lg:grid-cols-3 gap-8">

//             {/* CART ITEMS */}
//             <div className="lg:col-span-2 flex flex-col gap-6">

//               {cart.map((item) => (

//                 <div
//                   key={item.id}
//                   className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
//                 >

//                   {/* IMAGE */}
//                   {item.img ? (

//                     <img
//                       src={item.img}
//                       alt={item.name}
//                       className="w-24 h-32 object-cover rounded-lg"
//                     />

//                   ) : (

//                     <div className="w-24 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
//                       No Image
//                     </div>

//                   )}

//                   {/* INFO */}
//                   <div className="flex-1">

//                     <h2 className="text-lg font-semibold">
//                       {item.name}
//                     </h2>

//                     <p className="text-sm text-gray-500 mb-1">
//                       {item.author}
//                     </p>

//                     <p className="text-gray-500">
//                       ${item.price}
//                     </p>

//                     {/* QUANTITY */}
//                     <div className="flex items-center gap-3 mt-3">

//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.bookId,
//                             item.quantity - 1
//                           )
//                         }
//                         disabled={item.quantity <= 1}
//                         className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
//                       >
//                         -
//                       </button>

//                       <span className="font-medium">
//                         {item.quantity}
//                       </span>

//                       <button
//                         onClick={() =>
//                           updateQuantity(
//                             item.bookId,
//                             item.quantity + 1
//                           )
//                         }
//                         className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition"
//                       >
//                         +
//                       </button>

//                     </div>
//                   </div>

//                   {/* PRICE */}
//                   <div className="text-right">

//                     <p className="font-bold text-lg">
//                       $
//                       {Number(item.price) *
//                         Number(item.quantity)}
//                     </p>

//                     <button
//                       onClick={() =>
//                         handleRemove(item.bookId)
//                       }
//                       className="text-red-500 text-sm mt-2 hover:text-red-700"
//                     >
//                       Remove
//                     </button>

//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* SUMMARY */}
//             <div className="bg-white p-6 rounded-xl shadow h-fit">

//               <h2 className="text-xl font-semibold mb-4">
//                 Order Summary
//               </h2>

//               <div className="flex justify-between mb-2">
//                 <span>Subtotal</span>
//                 <span>${subtotal}</span>
//               </div>

//               <div className="flex justify-between mb-2">
//                 <span>Shipping</span>
//                 <span>${shipping}</span>
//               </div>

//               <div className="border-t my-4" />

//               <div className="flex justify-between font-bold text-lg">

//                 <span>Total</span>

//                 <span className="text-pink-600">
//                   ${total}
//                 </span>

//               </div>

//               <button
//                 onClick={handleCheckout}
//                 disabled={checkoutLoading}
//                 className="w-full mt-6 bg-pink-600 hover:bg-pink-700 transition text-white py-3 rounded-xl disabled:opacity-50"
//               >
//                 {checkoutLoading
//                   ? "Processing..."
//                   : "Checkout"}
//               </button>

//             </div>
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import Swal from "sweetalert2";
import CartPageSkeleton from "../component/skeletons/cart/CartPageSkeleton";

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
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // ======================
  // INIT CART
  // ======================
  useEffect(() => {
    if (!user?.id) return;
    initCart(user);
  }, [user?.id]);

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
  // CHECKOUT
  // ======================
  const handleCheckout = async () => {
    if (!user?.id) return;

    setCheckoutLoading(true);

    try {
      await clearCart(user);

      Swal.fire({
        icon: "success",
        title: "Order placed",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed" });
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

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
                // 🔥 SAFE IMAGE RESOLUTION (IMPORTANT FIX)
                const imgUrl =
                  item?.img ||
                  item?.book?.img?.url ||
                  item?.book?.img?.data?.attributes?.url ||
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
                    {/* IMAGE FIXED */}
                    {finalImg && (
                      <img
                        src={finalImg}
                        className="w-24 h-32 object-cover rounded"
                        alt={item.name}
                      />
                    )}

                    <div className="flex-1">
                      <h2>{item.name}</h2>
                      <p>${item.price}</p>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => {
                            if (item.quantity <= 1) return;

                            updateQuantity(
                              item.bookId,
                              item.quantity - 1,
                              user
                            );
                          }}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
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

                    <button
                      onClick={() =>
                        removeFromCart(item.bookId, user)
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
              <div>Subtotal: ${subtotal}</div>
              <div>Shipping: ${shipping}</div>
              <div>Total: ${total}</div>

              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                className="w-full mt-4 bg-pink-600 text-white p-3 rounded"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}


