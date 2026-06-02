
import { useMemo, useState, useEffect } from "react";
import api from "../api/api";
import { useAuthStore } from "../store/auth";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import {
  BarChart3,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

export default function AdminDashboard() {
  const user = useAuthStore((s) => s.user);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("ALL");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        "/orders?populate=*"
      );
      setOrders(res?.data?.data || []);
     
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // STATS (UPDATED)
  // ======================
  const stats = useMemo(() => {
    const total = orders.length;

    const pending = orders.filter(
      (o) => o.orderStatus === "pending"
    ).length;

    const accepted = orders.filter(
      (o) => o.orderStatus === "accepted"
    ).length;

    const rejected = orders.filter(
      (o) => o.orderStatus === "rejected"
    ).length;

    // ✅ SUCCESS = DELIVERED (زي ما انت عايز من seller dashboard logic)
    const success = orders.filter(
      (o) => o.orderStatus === "delivered"
    ).length;

    const failed = orders.filter(
      (o) => o.paymentStatus === "failed"
    ).length;

    const sales = orders.reduce(
      (acc, o) => acc + (o.total || 0),
      0
    );

    return {
      total,
      pending,
      accepted,
      rejected,
      success,
      failed,
      sales,
    };
  }, [orders]);

  // ======================
  // FILTER
  // ======================
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (tab === "ALL") return true;
      if (tab === "PENDING")
        return o.orderStatus === "pending";
      if (tab === "ACCEPTED")
        return o.orderStatus === "accepted";
      if (tab === "REJECTED")
        return o.orderStatus === "rejected";
      if (tab === "SUCCESS")
        return o.orderStatus === "delivered";
      if (tab === "FAILED")
        return o.paymentStatus === "failed";
      return true;
    });
  }, [orders, tab]);

  // ======================
  // CHART
  // ======================
  const chartData = useMemo(() => {
    return [
      { name: "Pending", value: stats.pending },
      { name: "Accepted", value: stats.accepted },
      { name: "Rejected", value: stats.rejected },
      { name: "Success", value: stats.success },
    ];
  }, [stats]);
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
<NavBar />
 <div
        className="w-full h-[200px] md:h-[300px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">Admin Dashboard</h2>
        </div>
      </div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>
      </div>

      {/* ======================
          STATS CARDS (UPDATED)
      ====================== */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">

        <Stat
          icon={<ShoppingCart />}
          label="Total Orders"
          value={stats.total}
        />

        <Stat
          icon={<Clock />}
          label="Pending"
          value={stats.pending}
        />

        <Stat
          icon={<CheckCircle />}
          label="Accepted"
          value={stats.accepted}
        />

        <Stat
          icon={<XCircle />}
          label="Rejected"
          value={stats.rejected}
        />

        <Stat
          icon={<DollarSign />}
          label="Sales"
          value={`$${stats.sales}`}
        />

        {/* ✅ NEW: SUCCESS (DELIVERED) */}
        <Stat
          icon={<CheckCircle />}
          label="Delivered"
          value={stats.success}
        />

        <Stat
          icon={<Users />}
          label="Success Rate"
          value={`${Math.round(
            (stats.success /
              (stats.total || 1)) *
              100
          )}%`}
        />
      </div>

      {/* ======================
          CHART (UNCHANGED)
      ====================== */}
      <div className="bg-white p-4 rounded-xl mb-6 h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ======================
          TABS
      ====================== */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          "ALL",
          "PENDING",
          "ACCEPTED",
          "REJECTED",
          "SUCCESS",
          "FAILED",
        ].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
              tab === t
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ======================
          TABLE
      ====================== */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Order</th>
              <th>Customer</th>
              <th>Seller</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((o) => (
              <tr
                key={o.id}
                className="border-t"
              >
                <td className="p-3">
                  #{o.id}
                </td>

                <td>
                  {o?.users_permissions_user
                    ?.username || "-"}
                </td>

                
                  <td>
  {o?.seller?.username ||
    o?.seller?.name ||
    o?.seller?.email ||
    "Unassigned"}
</td>
               

                <td>{o.orderStatus}</td>
                <td>{o.paymentStatus}</td>
                <td>${o.total}</td>
                <td>
                  {new Date(
                    o.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
}

// ======================
// STAT CARD
// ======================
function Stat({ icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
      <div className="text-pink-500">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>
        <p className="font-bold text-lg">
          {value}
        </p>
      </div>
    </div>
  );
}

// import { useMemo, useState, useEffect } from "react";
// import api from "../api/api";
// import { useAuthStore } from "../store/auth";

// import {
//   ShoppingCart,
//   CheckCircle,
//   XCircle,
//   Clock,
//   DollarSign,
//   Users,
// } from "lucide-react";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// export default function AdminDashboard() {
//   const user = useAuthStore((s) => s.user);

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [tab, setTab] = useState("ALL");

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get(
//         `/orders?populate[users_permissions_user]=*&populate[seller]=*&populate[items][populate]=book`
//       );

//       setOrders(res?.data?.data || []);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ======================
//   // STATS (زي ما هي)
//   // ======================
//   const stats = useMemo(() => {
//     const total = orders.length;

//     const pending = orders.filter((o) => o.orderStatus === "pending").length;
//     const accepted = orders.filter((o) => o.orderStatus === "accepted").length;
//     const rejected = orders.filter((o) => o.orderStatus === "rejected").length;

//     const success = orders.filter((o) => o.orderStatus === "delivered").length;

//     const failed = orders.filter((o) => o.paymentStatus === "failed").length;

//     const sales = orders.reduce((acc, o) => acc + (o.total || 0), 0);

//     return { total, pending, accepted, rejected, success, failed, sales };
//   }, [orders]);

//   const filteredOrders = useMemo(() => {
//     return orders.filter((o) => {
//       if (tab === "ALL") return true;
//       if (tab === "PENDING") return o.orderStatus === "pending";
//       if (tab === "ACCEPTED") return o.orderStatus === "accepted";
//       if (tab === "REJECTED") return o.orderStatus === "rejected";
//       if (tab === "SUCCESS") return o.orderStatus === "delivered";
//       if (tab === "FAILED") return o.paymentStatus === "failed";
//       return true;
//     });
//   }, [orders, tab]);

//   const chartData = useMemo(() => {
//     return [
//       { name: "Pending", value: stats.pending },
//       { name: "Accepted", value: stats.accepted },
//       { name: "Rejected", value: stats.rejected },
//       { name: "Success", value: stats.success },
//     ];
//   }, [stats]);

//   // ======================
//   // 🔥 FIX: SAFE USER NAME (Strapi 5)
//   // ======================
//   const getUserName = (u) =>
//     u?.username ||
//     u?.data?.username ||
//     u?.data?.attributes?.username ||
//     u?.data?.attributes?.firstName ||
//     "-";

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">

//         <Stat icon={<ShoppingCart />} label="Total Orders" value={stats.total} />
//         <Stat icon={<Clock />} label="Pending" value={stats.pending} />
//         <Stat icon={<CheckCircle />} label="Accepted" value={stats.accepted} />
//         <Stat icon={<XCircle />} label="Rejected" value={stats.rejected} />
//         <Stat icon={<DollarSign />} label="Sales" value={`$${stats.sales}`} />
//         <Stat icon={<CheckCircle />} label="Delivered" value={stats.success} />
//         <Stat
//           icon={<Users />}
//           label="Success Rate"
//           value={`${Math.round((stats.success / (stats.total || 1)) * 100)}%`}
//         />
//       </div>

//       {/* CHART */}
//       <div className="bg-white p-4 rounded-xl mb-6 h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" fill="#ec4899" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* TABS */}
//       <div className="flex gap-2 mb-4 flex-wrap">
//         {["ALL", "PENDING", "ACCEPTED", "REJECTED", "SUCCESS", "FAILED"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`px-4 py-2 rounded-lg text-sm font-semibold border ${
//               tab === t ? "bg-black text-white" : "bg-white"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-xl overflow-hidden">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Order</th>
//               <th>Customer</th>
//               <th>Seller</th>
//               <th>Status</th>
//               <th>Payment</th>
//               <th>Total</th>
//               <th>Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredOrders.map((o) => (
//               <tr key={o.id} className="border-t">

//                 <td className="p-3">#{o.id}</td>

//                 {/* ✅ CUSTOMER FIX */}
//                 <td>{getUserName(o?.users_permissions_user)}</td>

//                 {/* ✅ SELLER FIX */}
//                 <td>{getUserName(o?.seller) || "Unassigned"}</td>

//                 <td>{o.orderStatus}</td>
//                 <td>{o.paymentStatus}</td>
//                 <td>${o.total}</td>
//                 <td>{new Date(o.createdAt).toLocaleDateString()}</td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// // STAT CARD (زي ما هي)
// function Stat({ icon, label, value }) {
//   return (
//     <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
//       <div className="text-pink-500">{icon}</div>
//       <div>
//         <p className="text-xs text-gray-500">{label}</p>
//         <p className="font-bold text-lg">{value}</p>
//       </div>
//     </div>
//   );
// }