

// import { create } from "zustand";
// import api from "../api/api";

// const BASE_URL = "http://localhost:1337";

// export const useCartStore = create((set, get) => ({
//   cart: [],
//   loading: false,

//   // =========================
//   // INIT CART
//   // =========================
//   initCart: async (user) => {
//     if (!user?.id) return;

//     try {
//       set({ loading: true });

//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
//       );

//       const cartData = res.data?.data?.[0];

//       if (!cartData) {
//         set({ cart: [] });
//         return;
//       }

//       const items = cartData.items || [];

//       const formattedCart = items.map((item, index) => {
//         const book = item.book;

//         return {
//           id: index,

//           bookId: book?.id,
//           documentId: book?.documentId,

//           name: book?.name || "Unknown Book",

//           price: Number(book?.price) || 0,

//           img: book?.img?.url
//             ? `${BASE_URL}${book.img.url}`
//             : null,

//           quantity: item.quantity || 1,
//         };
//       });

//       set({ cart: formattedCart });
//     } catch (err) {
//       console.log(
//         "INIT CART ERROR:",
//         err.response?.data || err
//       );

//       set({ cart: [] });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // =========================
//   // ADD TO CART
//   // =========================
//   addToCart: async (book, user) => {
//     if (!user?.id) {
//       return {
//         success: false,
//         message: "LOGIN_REQUIRED",
//       };
//     }

//     try {
//       // =========================
//       // GET USER CART
//       // =========================
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
//       );

//       let cart = res.data?.data?.[0];

//       // =========================
//       // CREATE CART
//       // =========================
//       if (!cart) {
//         await api.post("/carts", {
//           data: {
//             users_permissions_user: user.id,

//             items: [
//               {
//                 quantity: 1,

//                 book: book.documentId,
//               },
//             ],
//           },
//         });

//         await get().initCart(user);

//         return {
//           success: true,
//         };
//       }

//       const items = cart.items || [];

//       // =========================
//       // CHECK DUPLICATES
//       // =========================
//       const alreadyExists = items.some(
//         (item) =>
//           item.book?.documentId === book.documentId
//       );

//       if (alreadyExists) {
//         return {
//           success: false,
//           message: "ALREADY_IN_CART",
//         };
//       }

//       // =========================
//       // UPDATE ITEMS
//       // =========================
//       const updatedItems = [
//         ...items.map((item) => ({
//           quantity: item.quantity,

//           book: item.book?.documentId,
//         })),

//         {
//           quantity: 1,

//           book: book.documentId,
//         },
//       ];

//       // =========================
//       // UPDATE CART
//       // =========================
//       await api.put(`/carts/${cart.documentId}`, {
//         data: {
//           items: updatedItems,
//         },
//       });

//       await get().initCart(user);

//       return {
//         success: true,
//       };
//     } catch (err) {
//       console.log(
//         "ADD TO CART ERROR FULL:",
//         JSON.stringify(err.response?.data, null, 2)
//       );

//       return {
//         success: false,
//         message: "ERROR",
//       };
//     }
//   },

//   // =========================
//   // REMOVE FROM CART
//   // =========================
//   removeFromCart: async (bookDocumentId, user) => {
//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
//       );

//       const cart = res.data?.data?.[0];

//       if (!cart) return;

//       const updatedItems = (cart.items || [])
//         .filter(
//           (item) =>
//             item.book?.documentId !== bookDocumentId
//         )
//         .map((item) => ({
//           quantity: item.quantity,

//           book: item.book?.documentId,
//         }));

//       await api.put(`/carts/${cart.documentId}`, {
//         data: {
//           items: updatedItems,
//         },
//       });

//       await get().initCart(user);
//     } catch (err) {
//       console.log(
//         "REMOVE CART ERROR:",
//         err.response?.data || err
//       );
//     }
//   },

//   // =========================
//   // UPDATE QUANTITY
//   // =========================
//   updateQuantity: async (
//     bookDocumentId,
//     quantity,
//     user
//   ) => {
//     if (quantity < 1) return;

//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
//       );

//       const cart = res.data?.data?.[0];

//       if (!cart) return;

