

import { useEffect, useState } from "react";
import {
  Package,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
} from "lucide-react";

import { OrderStore } from "../store/OrderStore";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

export default function SellerDashboard() {
  const { orders, loading, fetchOrders, updateOrderStatus } = OrderStore();

  const [activeTab, setActiveTab] = useState("all");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  /* ======================
     FIX 1: useEffect dependency safe
  ====================== */
  useEffect(() => {
    fetchOrders();
  }, []);

  /* ======================
     TABS (unchanged UI)
  ====================== */
  const tabs = [
    { key: "all", label: "All", icon: Package, color: "text-gray-700" },
    { key: "pending", label: "Pending", icon: Clock3, color: "text-yellow-500" },
    { key: "accepted", label: "Accepted", icon: CheckCircle2, color: "text-blue-500" },
    { key: "rejected", label: "Rejected", icon: XCircle, color: "text-red-500" },
    { key: "delivered", label: "Delivered", icon: Truck, color: "text-green-500" },
  ];

  /* ======================
     FIX 2: safer baseOrders logic
  ====================== */
  const baseOrders = (orders || []).filter((o) => {
    const sellerId = o?.seller?.id;

    const isUnassignedPending = !sellerId && o?.orderStatus === "pending";
    const isMyOrder = sellerId === userId;

    return isUnassignedPending || isMyOrder;
  });

  /* ======================
     FIX 3: safer revenue calc
  ====================== */
  const sellerRevenue = baseOrders.reduce((sum, order) => {
    if (order?.orderStatus === "rejected") return sum;
    return sum + (order?.total || 0);
  }, 0);

  /* ======================
     FIX 4: cleaner filtering logic
  ====================== */
  const filteredOrders = baseOrders.filter((o) => {
    if (!o) return false;

    if (activeTab === "all") {
      return o.orderStatus !== "delivered";
    }

    return o.orderStatus === activeTab && o.orderStatus !== "delivered";
  });

  /* ======================
     FIX 5: stats safety
  ====================== */
  const stats = {
    total: baseOrders.length,
    pending: baseOrders.filter((o) => o?.orderStatus === "pending").length,
    accepted: baseOrders.filter((o) => o?.orderStatus === "accepted").length,
    rejected: baseOrders.filter((o) => o?.orderStatus === "rejected").length,
    delivered: baseOrders.filter((o) => o?.orderStatus === "delivered").length,
  };

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    delivered: "bg-green-100 text-green-700",
  };

  /* ======================
     FIX 6: safer update logic
  ====================== */
  const handleStatusChange = (orderId, status) => {
    if (!orderId) return;

    if (status === "accepted") {
      updateOrderStatus(orderId, status, { seller: userId });
    } else {
      updateOrderStatus(orderId, status);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NavBar />

      {/* HERO (unchanged) */}
      <div
        className="w-full h-[220px] md:h-[300px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">Seller Dashboard</h2>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Manage Orders</h1>
          <p className="text-slate-500">Accept and manage your incoming orders</p>
        </div>

        {/* STATS (unchanged UI) */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Stat label="Total" value={stats.total} />
          <Stat label="Pending" value={stats.pending} color="text-yellow-600" />
          <Stat label="Accepted" value={stats.accepted} color="text-blue-600" />
          <Stat label="Rejected" value={stats.rejected} color="text-red-600" />
          <Stat label="Delivered" value={stats.delivered} color="text-green-600" />
          <Stat label="Revenue" value={`$${sellerRevenue}`} color="text-emerald-600" />
        </div>

        {/* TABS (unchanged UI) */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl border ${
                  activeTab === tab.key ? "bg-black text-white" : "bg-white"
                }`}
              >
                <Icon size={18} className={tab.color} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white p-10 text-center rounded-2xl">
            No orders found
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order?.documentId}
                className="bg-white p-6 rounded-2xl shadow border"
              >
                <div className="flex justify-between">
                  <h2 className="font-bold">Order #{order?.id}</h2>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusColors[order?.orderStatus] || ""
                    }`}
                  >
                    {order?.orderStatus}
                  </span>
                </div>

                <div className="mt-4 grid md:grid-cols-3 gap-3">
                  <Info
                    label="Customer"
                    value={order?.users_permissions_user?.email}
                  />
                  <Info label="Phone" value={order?.phone} />
                  <Info label="Address" value={order?.address} />
                </div>

                <div className="mt-4 flex gap-2">
                  {/* {order?.orderStatus === "pending" && (
                    <button
                      onClick={() =>
                        handleStatusChange(order?.documentId, "accepted")
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Accept
                    </button>
                  )} */}

                  {order?.orderStatus === "pending" && (
  <>
    <button
      onClick={() =>
        handleStatusChange(order?.documentId, "accepted")
      }
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Accept
    </button>

    <button
      onClick={() =>
        handleStatusChange(order?.documentId, "rejected")
      }
      className="px-4 py-2 bg-red-600 text-white rounded-lg"
    >
      Reject
    </button>
  </>
)}

                  {order?.orderStatus === "accepted" && (
                    <button
                      onClick={() =>
                        handleStatusChange(order?.documentId, "delivered")
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded-lg"
                    >
                      Delivered
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* ---------------- COMPONENTS (UNCHANGED) ---------------- */

function Stat({ label, value, color }) {
  return (
    <div className="bg-white p-4 rounded-2xl border">
      <p className="text-gray-500 text-sm">{label}</p>
      <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
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