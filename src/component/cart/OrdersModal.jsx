import { Calendar } from "lucide-react";

export default function OrdersModal({ show, onClose, orders, ordersLoading }) {
  if (!show) return null;

  const getImageUrl = (img) => {
    const url =
      img?.url ||
      img?.data?.attributes?.url ||
      img;

    if (!url) return null;

    if (url.startsWith("/")) {
      return import.meta.env.VITE_API_URL + url;
    }

    return url;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-4xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {ordersLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg">No orders found in your history.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            
            {orders.map((order) => {
              const sellerName =
                order?.seller?.username ||
                order?.seller?.name ||
                order?.seller?.email ||
                order?.seller?.data?.attributes?.username ||
                order?.seller?.data?.attributes?.name ||
                order?.seller?.data?.attributes?.email ||
                "Not assigned";

              const status = order?.orderStatus;
              const imageUrl = getImageUrl(order?.paymentProof);

              return (
                <div
                  key={order.id}
                  className={`group border rounded-3xl p-6 relative overflow-hidden transition-all hover:shadow-md ${
                    status === "rejected" ? "border-red-200 bg-red-50/50" : "border-gray-100 bg-white"
                  }`}
                >
                  {status === "rejected" && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-red-600 text-[200px] font-black opacity-10 leading-none">✕</span>
                      </div>
                      <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-sm">
                        Order Rejected
                      </div>
                    </>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order ID</span>
                        <h3 className="font-black text-xl text-gray-800">#{order.id}</h3>
                      </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
  <Calendar className="w-4 h-4" />
  {new Date(order.createdAt).toLocaleDateString(undefined, {
    dateStyle: "long",
  })}
</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
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

                      <div
                        className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
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

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Payment Method</p>
                      <p className="font-bold text-gray-700 capitalize">{order.paymentMethod}</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-blue-400 uppercase font-bold mb-1">Seller</p>
                      <p className="font-bold text-blue-700">{sellerName}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Total Amount</p>
                      <p className="font-black text-gray-800">${order.total}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl col-span-2 md:col-span-1">
  <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
    Delivery Address
  </p>

  <p className="font-bold text-gray-700 break-words">
    {order.address}
  </p>
</div>

{imageUrl && (
  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-4 flex items-center justify-between col-span-2 md:col-span-1">
    <div>
      <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">
        Payment Proof
      </p>

      <p className="text-sm text-gray-600">
        Receipt Uploaded
      </p>
    </div>

    <a
      href={imageUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <img
        src={imageUrl}
        alt="Payment Proof"
        className="w-20 h-20 rounded-xl object-cover border-2 border-white shadow-lg transition duration-300 group-hover:scale-105"
      />
    </a>
  </div>
)}

                    <div className="bg-gray-50 p-4 rounded-2xl">
                      <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Contact Phone</p>
                      <p className="font-bold text-gray-700">{order.phone}</p>
                    </div>
                  </div>

                  <div className="bg-pink-50 border border-pink-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🚚</span>
                      <div>
                        <p className="text-[10px] text-pink-400 uppercase font-bold">Estimated Arrival</p>
                        <p className="font-bold text-pink-600">Within 2 - 4 Business Days</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] text-gray-400 uppercase font-bold px-1">Items in this order</p>
                    <div className="flex flex-col gap-2">
                      {order?.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between border border-gray-100 rounded-2xl p-4 bg-gray-50/30 transition-colors hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-500">
                              {index + 1}
                            </span>
                            <h4 className="font-bold text-gray-700">{item?.book?.title}</h4>
                          </div>
                          <p className="text-sm font-semibold text-gray-500">
                            Qty: {item?.quantity}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}