//       const updatedItems = (cart.items || []).map(
//         (item) => ({
//           quantity:
//             item.book?.documentId ===
//             bookDocumentId
//               ? quantity
//               : item.quantity,

//           book: item.book?.documentId,
//         })
//       );

//       await api.put(`/carts/${cart.documentId}`, {
//         data: {
//           items: updatedItems,
//         },
//       });

//       await get().initCart(user);
//     } catch (err) {
//       console.log(
//         "UPDATE CART ERROR:",
//         err.response?.data || err
//       );
//     }
//   },

//   // =========================
//   // CLEAR CART
//   // =========================
//   clearCart: async (user) => {
//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}`
//       );

//       const cart = res.data?.data?.[0];

//       if (!cart) return;

//       await api.put(`/carts/${cart.documentId}`, {
//         data: {
//           items: [],
//         },
//       });

//       set({ cart: [] });
//     } catch (err) {
//       console.log(
//         "CLEAR CART ERROR:",
//         err.response?.data || err
//       );
//     }
//   },
// }));

// import { create } from "zustand";
// import api from "../api/api";

// const BASE_URL = "http://localhost:1337";

// export const useCartStore = create((set, get) => ({
//   cart: [],
//   loading: false,

//   // =========================
//   // INIT CART
//   // =========================
//   initCart: async (user) => {
//     if (!user?.id) return;

//     try {
//       set({ loading: true });

//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate][book][populate]=img`
//       );

//       console.log(
//         "FULL CART RESPONSE:",
//         res.data
//       );

//       const cartData = res.data?.data?.[0];

//       if (!cartData) {
//         set({ cart: [] });
//         return;
//       }

//       const items = cartData.items || [];

//       console.log(
//         "ITEMS:",
//         JSON.stringify(items, null, 2)
//       );

//       const formattedCart = items.map(
//         (item, index) => {
//           const book = item.book;

//           console.log("BOOK:", book);

//           return {
//             id: index,

//             // 🔥 IMPORTANT
//             bookId: book?.id,

//             name:
//               book?.name || "Unknown Book",

//             author:
//               book?.author ||
//               "Unknown Author",

//             price: book?.price || 0,

//             img: book?.img?.url
//               ? `${BASE_URL}${book.img.url}`
//               : "",

//             quantity:
//               item.quantity || 1,
//           };
//         }
//       );

//       console.log(
//         "FORMATTED CART:",
//         formattedCart
//       );

//       set({ cart: formattedCart });
//     } catch (err) {
//       console.log(
//         "INIT CART ERROR:",
//         err.response?.data || err
//       );

//       set({ cart: [] });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // =========================
//   // ADD TO CART
//   // =========================
//   addToCart: async (book, user) => {
//     if (!user?.id) {
//       return {
//         success: false,
//         message: "LOGIN_REQUIRED",
//       };
//     }

//     try {
//       console.log(
//         "BOOK RECEIVED:",
//         book
//       );

//       // =========================
//       // GET USER CART
//       // =========================
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book`
//       );

//       let cart = res.data?.data?.[0];

//       // =========================
//       // CREATE NEW CART
//       // =========================
//       if (!cart) {
//         await api.post("/carts", {
//           data: {
//             users_permissions_user:
//               user.id,

//             items: [
//               {
//                 quantity: 1,

//                 // 🔥 FIX
//                 book: book.id,
//               },
//             ],
//           },
//         });

//         await get().initCart(user);

//         return {
//           success: true,
//         };
//       }

//       const items = cart.items || [];

//       // =========================
//       // CHECK DUPLICATES
//       // =========================
//       const alreadyExists = items.some(
//         (item) =>
//           item.book?.id === book.id
//       );

//       if (alreadyExists) {
//         return {
//           success: false,
//           message: "ALREADY_IN_CART",
//         };
//       }

//       // =========================
//       // UPDATE ITEMS
//       // =========================
//       const updatedItems = [
//         ...items.map((item) => ({
//           quantity: item.quantity,

//           // 🔥 FIX
//           book: item.book?.id,
//         })),

//         {
//           quantity: 1,

//           // 🔥 FIX
//           book: book.id,
//         },
//       ];

//       console.log(
//         "UPDATED ITEMS:",
//         updatedItems
//       );

//       // =========================
//       // UPDATE CART
//       // =========================
//       await api.put(`/carts/${cart.id}`, {
//         data: {
//           items: updatedItems,
//         },
//       });

//       await get().initCart(user);

//       return {
//         success: true,
//       };
//     } catch (err) {
//       console.log(
//         "ADD TO CART ERROR FULL:",
//         JSON.stringify(
//           err.response?.data,
//           null,
//           2
//         )
//       );

//       return {
//         success: false,
//         message: "ERROR",
//       };
//     }
//   },

//   // =========================
//   // REMOVE FROM CART
//   // =========================
//   removeFromCart: async (
//     bookId,
//     user
//   ) => {
//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book`
//       );

