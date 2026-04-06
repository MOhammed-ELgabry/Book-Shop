
// // import { create } from "zustand";

// // export const useAuthStore = create((set) => ({
// //   user: null,
// //   token: null,

// //   setUser: (user, token) => {
// //     set({ user, token });
// //     localStorage.setItem("user", JSON.stringify(user));
// //     localStorage.setItem("token", token);
// //     if (token) {
// //     localStorage.setItem("token", token);
// //   }
// //   },

// //   logout: () => {
// //     set({ user: null, token: null });
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");
// //   },

// //   loadUserFromStorage: () => {
// //     const storedUser = localStorage.getItem("user");
// //     const storedToken = localStorage.getItem("token");
// //     if (storedUser && storedToken) {
// //       set({ user: JSON.parse(storedUser), token: storedToken });
// //     }
// //   },
// // }));

// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,

//   setUser: (user, token) => {
//     set({ user, token });
//     localStorage.setItem("user", JSON.stringify(user));
//     if (token) localStorage.setItem("token", token);
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
 
// import { create } from "zustand";

// export const useAuthStore = create((set) => ({
//   user: null,
//   token: null,

//   setUser: (user, token) => {
//     set({ user, token });
//     localStorage.setItem("user", JSON.stringify(user));
//     if (token) localStorage.setItem("token", token);
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



import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData, token) => {
    set((state) => {
      const newUser = { ...state.user, ...userData };
      if (newUser.avatar && !newUser.avatar.startsWith("http")) {
        newUser.avatar = `http://localhost:1337${newUser.avatar}`;
      }
      localStorage.setItem("user", JSON.stringify(newUser));
      if (token) localStorage.setItem("token", token);
      return { user: newUser, token: token || state.token };
    });
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
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.avatar && !parsedUser.avatar.startsWith("http")) {
        parsedUser.avatar = `http://localhost:1337${parsedUser.avatar}`;
      }
      set({ user: parsedUser, token: storedToken });
    }
  },
}));