// export default function OrdersModal({ show, onClose, orders, ordersLoading }) {
//   if (!show) return null;

//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
//       >
//         <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//         {ordersLoading ? (
//           <div className="text-center py-10">Loading...</div>
//         ) : orders.length === 0 ? (
//           <div className="text-center py-10">No orders found</div>
//         ) : (
//           <div className="flex flex-col gap-6">
            
//             {orders.map((order) => {
//               const sellerName =
//   order?.seller?.username ||
//   order?.seller?.name ||
//   order?.seller?.email ||
//   order?.seller?.data?.attributes?.username ||
//   order?.seller?.data?.attributes?.name ||
//   order?.seller?.data?.attributes?.email ||
//   "Not assigned";
                
//               const status = order?.orderStatus;

//               return (
//                 <div
//                   key={order.id}
//                   className={`border rounded-2xl p-5 relative overflow-hidden ${
//                     status === "rejected" ? "border-red-500 bg-red-50" : ""
//                   }`}
//                 >
//                   {status === "rejected" && (
//                     <>
//                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                         <span className="text-red-600 text-[180px] font-bold opacity-20 leading-none">
//                           ✕
//                         </span>
//                       </div>
//                       <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
//                         Order Rejected
//                       </div>
//                     </>
//                   )}

//                   <div className="flex items-center justify-between mb-4">
//                     <div>
//                       <h3 className="font-bold text-lg">Order #{order.id}</h3>
//                       <p className="text-sm text-gray-500">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       <div
//                         className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
//                           status === "pending"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : status === "accepted"
//                             ? "bg-green-100 text-green-700"
//                             : status === "rejected"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-blue-100 text-blue-700"
//                         }`}
//                       >
//                         Order: {status}
//                       </div>
//                       <div
//                         className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
//                           order?.paymentStatus === "paid"
//                             ? "bg-green-100 text-green-700"
//                             : order?.paymentStatus === "failed"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         Payment: {order?.paymentStatus || "pending"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4 mb-4">
//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <p className="text-sm text-gray-500">Payment Method</p>
//                       <p className="font-semibold capitalize">{order.paymentMethod}</p>
//                     </div>
//                     <div className="bg-blue-50 p-3 rounded-xl">
//                       <p className="text-sm text-gray-500">Seller</p>
//                       <p className="font-semibold text-blue-700">{sellerName}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <p className="text-sm text-gray-500">Total</p>
//                       <p className="font-semibold">${order.total}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <p className="text-sm text-gray-500">Address</p>
//                       <p className="font-semibold">{order.address}</p>
//                     </div>
//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <p className="text-sm text-gray-500">Phone</p>
//                       <p className="font-semibold">{order.phone}</p>
//                     </div>
//                   </div>

//                   <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-4">
//                     <p className="text-sm text-gray-500">Expected Delivery</p>
//                     <p className="font-bold text-pink-600">Within 2 - 4 Days</p>
//                   </div>

//                   <div className="flex flex-col gap-3">
//                     {order?.items?.map((item, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between border rounded-xl p-3"
//                       >
//                         <div>
//                           <h4 className="font-semibold">{item?.book?.title}</h4>
//                           <p className="text-sm text-gray-500">
//                             Quantity: {item?.quantity}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function OrdersModal({ show, onClose, orders, ordersLoading }) {
//   if (!show) return null;

//   return (
//     <div
//       onClick={onClose}
//       className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-white w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
//       >
//         <h2 className="text-2xl font-bold mb-6">My Orders</h2>

//         {ordersLoading ? (
//           <div className="text-center py-10">Loading...</div>
//         ) : orders.length === 0 ? (
//           <div className="text-center py-10">No orders found</div>
//         ) : (
//           <div className="flex flex-col gap-6">
            
//             {orders.map((order) => {
//               const sellerName =
//   order?.seller?.username ||
//   order?.seller?.name ||
//   order?.seller?.email ||
//   order?.seller?.data?.attributes?.username ||
//   order?.seller?.data?.attributes?.name ||
//   order?.seller?.data?.attributes?.email ||
//   "Not assigned";
                
//               const status = order?.orderStatus;

//               return (
//                 <div
//                   key={order.id}
//                   className={`border rounded-2xl p-5 relative overflow-hidden ${
//                     status === "rejected" ? "border-red-500 bg-red-50" : ""
//                   }`}
//                 >
//                   {status === "rejected" && (
//                     <>
//                       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                         <span className="text-red-600 text-[180px] font-bold opacity-20 leading-none">
//                           ✕
//                         </span>
//                       </div>
//                       <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
//                         Order Rejected
//                       </div>
//                     </>
//                   )}