//       const cart = res.data?.data?.[0];

//       if (!cart) return;

//       const updatedItems = (
//         cart.items || []
//       )
//         .filter(
//           (item) =>
//             item.book?.id !== bookId
//         )
//         .map((item) => ({
//           quantity: item.quantity,

//           book: item.book?.id,
//         }));

//       await api.put(`/carts/${cart.id}`, {
//         data: {
//           items: updatedItems,
//         },
//       });

//       await get().initCart(user);
//     } catch (err) {
//       console.log(
//         "REMOVE CART ERROR:",
//         err.response?.data || err
//       );
//     }
//   },

//   // =========================
//   // UPDATE QUANTITY
//   // =========================
//   updateQuantity: async (
//     bookId,
//     quantity,
//     user
//   ) => {
//     if (quantity < 1) return;

//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book`
//       );

//       const cart = res.data?.data?.[0];

//       if (!cart) return;

//       const updatedItems = (
//         cart.items || []
//       ).map((item) => ({
//         quantity:
//           item.book?.id === bookId
//             ? quantity
//             : item.quantity,

//         // 🔥 FIX
//         book: item.book?.id,
//       }));

//       await api.put(`/carts/${cart.id}`, {
//         data: {
//           items: updatedItems,
//         },
//       });

//       await get().initCart(user);
//     } catch (err) {
//       console.log(
//         "UPDATE CART ERROR:",
//         err.response?.data || err
//       );
//     }
//   },

//   // =========================
//   // CLEAR CART
//   // =========================
//   clearCart: async (user) => {
//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}`
//       );

//       const cart = res.data?.data?.[0];

//       if (!cart) return;

//       await api.put(`/carts/${cart.id}`, {
//         data: {
//           items: [],
//         },
//       });

//       set({ cart: [] });
//     } catch (err) {
//       console.log(
//         "CLEAR CART ERROR:",
//         err.response?.data || err
//       );
//     }
//   },
// }));

//deepseek

// import { create } from "zustand";
// import api from "../api/api";

// const BASE_URL = "http://localhost:1337";

// export const useCartStore = create((set, get) => ({
//   cart: [],
//   loading: false,

//   // ======================
//   // INIT CART
//   // ======================
//   initCart: async (user) => {
//     if (!user?.id) return;

//     try {
//       set({ loading: true });

//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book`
//       );

//       const cartData = res.data?.data?.[0];

//       console.log("🟡 INIT CART RAW:", cartData);

//       if (!cartData) {
//         set({ cart: [] });
//         return;
//       }

//       const items = cartData.items || [];

//       const formatted = items.map((item) => {
//         const book = item.book;

//         return {
//           documentId: item.documentId,
//           bookId: book?.id,

//           name: book?.name,
//           author: book?.author,
//           price: book?.price,

//           img: book?.img?.url
//             ? `${BASE_URL}${book.img.url}`
//             : "",

//           quantity: item.quantity,
//         };
//       });

//       set({ cart: formatted });
//     } catch (err) {
//       console.log("❌ INIT CART ERROR:", err.response?.data || err);
//       set({ cart: [] });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   // ======================
//   // ADD TO CART
//   // ======================
//   addToCart: async (book, user) => {
//     if (!user?.id) return { success: false };

//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book`
//       );

//       let cart = res.data?.data?.[0];

