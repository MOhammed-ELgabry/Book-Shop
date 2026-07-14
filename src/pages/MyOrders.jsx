
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

//   // ======================
//   // ONLY ADD (IMAGE MODAL)
//   // ======================
//   const [selectedImage, setSelectedImage] = useState(null);

//   const getImageUrl = (url) => {
//     if (!url) return "";
//     return `${import.meta.env.VITE_API_URL}${url}`;
//   };

//   useEffect(() => {
//     if (userId) fetchOrders(userId);
//   }, [userId]);

//   const myOrders = useMemo(() => {
//     return (orders || []).filter((order) => {
//       const sellerId =
//         order?.seller?.id ||
//         order?.seller?.data?.id ||
//         order?.seller?.data?.attributes?.id;

//       return sellerId === userId;
//     });
//   }, [orders, userId]);

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

//   const filteredOrders = useMemo(() => {
//     if (activeTab === "all") return myOrders;

//     if (activeTab === "revenue") {
//       return myOrders.filter((o) => o?.orderStatus === "delivered");
//     }

//     return myOrders.filter((o) => o?.orderStatus === activeTab);
//   }, [activeTab, myOrders]);

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

//       {/* HERO */}
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

//                 {/* ACTIONS (UNCHANGED) */}
//                 <div className="flex gap-2 mt-4">

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

//                   {order?.paymentStatus === "pending" &&
//                     order?.orderStatus !== "rejected" && (
//                       <>
//                         <button
//                           onClick={() =>
//                             updatePaymentStatus(order?.documentId, "paid")
//                           }
//                           className="px-3 py-1 bg-green-600 text-white rounded-lg"
//                         >
//                           Paid
//                         </button>

//                         <button
//                           onClick={() =>
//                             updatePaymentStatus(order?.documentId, "failed")
//                           }
//                           className="px-3 py-1 bg-red-600 text-white rounded-lg"
//                         >
//                           Failed
//                         </button>
//                       </>
//                     )}

//                   {order?.paymentStatus === "paid" && (
//                     <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-semibold">
//                       Payment Paid
//                     </span>
//                   )}

//                   {order?.paymentStatus === "failed" && (
//                     <span className="px-3 py-1 rounded-lg bg-red-100 text-red-700 font-semibold">
//                       Payment Failed
//                     </span>
//                   )}
//                 </div>

//                 {/* ====================== */}
//                 {/* ONLY ADD PAYMENT PROOF */}
//                 {/* ====================== */}
//                 {order?.paymentProof?.url && (
//                   <button
//                     onClick={() =>
//                       setSelectedImage(getImageUrl(order.paymentProof.url))
//                     }
//                     className="mt-3 text-blue-600 text-sm underline"
//                   >
//                     View Payment Proof
//                   </button>
//                 )}

//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* MODAL ONLY ADD */}
//       {selectedImage && (
//         <div
//           onClick={() => setSelectedImage(null)}
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//         >
//           <img
//             src={selectedImage}
//             alt="payment proof"
//             className="max-w-[90%] max-h-[90%] rounded-lg"
//           />
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// }