//                   <div className="flex items-center justify-between mb-4">
//                     <div>
//                       <h3 className="font-bold text-lg">Order #{order.id}</h3>
//                       <p className="text-sm text-gray-500">
//                         {new Date(order.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       <div
//                         className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
//                           status === "pending"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : status === "accepted"
//                             ? "bg-green-100 text-green-700"
//                             : status === "rejected"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-blue-100 text-blue-700"
//                         }`}
//                       >
//                         Order: {status}
//                       </div>
//                       <div
//                         className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
//                           order?.paymentStatus === "paid"
//                             ? "bg-green-100 text-green-700"
//                             : order?.paymentStatus === "failed"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         Payment: {order?.paymentStatus || "pending"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4 mb-4">
//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <p className="text-sm text-gray-500">Payment Method</p>
//                       <p className="font-semibold capitalize">{order.paymentMethod}</p>
//                     </div>

//                     <div className="bg-blue-50 p-3 rounded-xl">
//                       <p className="text-sm text-gray-500">Seller</p>
//                       <p className="font-semibold text-blue-700">{sellerName}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <p className="text-sm text-gray-500">Total</p>
//                       <p className="font-semibold">${order.total}</p>
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <p className="text-sm text-gray-500">Address</p>
//                       <p className="font-semibold">{order.address}</p>

//                       {/* ✅ IMAGE ADDED HERE (ZOOM HOVER) */}
//                       {/* ✅ IMAGE ADDED HERE (ZOOM HOVER) */}
// {(
//   order?.paymentProof?.url ||
//   order?.paymentProof?.data?.attributes?.url
// ) && (
//   <img
//     src={
//       order?.paymentProof?.url ||
//       order?.paymentProof?.data?.attributes?.url
//     }
//     alt="payment proof"
//     className="w-10 h-10 mt-2 object-cover rounded-md cursor-pointer transition-transform duration-300 hover:scale-150"
//   />
// )}
//                     </div>

//                     <div className="bg-gray-50 p-4 rounded-xl">
//                       <p className="text-sm text-gray-500">Phone</p>
//                       <p className="font-semibold">{order.phone}</p>
//                     </div>
//                   </div>

//                   <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-4">
//                     <p className="text-sm text-gray-500">Expected Delivery</p>
//                     <p className="font-bold text-pink-600">Within 2 - 4 Days</p>
//                   </div>

//                   <div className="flex flex-col gap-3">
//                     {order?.items?.map((item, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between border rounded-xl p-3"
//                       >
//                         <div>
//                           <h4 className="font-semibold">{item?.book?.title}</h4>
//                           <p className="text-sm text-gray-500">
//                             Quantity: {item?.quantity}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export default function OrdersModal({ show, onClose, orders, ordersLoading }) {
  if (!show) return null;

  // ✅ helper مهم جدًا عشان سترابي
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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-3xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>

        {ordersLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-10">No orders found</div>
        ) : (
          <div className="flex flex-col gap-6">
            
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
                  className={`border rounded-2xl p-5 relative overflow-hidden ${
                    status === "rejected" ? "border-red-500 bg-red-50" : ""
                  }`}
                >
                  {status === "rejected" && (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-red-600 text-[180px] font-bold opacity-20 leading-none">
                          ✕
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                        Order Rejected
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div
                        className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
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
                        className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
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

                  <div className="grid md:grid-cols-2 gap-4 mb-4">

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-semibold capitalize">{order.paymentMethod}</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-xl">
                      <p className="text-sm text-gray-500">Seller</p>
                      <p className="font-semibold text-blue-700">{sellerName}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold">${order.total}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl relative">
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-semibold">{order.address}</p>

                      {/* ✅ IMAGE ZOOM HOVER FIXED */}
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt="payment proof"
                       className="
  w-10 h-10 mt-2
  object-cover rounded-md
  cursor-pointer
  transition-all duration-300 ease-in-out
  hover:scale-125
  hover:translate-y-1
  hover:z-75
"
                        />
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold">{order.phone}</p>
                    </div>
                  </div>

                  <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-500">Expected Delivery</p>
                    <p className="font-bold text-pink-600">Within 2 - 4 Days</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {order?.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border rounded-xl p-3"
                      >
                        <div>
                          <h4 className="font-semibold">{item?.book?.title}</h4>
                          <p className="text-sm text-gray-500">
                            Quantity: {item?.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
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