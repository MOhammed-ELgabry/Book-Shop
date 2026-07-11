
import { useEffect, useState } from "react";
import {
  Package,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  Eye,
  TrendingUp,
  DollarSign,
  Users,
  Search,
} from "lucide-react";

import { OrderStore } from "../store/OrderStore";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

export default function SellerDashboard() {
  const { orders, loading, fetchOrders, updateOrderStatus } = OrderStore();

  const [activeTab, setActiveTab] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [localOrders, setLocalOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setLocalOrders(orders || []);
  }, [orders]);

  const tabs = [
    { key: "all", label: "All Orders", icon: Package, color: "text-slate-600" },
    { key: "pending", label: "Pending", icon: Clock3, color: "text-amber-500" },
    { key: "accepted", label: "Accepted", icon: CheckCircle2, color: "text-indigo-500" },
    { key: "rejected", label: "Rejected", icon: XCircle, color: "text-rose-500" },
    { key: "delivered", label: "Delivered", icon: Truck, color: "text-emerald-500" },
  ];

  const baseOrders = (localOrders || []).filter((o) => {
    const sellerId = o?.seller?.id;
    const isUnassignedPending = !sellerId && o?.orderStatus === "pending";
    const isMyOrder = sellerId === userId;
    return isUnassignedPending || isMyOrder;
  });

  const sellerRevenue = baseOrders.reduce((sum, order) => {
    if (order?.orderStatus === "rejected") return sum;
    return sum + (order?.total || 0);
  }, 0);

  const filteredOrders = baseOrders.filter((o) => {
    if (!o) return false;
    
    // Search filter
    const matchesSearch = 
      o.id?.toString().includes(searchTerm) || 
      o.users_permissions_user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === "all") return o.orderStatus !== "delivered";
    return o.orderStatus === activeTab && o.orderStatus !== "delivered";
  });

  const stats = {
    total: baseOrders.length,
    pending: baseOrders.filter((o) => o?.orderStatus === "pending").length,
    accepted: baseOrders.filter((o) => o?.orderStatus === "accepted").length,
    revenue: sellerRevenue,
    customers: new Set(baseOrders.map(o => o?.users_permissions_user?.id)).size
  };

  const handleStatusChange = (orderId, status) => {
    if (!orderId) return;
    if (status === "accepted") {
      updateOrderStatus(orderId, status, { seller: userId });
      setLocalOrders((prev) => prev.filter((o) => o.documentId !== orderId));
    } else {
      updateOrderStatus(orderId, status);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return "";
    return `${import.meta.env.VITE_API_URL}${url}`;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      <NavBar />

      {/* Modern Header Section */}
      <div className="relative w-full h-[280px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900/20 backdrop-blur-[1px]" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
              Seller Dashboard
            </h1>
            <p className="text-slate-200 text-lg font-medium opacity-90 max-w-xl leading-relaxed">
              Monitor your store's performance and manage customer orders in real-time.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 pb-20 relative z-10">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            label="Gross Revenue" 
            value={`$${stats.revenue.toLocaleString()}`} 
            icon={<DollarSign size={20} />} 
            trend="+12.5%" 
            color="emerald"
          />
          <StatCard 
            label="Total Orders" 
            value={stats.total} 
            icon={<Package size={20} />} 
            trend="+4 since yesterday" 
            color="indigo"
          />
          <StatCard 
            label="Active Customers" 
            value={stats.customers} 
            icon={<Users size={20} />} 
            color="blue"
          />
          <StatCard 
            label="Pending Action" 
            value={stats.pending} 
            icon={<Clock3 size={20} />} 
            color="amber"
            highlight={stats.pending > 0}
          />
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 ${
                    isActive 
                      ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                  }`}
                >
                  <Icon size={18} className={isActive ? "text-white" : tab.color} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search by ID or Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 animate-pulse">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Syncing Data...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white p-24 text-center rounded-[3rem] shadow-sm border border-slate-200 animate-in fade-in zoom-in duration-500">
              <div className="text-6xl mb-6 opacity-20 grayscale">📦</div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">No orders found</h3>
              <p className="text-slate-400 max-w-sm mx-auto">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredOrders.map((order) => (
                <OrderCard 
                  key={order?.documentId} 
                  order={order} 
                  onStatusChange={handleStatusChange}
                  onViewProof={(url) => setSelectedImage(getImageUrl(url))}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-[100] p-6 animate-in fade-in duration-300"
        >
          <div className="relative group max-w-4xl max-h-full">
            <button className="absolute -top-12 right-0 text-white hover:text-indigo-400 transition-colors text-lg font-bold flex items-center gap-2">
              Close <XCircle size={24} />
            </button>
            <img
              src={selectedImage}
              alt="payment proof"
              className="w-full h-full object-contain rounded-3xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

/* ---------------- MODERN COMPONENTS ---------------- */

function StatCard({ label, value, icon, trend, color, highlight }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className={`bg-white p-8 rounded-[2rem] border-2 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 ${highlight ? 'border-amber-400 ring-4 ring-amber-50 shadow-lg' : 'border-slate-50'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-2xl ${colors[color] || colors.indigo}`}>
          {icon}
        </div>
        {trend && (
          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-tighter">
            <TrendingUp size={10} /> {trend}
          </span>
        )}
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.1em] mb-1">{label}</p>
      <h3 className="text-3xl font-black text-slate-800">{value}</h3>
    </div>
  );
}

function OrderCard({ order, onStatusChange, onViewProof }) {
  const statusConfig = {
    pending: { color: "bg-amber-50 text-amber-600 ring-amber-100", label: "Pending" },
    accepted: { color: "bg-indigo-50 text-indigo-600 ring-indigo-100", label: "Accepted" },
    rejected: { color: "bg-rose-50 text-rose-600 ring-rose-100", label: "Rejected" },
    delivered: { color: "bg-emerald-50 text-emerald-600 ring-emerald-100", label: "Delivered" },
  };

  const status = statusConfig[order?.orderStatus] || statusConfig.pending;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/40 hover:border-slate-200 group">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        
        {/* Order Header */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-slate-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg">
              #{order?.id}
            </div>
            <div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ring-1 ${status.color}`}>
                {status.label}
              </span>
              <p className="text-slate-400 text-xs font-medium mt-1.5">
                {new Date().toLocaleDateString(undefined, { dateStyle: 'long' })}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailItem label="Customer" value={order?.users_permissions_user?.email} icon={<Users size={14} />} />
            <DetailItem label="Phone Number" value={order?.phone} icon={<Clock3 size={14} />} />
            <DetailItem label="Shipping Address" value={order?.address} icon={<Package size={14} />} />
            <DetailItem label="Order Value" value={`$${order?.total}`} icon={<DollarSign size={14} />} bold />
          </div>
        </div>

        {/* Payment & Action Section */}
        <div className="lg:w-[350px] flex flex-col gap-4">
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment Meta</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                order?.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {order?.paymentStatus || 'UNPAID'}
              </span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-600 capitalize">
                {order?.paymentMethod || "Direct Payment"}
              </span>
              {order?.paymentProof?.url && (
                <button
                  onClick={() => onViewProof(order.paymentProof.url)}
                  className="bg-white border border-slate-200 p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm active:scale-95 group/btn flex items-center gap-2 text-[10px] font-black uppercase"
                >
                  <Eye size={14} /> Proof
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {order?.orderStatus === "pending" && (
                <>
                  <button
                    onClick={() => onStatusChange(order?.documentId, "accepted")}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 transition-all active:scale-95"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => onStatusChange(order?.documentId, "rejected")}
                    className="px-4 border-2 border-rose-50 text-rose-500 hover:bg-rose-50 rounded-2xl transition-all active:scale-95"
                  >
                    <XCircle size={20} />
                  </button>
                </>
              )}
              {order?.orderStatus === "accepted" && (
                <button
                  onClick={() => onStatusChange(order?.documentId, "delivered")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Truck size={18} /> Mark Delivered
                </button>
              )}
              {order?.orderStatus === "delivered" && (
                <div className="w-full bg-slate-100 text-slate-400 py-3.5 rounded-2xl font-black text-xs uppercase text-center cursor-not-allowed">
                  Order Fulfilled
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon, bold }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
      <div className="mt-1 text-slate-400">{icon}</div>
      <div className="min-w-0">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</p>
        <p className={`text-sm truncate w-full ${bold ? 'font-black text-indigo-600' : 'font-bold text-slate-700'}`}>
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  );
}