// /* COMPONENTS */
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
      import { motion, AnimatePresence } from "framer-motion";
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
       User,
     Phone,
     MapPin,
     Calendar,
       Eye,
     ShoppingBag,
     ArrowRight,
     TrendingUp,
     ChevronDown,
     ChevronUp,
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
  
    const statusConfig = {
      pending: { color: "bg-amber-50 text-amber-600 border-amber-100", icon: Clock3, label: "Pending" },
     accepted: { color: "bg-blue-50 text-blue-600 border-blue-100", icon: CheckCircle2, label: "Accepted" },
      rejected: { color: "bg-rose-50 text-rose-600 border-rose-100", icon: XCircle, label: "Rejected" },
      delivered: { color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: Truck, label: "Delivered" },
     };
  
     const tabs = [
       { key: "all", label: "All Orders", icon: Package },
       { key: "pending", label: "Pending", icon: Clock3 },
       { key: "accepted", label: "Accepted", icon: CheckCircle2 },
       { key: "delivered", label: "Delivered", icon: Truck },
       { key: "rejected", label: "Rejected", icon: XCircle },
       { key: "revenue", label: "Revenue", icon: Banknote },
     ];
  
     return (
     <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      <NavBar />
   
      {/* Hero Section */}
      <div
       className="w-full h-[280px] md:h-[380px] bg-cover bg-center relative flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
     >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/50 to-slate-950/80
       backdrop-blur-[1px]"></div>
   <div className="relative z-10 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
         className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-md px-4 py-2 rounded-full border
       border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest mb-6"
     >
        <ShoppingBag size={14} />
        Seller Management Hub
     </motion.div>
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
         transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black text-white drop-shadow-2xl tracking-tighter mb-4"
        >
          My <span className="text-orange-500">Orders</span>
        </motion.h1>
        <motion.p
         initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
          className="text-white/70 text-lg md:text-2xl font-medium max-w-2xl mx-auto drop-shadow-md leading-relaxed"
          >
             Professional oversight of your book sales, shipment tracking, and revenue analytics.
           </motion.p>
         </div>
       </div>
  
       <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 -mt-20 relative z-20 pb-24">
  
       {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <StatCard
          label="Total Volume"
           value={stats.totalOrders}
           icon={Package}
          accent="orange"
          description="Total shipments handled"
         />
         <StatCard
           label="Gross Revenue"
           value={`${stats.revenue} EGP`}
          icon={Banknote}
           accent="blue"
           description="Estimated total sales"
         />
         <StatCard
           label="Net Earnings"
           value={`${stats.deliveredRevenue} EGP`}
           icon={TrendingUp}
           accent="emerald"
          description="Confirmed delivery revenue"
         />
       </div>
   
       {/* Control Panel */}
    <div className="bg-white p-6 md:p-8 rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-100 mb-12
       overflow-hidden transition-all hover:shadow-orange-100/50">
   <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
     <div className="space-y-1">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Order Intelligence</h2>
         <p className="text-slate-500 text-base font-medium">Filter and categorize your bookstore's transactions</p>
            </div>
  
            <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-[2rem] border border-slate-100">
               {tabs.map((tab) => {
                 const Icon = tab.icon;
                 const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                 className={`flex items-center gap-2.5 px-5 py-3 rounded-[1.5rem] font-bold text-sm transition-all
       duration-300 ${
                   isActive
                      ? "bg-white text-orange-600 shadow-md ring-1 ring-slate-200"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }`}
                >
        <Icon size={16} className={isActive ? "text-orange-500" : "text-slate-400"} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
   
        {/* Orders List */}
        <div className="min-h-[500px]">
          {loading ? (
           <div className="flex flex-col items-center justify-center py-32 gap-6">
             <div className="relative">
              <div className="w-20 h-20 border-4 border-orange-100 rounded-full" />
             <div className="absolute inset-0 w-20 h-20 border-4 border-orange-500 border-t-transparent rounded-full
       animate-spin" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">Syncing Order
       Data...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
         className="bg-white p-16 md:p-32 text-center rounded-[4rem] shadow-2xl shadow-slate-200/60 border
       border-slate-100"
             >
              <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center mx-auto mb-10
       text-slate-200 transform rotate-12">
                  <Package size={64} />
              </div>
                <h3 className="text-4xl font-black text-slate-900 mb-4">No Orders Found</h3>
               <p className="text-slate-500 text-lg max-w-md mx-auto font-medium leading-relaxed">
                 Your filtered view is currently empty. Try adjusting your categories to find what you're looking for.
               </p>
             </motion.div>
           ) : (
             <div className="grid gap-10">
               <AnimatePresence mode="popLayout">
                 {filteredOrders.map((order, idx) => (
               <OrderCard                  key={order?.documentId || idx}
                    order={order}
                     statusConfig={statusConfig}
                     updateOrderStatus={updateOrderStatus}
                     updatePaymentStatus={updatePaymentStatus}
                     setSelectedImage={setSelectedImage}
                     getImageUrl={getImageUrl}
                   />
                ))}
               </AnimatePresence>
            </div>
           )}
         </div>
       </div>
  
       {/* Image Modal */}
       <AnimatePresence>
         {selectedImage && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             onClick={() => setSelectedImage(null)}
             className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center z-[100] p-6"
           >
             <motion.div
               initial={{ scale: 0.9, opacity: 0, y: 20 }}
             animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
               className="relative max-w-5xl w-full h-auto bg-white rounded-[3rem] overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={selectedImage}
                  alt="payment proof"
                  className="w-full h-full object-contain max-h-[85vh]"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                 className="absolute top-6 right-6 w-14 h-14 bg-slate-900/50 backdrop-blur-md text-white rounded-full flex
       items-center justify-center hover:bg-slate-900 transition-all border border-white/20"
                 >
                   <XCircle size={28} />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
   
          <Footer />
        </div>
      );
    }
  
    /* Enhanced Helper Components */
  
   function StatCard({ label, value, icon: Icon, accent, description }) {
     const accents = {
       orange: "bg-orange-50 text-orange-600 border-orange-100 ring-orange-500/10",
       blue: "bg-blue-50 text-blue-600 border-blue-100 ring-blue-500/10",
       emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-500/10",
     };
   
     return (
       <motion.div
        whileHover={{ y: -8 }}
         className="bg-white p-8 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 group transition-all
       duration-500 relative overflow-hidden"
       >
         <div className="absolute top-0 left-0 w-2 h-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="flex items-center justify-between mb-8">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500
       group-hover:scale-110 group-hover:rotate-3 ${accents[accent]}`}>
             <Icon size={32} />
           </div>
           <div className="p-2 bg-slate-50 rounded-full text-slate-300 group-hover:text-orange-400 transition-colors">
              <ArrowRight size={20} />
            </div>
          </div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{label}</p>
          <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{value}</h3>
          <p className="text-slate-400 text-sm font-medium">{description}</p>
        </motion.div>
      );
    }
   
   function OrderCard({ order, statusConfig, updateOrderStatus, updatePaymentStatus, setSelectedImage, getImageUrl }) {
     const [isExpanded, setIsExpanded] = useState(false);
    const status = statusConfig[order?.orderStatus] || { color: "bg-slate-100 text-slate-600 border-slate-200", icon: Package };
     const StatusIcon = status.icon;
   
     return (
       <motion.div
         layout
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, scale: 0.95 }}
         className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden group
       transition-all duration-500 hover:shadow-orange-100/40 hover:border-orange-100"
        >
          {/* Header: Primary Info */}
         <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer" onClick={() =>
       setIsExpanded(!isExpanded)}>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300
       group-hover:text-orange-500 transition-colors border border-slate-100">
               <Package size={32} />
          </div>
           <div>
             <div className="flex items-center gap-3 mb-2">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order #{order?.id || "N/A"}</h2>
               <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${status.color}
       flex items-center gap-1.5`}>
                  <StatusIcon size={12} />
                  {order?.orderStatus}
                </span>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-orange-400" />
                  {order?.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric',
       year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "Date Unknown"}
                 </div>
               <div className="hidden md:flex items-center gap-2 border-l border-slate-200 pl-4">
                   <User size={16} className="text-orange-400" />
                   {order?.users_permissions_user?.email}
                 </div>
               </div>
             </div>
           </div>
   
           <div className="flex items-center justify-between md:justify-end gap-6">
             <div className="text-right">
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Value</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter">{order?.total || 0} <span className="text-sm
       text-slate-400">EGP</span></p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300
       ${isExpanded ? 'rotate-180 bg-orange-50 text-orange-500' : 'bg-slate-50 text-slate-400'}`}>
               {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
             </div>
           </div>
         </div>
   
         {/* Expandable Body */}
         <AnimatePresence>
           {isExpanded && (
             <motion.div
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
               <div className="px-8 pb-8 pt-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent mb-8" />
   
                 {/* Detailed Info Grid */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                 <DetailBox icon={User} label="Customer Identity" value={order?.users_permissions_user?.email} />
                   <DetailBox icon={Phone} label="Contact Information" value={order?.phone} />
                   <DetailBox icon={MapPin} label="Delivery Location" value={order?.address} />
                </div>
 
                {/* Product Inventory List */}
               <div className="bg-slate-50/80 rounded-[2.5rem] p-8 border border-slate-100 shadow-inner">
                   <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-3">
                       <ShoppingBag size={16} className="text-orange-500" />
                       Shipment Contents ({order?.items?.length || 0} Items)
                      </h4>
                 </div>
                   <div className="grid gap-4">
                     {order?.items?.map((item, i) => (
                        <div key={i} className="bg-white p-5 rounded-3xl flex items-center justify-between border border-slate-100
       shadow-sm transition-all hover:shadow-md hover:border-orange-200">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600
       font-black text-sm shadow-sm border border-orange-100">
                              {i + 1}
                            </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">{item?.book?.title || "Untitle Book"}</span>
                         </div>
                         <div className="flex items-center gap-4">
        <span className="text-slate-400 text-xs font-black uppercase tracking-wider px-4 py-1.5 bg-slate-50 
       rounded-xl border border-slate-100">Qty: {item?.quantity}</span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
   
                 {/* Order Control Center */}
                <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between
       gap-8">
               <div className="flex flex-wrap items-center gap-4">
                 {/* Action: Set to Delivered */}
                 {order?.orderStatus === "accepted" && (
                   <button
                     onClick={() => updateOrderStatus(order?.documentId, "delivered")}                     className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4
       rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 transition-all hover:-translate-y-1 active:scale-95"
                      >
                        <Truck size={20} />
                        Confirm Delivery
                      </button>
                    )}
  
   {/* Action: Payment Approval */}
                    {order?.paymentStatus === "pending" && order?.orderStatus !== "rejected" && (
                       <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-[1.5rem] border border-slate-200">
                         <button
                            onClick={() => updatePaymentStatus(order?.documentId, "paid")}
                           className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-100
       rounded-2xl font-black text-xs transition-all flex items-center gap-2 shadow-sm"
                         >
                           <CheckCircle2 size={16} />
                           Mark as Paid
                         </button>
                         <button
                           onClick={() => updatePaymentStatus(order?.documentId, "failed")}
                            className="px-6 py-3 bg-white hover:bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl
       font-black text-xs transition-all flex items-center gap-2 shadow-sm"
                         >
                           <XCircle size={16} />
                           Mark as Failed
                         </button>
                       </div>
                     )}
   
                     {/* Status Indicators */}
                     {order?.paymentStatus === "paid" && (
                       <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-6 py-4 rounded-2xl
       font-black text-xs border border-emerald-100 shadow-sm">
                        <CheckCircle2 size={18} />
                        PAYMENT VERIFIED
                      </div>
                   )}
                  {order?.paymentStatus === "failed" && (
                      <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-4 rounded-2xl font-black
       text-xs border border-rose-100 shadow-sm">
                        <XCircle size={18} />
                        PAYMENT REJECTED
                      </div>
                    )}
                  </div>
   
                  {/* Proof Management */}
                 {order?.paymentProof?.url && (
                     <button
                    onClick={() => setSelectedImage(getImageUrl(order.paymentProof.url))}
                       className="inline-flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-widest
       hover:text-blue-800 transition-all group"
                     >
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100
       transition-colors">
                        <Eye size={18} />
                        </div>
                      View Proof
                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
     );
    }
   
    function DetailBox({ icon: Icon, label, value }) {
      return (
        <div className="p-6 rounded-[2rem] bg-white border border-slate-100 flex items-center gap-5 transition-all hover:shadow-lg
       hover:border-orange-100 group">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400
       group-hover:text-orange-500 transition-colors border border-slate-100">
            <Icon size={22} />
         </div>
         <div className="flex-1 min-w-0">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm font-bold text-slate-700 truncate" title={value}>{value || "Not Provided"}</p>
          </div>
       </div>
     );
    }
