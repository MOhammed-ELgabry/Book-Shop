

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