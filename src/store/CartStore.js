
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// // Zustand store للكارت مع persist
// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       cart: [],
//       cartId: null,

//       setCart: (cart, cartId) => set({ cart, cartId }),

//       addToCart: async (product, token) => {
//         const { cart, cartId } = get();
//         const exists = cart.find((item) => item.id === product.id);
//         if (exists) return false;

//         const updatedCart = [...cart, { ...product, quantity: 1 }];
//         set({ cart: updatedCart });

//         if (cartId && token) {
//           await fetch(`http://localhost:1337/api/carts/${cartId}`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ data: { items: updatedCart } }),
//           });
//         }
//         return true;
//       },

//       removeFromCart: async (productId, token) => {
//         const { cart, cartId } = get();
//         const updatedCart = cart.filter((item) => item.id !== productId);
//         set({ cart: updatedCart });

//         if (cartId && token) {
//           await fetch(`http://localhost:1337/api/carts/${cartId}`, {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ data: { items: updatedCart } }),
//           });
//         }
//       },
//     }),
//     { name: "cart-storage" } // الاسم في localStorage
//   )
// );

// // Init Cart بعد login
// export const initCart = async (user, token) => {
//   const res = await fetch(
//     `http://localhost:1337/api/carts?filters[users_permissions_user][id][$eq]=${user.id}`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   const data = await res.json();

//   if (data.data.length === 0) {
//     const createRes = await fetch(`http://localhost:1337/api/carts`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ data: { users_permissions_user: user.id, items: [] } }),
//     });
//     const newCart = await createRes.json();
//     useCartStore.getState().setCart([], newCart.data.id);
//   } else {
//     const cart = data.data[0];
//     useCartStore.getState().setCart(cart.attributes.items, cart.id);
//   }
// };
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      cartId: null,

      // تعيين الكارت
      setCart: (cart, cartId) => set({ cart, cartId }),

      // 🛒 إضافة منتج
      addToCart: async (product, token) => {
        const { cart, cartId } = get();

        const exists = cart.find((item) => item.id === product.id);
        if (exists) return false;

        const updatedCart = [...cart, { ...product, quantity: 1 }];
        set({ cart: updatedCart });

        if (cartId && token) {
          await fetch(`http://localhost:1337/api/carts/${cartId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ data: { items: updatedCart } }),
          });
        }

        return true;
      },

      // ❌ حذف منتج
      removeFromCart: async (productId, token) => {
        const { cart, cartId } = get();

        const updatedCart = cart.filter((item) => item.id !== productId);
        set({ cart: updatedCart });

        if (cartId && token) {
          await fetch(`http://localhost:1337/api/carts/${cartId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ data: { items: updatedCart } }),
          });
        }
      },

      // 🔥 تحديث الكمية (حل مشكلة + و -)
      updateQuantity: async (productId, quantity, token) => {
        const { cart, cartId } = get();

        const updatedCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );

        set({ cart: updatedCart });

        if (cartId && token) {
          await fetch(`http://localhost:1337/api/carts/${cartId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ data: { items: updatedCart } }),
          });
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

// 🚀 initCart
export const initCart = async (user, token) => {
  const res = await fetch(
    `http://localhost:1337/api/carts?filters[users_permissions_user][id][$eq]=${user.id}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await res.json();

  if (data.data.length === 0) {
    // إنشاء كارت جديد
    const createRes = await fetch(`http://localhost:1337/api/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          users_permissions_user: user.id,
          items: [],
        },
      }),
    });

    const newCart = await createRes.json();
    useCartStore.getState().setCart([], newCart.data.id);
  } else {
    const cart = data.data[0];
    useCartStore.getState().setCart(cart.attributes.items, cart.id);
  }
};