//       // CREATE CART
//       if (!cart) {
//         const payload = {
//           data: {
//             users_permissions_user: user.id,
//             items: [
//               {
//                 quantity: 1,
//                 book: book.id,
//               },
//             ],
//           },
//         };

//         console.log("🟢 CREATE CART:", payload);

//         await api.post("/carts", payload);
//         await get().initCart(user);

//         return { success: true };
//       }

//       const exists = (cart.items || []).some(
//         (i) => i.book?.id === book.id
//       );

//       if (exists) {
//         return { success: false, message: "ALREADY_IN_CART" };
//       }

//       // FIXED STRUCTURE (IMPORTANT)
//       const updatedItems = [
//         ...(cart.items || []).map((i) => ({
//           quantity: i.quantity,
//           book: i.book.id,
//         })),
//         {
//           quantity: 1,
//           book: book.id,
//         },
//       ];

//       const payload = {
//         data: {
//           items: updatedItems,
//         },
//       };

//       console.log("🟠 UPDATE CART:", JSON.stringify(payload, null, 2));

//       await api.put(`/carts/${cart.documentId}`, payload);

//       await get().initCart(user);

//       return { success: true };
//     } catch (err) {
//       console.log("❌ ADD TO CART FULL ERROR:", {
//         status: err.response?.status,
//         data: err.response?.data,
//         url: err.config?.url,
//         payload: err.config?.data,
//       });

//       return { success: false };
//     }
//   },

//   // ======================
//   // UPDATE QUANTITY
//   // ======================
//   updateQuantity: async (bookId, quantity, user) => {
//     if (!user?.id || quantity < 1) return;

//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book`
//       );

//       const cart = res.data?.data?.[0];

//       const updatedItems = (cart.items || []).map((i) => ({
//         quantity: i.book?.id === bookId ? quantity : i.quantity,
//         book: i.book.id,
//       }));

//       const payload = {
//         data: {
//           items: updatedItems,
//         },
//       };

//       console.log("🔵 UPDATE QTY:", payload);

//       await api.put(`/carts/${cart.documentId}`, payload);

//       await get().initCart(user);
//     } catch (err) {
//       console.log("❌ UPDATE QTY ERROR:", err.response?.data || err);
//     }
//   },

//   // ======================
//   // REMOVE
//   // ======================
//   removeFromCart: async (bookId, user) => {
//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate[items][populate]=book`
//       );

//       const cart = res.data?.data?.[0];

//       const updatedItems = (cart.items || [])
//         .filter((i) => i.book?.id !== bookId)
//         .map((i) => ({
//           quantity: i.quantity,
//           book: i.book.id,
//         }));

//       await api.put(`/carts/${cart.documentId}`, {
//         data: { items: updatedItems },
//       });

//       await get().initCart(user);
//     } catch (err) {
//       console.log("❌ REMOVE ERROR:", err.response?.data || err);
//     }
//   },

//   // ======================
//   // CLEAR
//   // ======================
//   clearCart: async (user) => {
//     try {
//       const res = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}`
//       );

//       const cart = res.data?.data?.[0];

//       await api.put(`/carts/${cart.documentId}`, {
//         data: { items: [] },
//       });

//       set({ cart: [] });
//     } catch (err) {
//       console.log("❌ CLEAR ERROR:", err.response?.data || err);
//     }
//   },
// }));

// كان شغال وفي مشاكل
import { create } from "zustand";
import api from "../api/api";

const BASE_URL = "http://localhost:1337";

// ======================
// FETCH CART
// ======================
const fetchCart = async (userId) => {
  const res = await api.get(
    `/carts?filters[users_permissions_user][id][$eq]=${userId}&populate[items][populate][book][populate]=img`
  );

  return res.data?.data?.[0];
};

