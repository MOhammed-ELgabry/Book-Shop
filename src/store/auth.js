// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   isAuth: false,

//   login: (token, user, rememberMe) => {
//     if (rememberMe) {
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//     } else {
//       sessionStorage.setItem("token", token);
//       sessionStorage.setItem("user", JSON.stringify(user));
//     }

//     set({
//       token,
//       user,
//       isAuth: true,
//     });
//   },

//   loadUser: () => {
//     const token =
//       localStorage.getItem("token") || sessionStorage.getItem("token");

//     const user =
//       localStorage.getItem("user") || sessionStorage.getItem("user");

//     if (token && user) {
//       set({
//         token,
//         user: JSON.parse(user),
//         isAuth: true,
//       });
//     }
//   },

//   logout: () => {
//     localStorage.clear();
//     sessionStorage.clear();

//     set({
//       token: null,
//       user: null,
//       isAuth: false,
//     });
//   },
// }));

// store/auth.js
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
