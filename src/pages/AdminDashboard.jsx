
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
  ArrowUpRight,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  ChevronRight,
  User,
  MapPin,
  CreditCard,
  Search,
  Filter
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
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
    { name: "Pending", value: stats.pending, color: "#f59e0b" },
    { name: "Accepted", value: stats.accepted, color: "#6366f1" },
    { name: "Rejected", value: stats.rejected, color: "#ef4444" },
    { name: "Success", value: stats.success, color: "#10b981" },
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

  const tabsConfig = [
    { key: "ALL", label: "All Orders", icon: <PackageIcon size={16} /> },
    { key: "PENDING", label: "Pending", icon: <Clock size={16} /> },
    { key: "ACCEPTED", label: "Accepted", icon: <CheckCircle size={16} /> },
    { key: "REJECTED", label: "Rejected", icon: <XCircle size={16} /> },
    { key: "SUCCESS", label: "Success", icon: <TrendingUp size={16} /> },
    { key: "FAILED", label: "Failed", icon: <AlertTriangle size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      <NavBar />

      {/* Modern Header Section */}
      <div className="relative w-full h-[280px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-transparent backdrop-blur-[1px]" />
        <div className="relative h-full max-w-[1440px] mx-auto px-6 flex flex-col justify-center pt-10">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-pink-600 rounded-xl shadow-lg">
                  <LayoutDashboard className="text-white" size={24} />
               </div>
               <span className="text-pink-200 text-xs font-bold uppercase tracking-[0.2em]">Management Suite</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-200 text-lg font-medium opacity-90 max-w-xl leading-relaxed">
              Global overview of system performance, order statuses, and sales analytics.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 -mt-12 pb-24 relative z-10">
        
        {/* ================= ALERTS ================= */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="group bg-amber-50 p-6 rounded-[2rem] border-2 border-amber-100 shadow-sm transition-all hover:shadow-xl hover:shadow-amber-100/50 flex items-start gap-5">
            <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="font-black text-amber-800 text-lg flex items-center gap-2">
                Pending Alerts
              </h3>
              <p className="text-amber-700/70 font-medium">{alerts.latePending.length} orders are delayed by 48h+</p>
            </div>
            <ArrowUpRight className="ml-auto text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="group bg-rose-50 p-6 rounded-[2rem] border-2 border-rose-100 shadow-sm transition-all hover:shadow-xl hover:shadow-rose-100/50 flex items-start gap-5">
            <div className="p-4 bg-rose-100 text-rose-600 rounded-2xl group-hover:scale-110 transition-transform">
              <XCircle size={24} />
            </div>
            <div>
              <h3 className="font-black text-rose-800 text-lg flex items-center gap-2">
                Payment Failures
              </h3>
              <p className="text-rose-700/70 font-medium">{alerts.failedPayments.length} transactions were declined recently</p>
            </div>
            <ArrowUpRight className="ml-auto text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-10">
          <StatCard icon={<ShoppingCart size={20} />} label="Total" value={stats.total} color="indigo" />
          <StatCard icon={<Clock size={20} />} label="Pending" value={stats.pending} color="amber" />
          <StatCard icon={<CheckCircle size={20} />} label="Accepted" value={stats.accepted} color="indigo" />
          <StatCard icon={<XCircle size={20} />} label="Rejected" value={stats.rejected} color="rose" />
          <StatCard icon={<DollarSign size={20} />} label="Revenue" value={`$${stats.sales.toLocaleString()}`} color="emerald" highlight />
          <StatCard icon={<TrendingUp size={20} />} label="Fulfilled" value={stats.success} color="sky" />
          <StatCard icon={<Users size={20} />} label="Growth" value={`${Math.round((stats.success / (stats.total || 1)) * 100)}%`} color="violet" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10 mb-10">
          {/* ================= CHART ================= */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <h3 className="text-xl font-black text-slate-800">Order Distribution</h3>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Status breakdown</p>
               </div>
               <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
               </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= TOP SELLERS ================= */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-black text-slate-800">Top Performers</h3>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Revenue by seller</p>
            </div>
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {topSellers.map((s, i) => (
                <div key={i} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${i === 0 ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-500'}`}>
                      {i + 1}
                    </div>
                    <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">{s.name}</span>
                  </div>
                  <span className="font-black text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-100 shadow-sm">${s.total.toLocaleString()}</span>
                </div>
              ))}
              {topSellers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 opacity-30">
                   <Users size={48} />
                   <p className="font-bold mt-2">No data yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 mb-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {tabsConfig.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 whitespace-nowrap ${
                  tab === item.key 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search orders..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 animate-pulse">
                <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Syncing Database...</p>
             </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-32 text-center">
              <div className="text-6xl mb-6 opacity-20">📦</div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">No matching orders</h3>
              <p className="text-slate-400 max-w-sm mx-auto">We couldn't find any orders in this category.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 font-black text-xs text-slate-400 uppercase tracking-widest">Order ID</th>
                    <th className="p-6 font-black text-xs text-slate-400 uppercase tracking-widest">Customer</th>
                    <th className="p-6 font-black text-xs text-slate-400 uppercase tracking-widest">Assigned Seller</th>
                    <th className="p-6 font-black text-xs text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="p-6 font-black text-xs text-slate-400 uppercase tracking-widest">Payment</th>
                    <th className="p-6 font-black text-xs text-slate-400 uppercase tracking-widest">Value</th>
                    <th className="p-6 font-black text-xs text-slate-400 uppercase tracking-widest">Date</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {filteredOrders.map((o) => (
                    <tr
                      key={o.id}
                      className="group cursor-pointer hover:bg-slate-50/80 transition-colors"
                      onClick={() => setSelectedOrder(o)}
                    >
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center font-black text-xs group-hover:bg-pink-600 group-hover:text-white transition-all">
                              #{o.id}
                           </div>
                           <ChevronRight className="text-slate-300 opacity-0 group-hover:opacity-100 transition-all -ml-1 group-hover:ml-0" size={14} />
                        </div>
                      </td>

                      <td className="p-6">
                        <div className="flex flex-col">
                           <span className="font-bold text-slate-700">{o?.users_permissions_user?.username || "-"}</span>
                           <span className="text-xs text-slate-400 truncate max-w-[150px]">{o?.users_permissions_user?.email}</span>
                        </div>
                      </td>

                      <td className="p-6">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                           <span className="font-semibold text-slate-600">
                              {o?.seller?.username || o?.seller?.name || "Unassigned"}
                           </span>
                        </div>
                      </td>

                      <td className="p-6">
                         <StatusBadge status={o.orderStatus} />
                      </td>
                      
                      <td className="p-6">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide ring-1 ${
                            o.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-600 ring-emerald-200' : 'bg-amber-50 text-amber-600 ring-amber-200'
                         }`}>
                            {o.paymentStatus}
                         </span>
                      </td>
                      
                      <td className="p-6">
                        <span className="font-black text-slate-900">${o.total}</span>
                      </td>
                      
                      <td className="p-6">
                        <div className="flex items-center gap-2 text-slate-400 font-medium text-xs">
                           <Calendar size={14} />
                           {new Date(o.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ================= ORDER DRAWER (MODAL STYLE) ================= */}
     {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setSelectedOrder(null)}
          />

          <div className="relative w-full max-w-[450px] h-full bg-white shadow-2xl p-0 overflow-auto z-10 animate-in slide-in-from-right duration-500 ease-out">
            {/* Drawer Header */}
            <div className="bg-slate-900 p-8 text-white">
               <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-2xl font-black">
                     #{selectedOrder.id}
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <XCircle size={24} />
                  </button>
               </div>
               <h2 className="text-2xl font-black mb-1">Order Details</h2>
               <p className="text-white/60 font-medium text-sm">Created on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
            </div>

            <div className="p-8 space-y-8">
               <section>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Customer Profile</h4>
                  <div className="space-y-4">
                     <DrawerInfo icon={<User size={18} />} label="Username" value={selectedOrder?.users_permissions_user?.username} />
                     <DrawerInfo icon={<Clock size={18} />} label="Email Address" value={selectedOrder?.users_permissions_user?.email} />
                     <DrawerInfo icon={<MapPin size={18} />} label="Delivery Location" value={selectedOrder.address || "No address provided"} />
                  </div>
               </section>

               <div className="h-px bg-slate-100" />

               <section>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Financial Status</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Method</p>
                        <p className="font-bold text-slate-700 flex items-center gap-2 italic">
                           <CreditCard size={14} className="text-indigo-500" />
                           {selectedOrder.paymentMethod || "COD"}
                        </p>
                     </div>
                     <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Value</p>
                        <p className="font-black text-pink-600 text-xl">${selectedOrder.total}</p>
                     </div>
                  </div>
               </section>

               <section className="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100">
                  <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3">Order Status</h4>
                  <div className="flex items-center justify-between">
                     <StatusBadge status={selectedOrder.orderStatus} />
                     <span className="text-xs font-bold text-indigo-600">Action Required: No</span>
                  </div>
               </section>

               <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
               >
                  CLOSE PREVIEW
               </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// ======================
function StatCard({ icon, label, value, color, highlight }) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    sky: "bg-sky-50 text-sky-600 border-sky-100",
    violet: "bg-violet-50 text-violet-600 border-violet-100",
  };

  return (
    <div className={`group bg-white p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 ${highlight ? 'border-indigo-400 ring-4 ring-indigo-50 shadow-lg' : 'border-slate-100'}`}>
      <div className={`p-2.5 rounded-xl w-fit mb-4 transition-transform group-hover:rotate-12 ${colorMap[color] || colorMap.indigo}`}>
        {icon}
      </div>
      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <h3 className="text-xl font-black text-slate-800 truncate">{value}</h3>
    </div>
  );
}

function StatusBadge({ status }) {
   const config = {
      pending: "bg-amber-100 text-amber-700 ring-amber-200",
      accepted: "bg-indigo-100 text-indigo-700 ring-indigo-200",
      delivered: "bg-emerald-100 text-emerald-700 ring-emerald-200",
      rejected: "bg-rose-100 text-rose-700 ring-rose-200",
      failed: "bg-rose-100 text-rose-700 ring-rose-200",
   };

   return (
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${config[status] || 'bg-slate-100 text-slate-600'}`}>
         {status}
      </span>
   );
}

function DrawerInfo({ icon, label, value }) {
   return (
      <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
         <div className="text-slate-400 mt-0.5">{icon}</div>
         <div className="min-w-0">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
            <p className="font-bold text-slate-700 truncate w-full">{value || "N/A"}</p>
         </div>
      </div>
   );
}

function PackageIcon({ size }) {
   return <ShoppingCart size={size} />;
}