// ======================
// NORMALIZE ITEMS
// ======================
const normalizeItems = (items) => {
  return (items || []).map((item) => ({
    quantity: item.quantity,
    book: item.book?.id,
  }));
};

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,

  // ======================
  // INIT CART
  // ======================
  initCart: async (user) => {
    if (!user?.id) return;

    try {
      set({ loading: true });

      const cartData = await fetchCart(user.id);

      if (!cartData) {
        set({ cart: [] });
        return;
      }

      const items = cartData.items || [];

      const formatted = items.map((item) => {
        const book = item.book;

        // 🔥 FIX IMAGE FOR STRAPI
        const imageUrl =
          book?.img?.url ||
          book?.img?.data?.attributes?.url ||
          null;

        return {
          documentId: item.documentId,
          bookId: book?.id,
          name: book?.name,
          author: book?.author,
          price: book?.price,

          // 🔥 IMPORTANT FIX
          img: imageUrl
            ? imageUrl.startsWith("http")
              ? imageUrl
              : `${BASE_URL}${imageUrl}`
            : null,

          quantity: item.quantity,
        };
      });

      console.log("🟢 CART FORMATTED:", formatted);

      set({ cart: formatted });
    } catch (err) {
      console.log(
        "❌ INIT CART ERROR:",
        err.response?.data || err
      );

      set({ cart: [] });
    } finally {
      set({ loading: false });
    }
  },

  // ======================
  // ADD TO CART
  // ======================
  addToCart: async (book, user) => {
    if (!user?.id) {
      return { success: false };
    }

    try {
      const cart = await fetchCart(user.id);

      // ======================
      // CREATE FIRST CART
      // ======================
      if (!cart) {
        await api.post("/carts", {
          data: {
            users_permissions_user: user.id,
            items: [
              {
                quantity: 1,
                book: book.id,
              },
            ],
          },
        });

        await get().initCart(user);

        return { success: true };
      }

      // ======================
      // CHECK EXISTS
      // ======================
      const exists = (cart.items || []).some(
        (i) => i.book?.id === book.id
      );

      if (exists) {
        return {
          success: false,
          message: "ALREADY_IN_CART",
        };
      }

      // ======================
      // UPDATE ITEMS
      // ======================
      const updatedItems = [
        ...normalizeItems(cart.items),
        {
          quantity: 1,
          book: book.id,
        },
      ];

      await api.put(`/carts/${cart.documentId}`, {
        data: {
          items: updatedItems,
        },
      });

      await get().initCart(user);

      return { success: true };
    } catch (err) {
      console.log(
        "❌ ADD ERROR:",
        err.response?.data || err
      );

      return { success: false };
    }
  },

  // ======================
  // UPDATE QUANTITY
  // ======================
  updateQuantity: async (
    bookId,
    quantity,
    user
  ) => {
    if (!user?.id || quantity < 1) return;

    try {
      const cart = await fetchCart(user.id);

      const updatedItems = (cart.items || []).map(
        (i) => ({
          quantity:
            i.book?.id === bookId
              ? quantity
              : i.quantity,

          book: i.book?.id,
        })
      );

      await api.put(`/carts/${cart.documentId}`, {
        data: {
          items: updatedItems,
        },
      });

      await get().initCart(user);
    } catch (err) {
      console.log(
        "❌ UPDATE ERROR:",
        err.response?.data || err
      );
    }
  },

  // ======================
  // REMOVE FROM CART
  // ======================
  removeFromCart: async (bookId, user) => {
    if (!user?.id) return;

    try {
      const cart = await fetchCart(user.id);

      if (!cart) return;

      const updatedItems = (cart.items || [])
        .filter((i) => i.book?.id !== bookId)
        .map((i) => ({
          quantity: i.quantity,
          book: i.book?.id,
        }));

      console.log(
        "🟠 REMOVE UPDATED ITEMS:",
        updatedItems
      );

      await api.put(`/carts/${cart.documentId}`, {
        data: {
          items: updatedItems,
        },
      });

      await get().initCart(user);
    } catch (err) {
      console.log(
        "❌ REMOVE ERROR:",
        err.response?.data || err
      );
    }
  },

  // ======================
  // CLEAR CART
  // ======================
  clearCart: async (user) => {
    if (!user?.id) return;

    try {
      const cart = await fetchCart(user.id);

      if (!cart) return;

      await api.put(`/carts/${cart.documentId}`, {
        data: {
          items: [],
        },
      });

      set({ cart: [] });
    } catch (err) {
      console.log(
        "❌ CLEAR ERROR:",
        err.response?.data || err
      );
    }
  },
}));