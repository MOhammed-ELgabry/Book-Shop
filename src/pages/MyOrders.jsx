

// import { useEffect, useMemo, useState } from "react";
// import { OrderStore } from "../store/OrderStore";
// import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import {
//   Package,
//   CheckCircle2,
//   Clock3,
//   Truck,
//   XCircle,
//   Banknote,
// } from "lucide-react";

// export default function MyOrders() {
//   const {
//     orders,
//     loading,
//     fetchOrders,
//     updateOrderStatus,
//     updatePaymentStatus,
//   } = OrderStore();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const userId = user?.id;

//   const [activeTab, setActiveTab] = useState("all");

//   /* ======================
//      FIX 1: stable fetch
//   ====================== */
//   useEffect(() => {
//     if (userId) fetchOrders(userId);
//   }, [userId]);

//   /* ======================
//      FIX 2: safer seller filter
//   ====================== */
//   const myOrders = useMemo(() => {
//     return (orders || []).filter((order) => {
//       const sellerId =
//         order?.seller?.id ||
//         order?.seller?.data?.id ||
//         order?.seller?.data?.attributes?.id;

//       return sellerId === userId;
//     });
//   }, [orders, userId]);

//   /* ======================
//      FIX 3: stats safe
//   ====================== */
//   const stats = useMemo(() => {
//     const total = myOrders.reduce((s, o) => s + (o?.total || 0), 0);

//     const delivered = myOrders
//       .filter((o) => o?.orderStatus === "delivered")
//       .reduce((s, o) => s + (o?.total || 0), 0);

//     return {
//       totalOrders: myOrders.length,
//       revenue: total,
//       deliveredRevenue: delivered,
//     };
//   }, [myOrders]);

//   /* ======================
//      FIX 4: filter safe
//   ====================== */
//   const filteredOrders = useMemo(() => {
//     if (activeTab === "all") return myOrders;

//     if (activeTab === "revenue") {
//       return myOrders.filter((o) => o?.orderStatus === "delivered");
//     }

//     return myOrders.filter((o) => o?.orderStatus === activeTab);
//   }, [activeTab, myOrders]);

//   /* ======================
//      UI CONFIG (same)
//   ====================== */
//   const statusColors = {
//     pending: "bg-yellow-100 text-yellow-700",
//     accepted: "bg-blue-100 text-blue-700",
//     rejected: "bg-red-100 text-red-700",
//     delivered: "bg-green-100 text-green-700",
//   };

//   const tabs = [
//     { key: "all", label: "All", icon: Package },
//     { key: "pending", label: "Pending", icon: Clock3 },
//     { key: "accepted", label: "Accepted", icon: CheckCircle2 },
//     { key: "delivered", label: "Delivered", icon: Truck },
//     { key: "rejected", label: "Rejected", icon: XCircle },
//     { key: "revenue", label: "Revenue", icon: Banknote },
//   ];
 
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
//       <NavBar />

//       {/* HERO (unchanged) */}
//       <div
//         className="w-full h-[200px] md:h-[300px] bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <h2 className="text-white text-4xl font-bold">My Orders</h2>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-10">

//         {/* HEADER */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold">Dashboard</h1>
//           <p className="text-gray-500">Track your orders & revenue</p>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-3 gap-4 mb-8">
//           <Stat label="Orders" value={stats.totalOrders} />
//           <Stat label="Revenue" value={`${stats.revenue} EGP`} />
//           <Stat label="Delivered" value={`${stats.deliveredRevenue} EGP`} />
//         </div>

//         {/* TABS */}
//         <div className="flex flex-wrap gap-3 mb-8">
//           {tabs.map((tab) => {
//             const Icon = tab.icon;

//             return (
//               <button
//                 key={tab.key}
//                 onClick={() => setActiveTab(tab.key)}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
//                   activeTab === tab.key
//                     ? "bg-black text-white"
//                     : "bg-white hover:bg-gray-100"
//                 }`}
//               >
//                 <Icon size={16} />
//                 {tab.label}
//               </button>
//             );
//           })}
//         </div>

