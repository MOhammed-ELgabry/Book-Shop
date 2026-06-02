
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
  AlertTriangle,
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
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/orders?populate=*");

      // ترتيب من الجديد للأقدم
      const sorted = (res?.data?.data || []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setOrders(sorted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // STATS
  // ======================
  const stats = useMemo(() => {
    const total = orders.length;

    const pending = orders.filter((o) => o.orderStatus === "pending").length;
    const accepted = orders.filter((o) => o.orderStatus === "accepted").length;
    const rejected = orders.filter((o) => o.orderStatus === "rejected").length;
    const success = orders.filter((o) => o.orderStatus === "delivered").length;
    const failed = orders.filter((o) => o.paymentStatus === "failed").length;

    const sales = orders.reduce((acc, o) => acc + (o.total || 0), 0);

    return { total, pending, accepted, rejected, success, failed, sales };
  }, [orders]);

  // ======================
  // FILTER
  // ======================
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (tab === "ALL") return true;
      if (tab === "PENDING") return o.orderStatus === "pending";
      if (tab === "ACCEPTED") return o.orderStatus === "accepted";
      if (tab === "REJECTED") return o.orderStatus === "rejected";
      if (tab === "SUCCESS") return o.orderStatus === "delivered";
      if (tab === "FAILED") return o.paymentStatus === "failed";
      return true;
    });
  }, [orders, tab]);

  // ======================
  // CHART
  // ======================
  const chartData = useMemo(() => [
    { name: "Pending", value: stats.pending },
    { name: "Accepted", value: stats.accepted },
    { name: "Rejected", value: stats.rejected },
    { name: "Success", value: stats.success },
  ], [stats]);

  // ======================
  // TOP SELLERS
  // ======================
  const topSellers = useMemo(() => {
    const map = {};

    orders.forEach((o) => {
      const seller = o?.seller?.username || "Unknown";
      map[seller] = (map[seller] || 0) + (o.total || 0);
    });

    return Object.entries(map)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [orders]);

  // ======================
  // ALERTS
  // ======================
  const alerts = useMemo(() => {
    const latePending = orders.filter(
      (o) =>
        o.orderStatus === "pending" &&
        new Date(o.createdAt) < new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    );

    const failedPayments = orders.filter(
      (o) => o.paymentStatus === "failed"
    );

    return { latePending, failedPayments };
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <NavBar />

      {/* HEADER IMAGE */}
      <div
        className="w-full h-[200px] md:h-[300px] bg-cover bg-center relative mb-6"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-4xl font-bold">Admin Dashboard</h2>
        </div>
      </div>

      {/* ================= ALERTS ================= */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-yellow-50 p-4 rounded-xl border">
          <h3 className="font-bold flex items-center gap-2">
            <AlertTriangle /> Pending Alerts
          </h3>
          <p>{alerts.latePending.length} delayed orders</p>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border">
          <h3 className="font-bold flex items-center gap-2">
            <XCircle /> Failed Payments
          </h3>
          <p>{alerts.failedPayments.length} failed</p>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
        <Stat icon={<ShoppingCart />} label="Total Orders" value={stats.total} />
        <Stat icon={<Clock />} label="Pending" value={stats.pending} />
        <Stat icon={<CheckCircle />} label="Accepted" value={stats.accepted} />
        <Stat icon={<XCircle />} label="Rejected" value={stats.rejected} />
        <Stat icon={<DollarSign />} label="Sales" value={`$${stats.sales}`} />
        <Stat icon={<CheckCircle />} label="Delivered" value={stats.success} />
        <Stat icon={<Users />} label="Success Rate"
          value={`${Math.round((stats.success / (stats.total || 1)) * 100)}%`} />
      </div>

      {/* ================= CHART ================= */}
      <div className="bg-white p-4 rounded-xl mb-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= TOP SELLERS ================= */}
      <div className="bg-white p-4 rounded-xl mb-6">
        <h3 className="font-bold mb-3">Top Performers</h3>
        {topSellers.map((s, i) => (
          <div key={i} className="flex justify-between border-b py-2">
            <span>{s.name}</span>
            <span>${s.total}</span>
          </div>
        ))}
      </div>

      {/* ================= TABLE ================= */}
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
                className="border-t cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedOrder(o)}
              >
                <td className="p-3">#{o.id}</td>

                <td>{o?.users_permissions_user?.username || "-"}</td>

                <td>
                  {o?.seller?.username ||
                    o?.seller?.name ||
                    o?.seller?.email ||
                    "Unassigned"}
                </td>

                <td>{o.orderStatus}</td>
                <td>{o.paymentStatus}</td>
                <td>${o.total}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ORDER DRAWER ================= */}
     {selectedOrder && (
  <div className="fixed inset-0 z-50 flex justify-end">

    {/* BACKDROP (click outside area) */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setSelectedOrder(null)}
    />

    {/* DRAWER */}
    <div className="relative w-[350px] h-full bg-white shadow-2xl p-4 overflow-auto z-10">
      
      {/* Close button (optional) */}
      <button
        className="mb-4 text-red-500"
        onClick={() => setSelectedOrder(null)}
      >
        Close
      </button>

      <h2 className="font-bold mb-3">
        Order #{selectedOrder.id}
      </h2>

      <p>Customer: {selectedOrder?.users_permissions_user?.username}</p>
      <p>Seller: {selectedOrder?.seller?.username}</p>
      <p>Status: {selectedOrder.orderStatus}</p>
      <p>Payment: {selectedOrder.paymentStatus}</p>
      <p>Total: ${selectedOrder.total}</p>
    </div>

  </div>
)}

      <Footer />
    </div>
  );
}

// ======================
function Stat({ icon, label, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
      <div className="text-pink-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </div>
  );
}