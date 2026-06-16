

// import { create } from "zustand";
// import api from "../api/api";

// export const OrderStore = create((set) => ({
//   loading: false,
//   orders: [],

//   // ======================
//   // FETCH ORDERS
//   // ======================
//   fetchOrders: async (userId = null) => {
//     try {
//       set({ loading: true });

//       const token = localStorage.getItem("token");

//       const populateQuery =
//         "populate[items][populate]=book&populate[users_permissions_user]=true&populate[seller]=true";

//       const url = userId
//         ? `/orders?filters[seller][id][$eq]=${userId}&${populateQuery}`
//         : `/orders?${populateQuery}`;

//       const res = await api.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       set({
//         orders: res.data?.data || [],
//       });
//     } catch (err) {
//       console.log("FETCH ORDERS ERROR:", err);
//       set({ orders: [] });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // ======================
//   // UPDATE ORDER STATUS
//   // ======================
//   updateOrderStatus: async (documentId, status, extraData = {}) => {
//     try {
//       const token = localStorage.getItem("token");

//       await api.put(
//         `/orders/${documentId}`,
//         {
//           data: {
//             orderStatus: status,
//             ...extraData,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       set((state) => ({
//         orders: state.orders.map((o) =>
//           o.documentId === documentId
//             ? {
//                 ...o,
//                 orderStatus: status,
//                 ...extraData,
//               }
//             : o
//         ),
//       }));
//     } catch (err) {
//       console.log("UPDATE STATUS ERROR:", err);
//     }
//   },

//   // ======================
//   // UPDATE PAYMENT STATUS
//   // ======================
//   updatePaymentStatus: async (documentId, paymentStatus) => {
//     try {
//       const token = localStorage.getItem("token");

//       await api.put(
//         `/orders/${documentId}`,
//         {
//           data: { paymentStatus },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       set((state) => ({
//         orders: state.orders.map((o) =>
//           o.documentId === documentId
//             ? {
//                 ...o,
//                 paymentStatus,
//               }
//             : o
//         ),
//       }));
//     } catch (err) {
//       console.log("UPDATE PAYMENT ERROR:", err);
//     }
//   },
// }));

import { create } from "zustand";
import api from "../api/api";

export const OrderStore = create((set) => ({
  loading: false,
  orders: [],

  // ======================
  // FETCH ORDERS
  // ======================
  fetchOrders: async (userId = null) => {
    try {
      set({ loading: true });

      const token = localStorage.getItem("token");

      const populateQuery =
        "populate[items][populate]=book&" +
        "populate[users_permissions_user]=true&" +
        "populate[seller]=true&" +
        "populate[paymentProof]=true";

      const url = userId
        ? `/orders?filters[seller][id][$eq]=${userId}&${populateQuery}`
        : `/orders?${populateQuery}`;

      const res = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        orders: res.data?.data || [],
      });
    } catch (err) {
      console.log("FETCH ORDERS ERROR:", err);
      set({ orders: [] });
    } finally {
      set({ loading: false });
    }
  },

  // ======================
  // UPDATE ORDER STATUS
  // ======================
  updateOrderStatus: async (documentId, status, extraData = {}) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/orders/${documentId}`,
        {
          data: {
            orderStatus: status,
            ...extraData,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        orders: state.orders.map((o) =>
          o.documentId === documentId
            ? {
                ...o,
                orderStatus: status,
                ...extraData,
              }
            : o
        ),
      }));
    } catch (err) {
      console.log("UPDATE STATUS ERROR:", err);
    }
  },

  // ======================
  // UPDATE PAYMENT STATUS
  // ======================
  updatePaymentStatus: async (documentId, paymentStatus) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/orders/${documentId}`,
        {
          data: { paymentStatus },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        orders: state.orders.map((o) =>
          o.documentId === documentId
            ? {
                ...o,
                paymentStatus,
              }
            : o
        ),
      }));
    } catch (err) {
      console.log("UPDATE PAYMENT ERROR:", err);
    }
  },
}));