//         {/* CONTENT */}
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//           </div>
//         ) : filteredOrders.length === 0 ? (
//           <div className="bg-white p-10 text-center rounded-2xl">
//             No orders found
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {filteredOrders.map((order) => (
//               <div
//                 key={order?.documentId}
//                 className="bg-white p-6 rounded-2xl shadow border"
//               >

//                 {/* TOP */}
//                 <div className="flex justify-between mb-3">
//                   <div>
//                     <h2 className="font-bold">Order #{order?.id}</h2>
//                     <p className="text-gray-500 text-sm">
//                       {order?.createdAt
//                         ? new Date(order.createdAt).toLocaleString()
//                         : ""}
//                     </p>
//                   </div>

//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${
//                       statusColors[order?.orderStatus] || ""
//                     }`}
//                   >
//                     {order?.orderStatus}
//                   </span>
//                 </div>

//                 {/* INFO */}
//                 <div className="grid md:grid-cols-3 gap-3 mb-4">
//                   <Info label="Customer" value={order?.users_permissions_user?.email} />
//                   <Info label="Phone" value={order?.phone} />
//                   <Info label="Address" value={order?.address} />
//                 </div>

//                 {/* ITEMS */}
//                 <div className="border-t pt-4">
//                   {order?.items?.map((item, i) => (
//                     <div
//                       key={i}
//                       className="flex justify-between bg-gray-50 p-3 rounded-xl mb-2"
//                     >
//                       <span>{item?.book?.title}</span>
//                       <span>x{item?.quantity}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* ACTIONS */}
//                 {/* <div className="flex gap-2 mt-4">

//                   {order?.orderStatus === "accepted" && (
//                     <button
//                       onClick={() =>
//                         updateOrderStatus(order?.documentId, "delivered")
//                       }
//                       className="px-4 py-2 bg-green-600 text-white rounded-lg"
//                     >
//                       Mark Delivered
//                     </button>
//                   )}

//                   {order?.orderStatus !== "delivered" && (
//                     <>
//                       <button
//                         onClick={() =>
//                           updatePaymentStatus(order?.documentId, "paid")
//                         }
//                         className="px-3 py-1 bg-green-600 text-white rounded-lg"
//                       >
//                         Paid
//                       </button>

//                       <button
//                         onClick={() =>
//                           updatePaymentStatus(order?.documentId, "failed")
//                         }
//                         className="px-3 py-1 bg-red-600 text-white rounded-lg"
//                       >
//                         Failed
//                       </button>
//                     </>
//                   )}
//                 </div> */}
//                   {/* ACTIONS */}
// <div className="flex gap-2 mt-4">

//   {order?.orderStatus === "accepted" && (
//     <button
//       onClick={() =>
//         updateOrderStatus(order?.documentId, "delivered")
//       }
//       className="px-4 py-2 bg-green-600 text-white rounded-lg"
//     >
//       Mark Delivered
//     </button>
//   )}

//   {/* PAYMENT STATUS */}
//   {order?.paymentStatus === "pending" &&
//     order?.orderStatus !== "rejected" && (
//       <>
//         <button
//           onClick={() =>
//             updatePaymentStatus(order?.documentId, "paid")
//           }
//           className="px-3 py-1 bg-green-600 text-white rounded-lg"
//         >
//           Paid
//         </button>

//         <button
//           onClick={() =>
//             updatePaymentStatus(order?.documentId, "failed")
//           }
//           className="px-3 py-1 bg-red-600 text-white rounded-lg"
//         >
//           Failed
//         </button>
//       </>
//     )}

//   {order?.paymentStatus === "paid" && (
//     <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-semibold">
//       Payment Paid
//     </span>
//   )}

//   {order?.paymentStatus === "failed" && (
//     <span className="px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold">
//       Payment Failed
//     </span>
//   )}

// </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

// /* ---------------- COMPONENTS (UNCHANGED) ---------------- */

// function Stat({ label, value }) {
//   return (
//     <div className="bg-white p-4 rounded-xl border">
//       <p className="text-gray-500 text-sm">{label}</p>
//       <h3 className="text-xl font-bold">{value}</h3>
//     </div>
//   );
// }

// function Info({ label, value }) {
//   return (
//     <div className="bg-gray-50 p-3 rounded-xl">
//       <p className="text-gray-500 text-sm">{label}</p>
//       <p className="font-semibold">{value}</p>
//     </div>
//   );
// }


import { useEffect, useMemo, useState } from "react";
import { OrderStore } from "../store/OrderStore";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import {
  Package,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  Banknote,
} from "lucide-react";

export default function MyOrders() {
  const {
    orders,
    loading,
    fetchOrders,
    updateOrderStatus,
    updatePaymentStatus,
  } = OrderStore();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [activeTab, setActiveTab] = useState("all");

  // ======================
  // ONLY ADD (IMAGE MODAL)
  // ======================
  const [selectedImage, setSelectedImage] = useState(null);

  const getImageUrl = (url) => {
    if (!url) return "";
    return `${import.meta.env.VITE_API_URL}${url}`;
  };

  useEffect(() => {
    if (userId) fetchOrders(userId);
  }, [userId]);

  const myOrders = useMemo(() => {
    return (orders || []).filter((order) => {
      const sellerId =
        order?.seller?.id ||
        order?.seller?.data?.id ||
        order?.seller?.data?.attributes?.id;

      return sellerId === userId;
    });
  }, [orders, userId]);

  const stats = useMemo(() => {
    const total = myOrders.reduce((s, o) => s + (o?.total || 0), 0);

    const delivered = myOrders
      .filter((o) => o?.orderStatus === "delivered")
      .reduce((s, o) => s + (o?.total || 0), 0);

    return {
      totalOrders: myOrders.length,
      revenue: total,
      deliveredRevenue: delivered,
    };
  }, [myOrders]);

  const filteredOrders = useMemo(() => {
    if (activeTab === "all") return myOrders;

    if (activeTab === "revenue") {
      return myOrders.filter((o) => o?.orderStatus === "delivered");
    }

    return myOrders.filter((o) => o?.orderStatus === activeTab);
  }, [activeTab, myOrders]);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    delivered: "bg-green-100 text-green-700",
  };

  const tabs = [
    { key: "all", label: "All", icon: Package },
    { key: "pending", label: "Pending", icon: Clock3 },
    { key: "accepted", label: "Accepted", icon: CheckCircle2 },
    { key: "delivered", label: "Delivered", icon: Truck },
    { key: "rejected", label: "Rejected", icon: XCircle },
    { key: "revenue", label: "Revenue", icon: Banknote },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <NavBar />

      {/* HERO */}
      <div
        className="w-full h-[200px] md:h-[300px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">My Orders</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Track your orders & revenue</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Stat label="Orders" value={stats.totalOrders} />
          <Stat label="Revenue" value={`${stats.revenue} EGP`} />
          <Stat label="Delivered" value={`${stats.deliveredRevenue} EGP`} />
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition ${
                  activeTab === tab.key
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl">
            No orders found
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order?.documentId}
                className="bg-white p-6 rounded-2xl shadow border"
              >

                {/* TOP */}
                <div className="flex justify-between mb-3">
                  <div>
                    <h2 className="font-bold">Order #{order?.id}</h2>
                    <p className="text-gray-500 text-sm">
                      {order?.createdAt
                        ? new Date(order.createdAt).toLocaleString()
                        : ""}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusColors[order?.orderStatus] || ""
                    }`}
                  >
                    {order?.orderStatus}
                  </span>
                </div>

                {/* INFO */}
                <div className="grid md:grid-cols-3 gap-3 mb-4">
                  <Info label="Customer" value={order?.users_permissions_user?.email} />
                  <Info label="Phone" value={order?.phone} />
                  <Info label="Address" value={order?.address} />
                </div>

                {/* ITEMS */}
                <div className="border-t pt-4">
                  {order?.items?.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between bg-gray-50 p-3 rounded-xl mb-2"
                    >
                      <span>{item?.book?.title}</span>
                      <span>x{item?.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* ACTIONS (UNCHANGED) */}
                <div className="flex gap-2 mt-4">

                  {order?.orderStatus === "accepted" && (
                    <button
                      onClick={() =>
                        updateOrderStatus(order?.documentId, "delivered")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Mark Delivered
                    </button>
                  )}

                  {order?.paymentStatus === "pending" &&
                    order?.orderStatus !== "rejected" && (
                      <>
                        <button
                          onClick={() =>
                            updatePaymentStatus(order?.documentId, "paid")
                          }
                          className="px-3 py-1 bg-green-600 text-white rounded-lg"
                        >
                          Paid
                        </button>

                        <button
                          onClick={() =>
                            updatePaymentStatus(order?.documentId, "failed")
                          }
                          className="px-3 py-1 bg-red-600 text-white rounded-lg"
                        >
                          Failed
                        </button>
                      </>
                    )}

                  {order?.paymentStatus === "paid" && (
                    <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-semibold">
                      Payment Paid
                    </span>
                  )}

                  {order?.paymentStatus === "failed" && (
                    <span className="px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold">
                      Payment Failed
                    </span>
                  )}
                </div>

                {/* ====================== */}
                {/* ONLY ADD PAYMENT PROOF */}
                {/* ====================== */}
                {order?.paymentProof?.url && (
                  <button
                    onClick={() =>
                      setSelectedImage(getImageUrl(order.paymentProof.url))
                    }
                    className="mt-3 text-blue-600 text-sm underline"
                  >
                    View Payment Proof
                  </button>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL ONLY ADD */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={selectedImage}
            alt="payment proof"
            className="max-w-[90%] max-h-[90%] rounded-lg"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

/* COMPONENTS */
function Stat({ label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl border">
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-xl">
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}