
// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,

//   setUser: (user, token) => {
//     set({ user, token });
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", token);
//   },

//   logout: () => {
//     set({ user: null, token: null });
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   },

//   loadUserFromStorage: () => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");
//     if (storedUser && storedToken) {
//       set({ user: JSON.parse(storedUser), token: storedToken });
//     }
//   },
// }));
// store/AuthStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUser: (user, token) => {
    set({ user, token });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  loadUserFromStorage: () => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      set({ user: JSON.parse(storedUser), token: storedToken });
    }
  },
}));
