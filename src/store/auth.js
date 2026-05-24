// import { create } from "zustand";
// import api from "../api/api";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";
// const BASE_URL = "http://localhost:1337";

// export const useAuthStore = create((set, get) => ({
//   user: null,
//   token: null,
//   hydrated: false,

//   // ======================
//   // SET USER
//   // ======================
//   setUser: (userData, token) => {

//     let avatar = userData?.avatar || null;

//     // 🔥 normalize avatar
//     if (
//       avatar &&
//       typeof avatar === "string" &&
//       !avatar.startsWith("http")
//     ) {
//       avatar = `${BASE_URL}${avatar}`;
//     }

//     const normalizedUser = {
//       ...userData,
//       avatar,
//     };

//     localStorage.setItem(
//       "user",
//       JSON.stringify(normalizedUser)
//     );

//     localStorage.setItem("token", token);

//     set({
//       user: normalizedUser,
//       token,
//     });

//     console.log("USER SAVED");
//   },

//   // ======================
//   // FETCH PROFILE
//   // ======================
//   fetchProfile: async () => {
//     try {

//       const { user, token } = get();

//       if (!user?.id || !token) {
//         return;
//       }

//       // 🔥 get profile directly
//       const res = await api.get(
//         `/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
//       );

//       const profile = res.data?.data?.[0];

//       if (!profile) {
//         console.log("NO PROFILE FOUND");
//         return;
//       }

//       // 🔥 avatar
//       let avatar = user.avatar || null;

//       if (profile?.avatar?.url) {
//         avatar = profile.avatar.url.startsWith("http")
//           ? profile.avatar.url
//           : `${BASE_URL}${profile.avatar.url}`;
//       }

//       // 🔥 merge
//       const mergedUser = {
//         ...user,

//         firstName: profile.firstName || "",
//         lastName: profile.lastName || "",
//         phone: profile.phone || "",
//         address: profile.address || "",

//         avatar,
//       };

//       localStorage.setItem(
//         "user",
//         JSON.stringify(mergedUser)
//       );

//       set({
//         user: mergedUser,
//       });

//       console.log("PROFILE FETCHED SUCCESS");

//     } catch (err) {
//       console.log("FETCH PROFILE ERROR:", err);
//     }
//   },

//   // ======================
//   // LOAD USER
//   // ======================
//   loadUserFromStorage: () => {

//     try {

//       const storedUser = localStorage.getItem("user");
//       const storedToken = localStorage.getItem("token");

//       if (storedUser && storedToken) {

//         let parsedUser = JSON.parse(storedUser);

//         // 🔥 normalize avatar again
//         if (
//           parsedUser?.avatar &&
//           !parsedUser.avatar.startsWith("http")
//         ) {
//           parsedUser.avatar = `${BASE_URL}${parsedUser.avatar}`;
//         }

//         set({
//           user: parsedUser,
//           token: storedToken,
//           hydrated: true,
//         });

//         console.log("USER LOADED FROM STORAGE");

//       } else {

//         set({
//           hydrated: true,
//         });

//       }

//     } catch (err) {

//       console.log("LOAD STORAGE ERROR:", err);

//       set({
//         user: null,
//         token: null,
//         hydrated: true,
//       });
//     }
//   },

//   // ======================
//   // LOGOUT
//   // ======================
//  // ======================
// // LOGOUT
// // ======================
// logout: async () => {

//   try {

//     // 🔥 Firebase logout
//     await signOut(auth);

//   } catch (err) {

//     console.log("FIREBASE LOGOUT ERROR:", err);

//   }

//   // 🔥 clear storage
//   localStorage.removeItem("user");
//   localStorage.removeItem("token");

//   // 🔥 reset state
//   set({
//     user: null,
//     token: null,
//   });

//   console.log("LOGOUT SUCCESS");
// },
// }));
// ده قبل اخر تعديل 

import { create } from "zustand";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  hydrated: false,

  // ======================
  // SET USER
  // ======================
  setUser: (userData, token) => {

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem("token", token);

    set({
      user: userData,
      token,
    });

    console.log("USER SAVED");
  },

  // ======================
  // LOAD USER
  // ======================
  loadUserFromStorage: () => {

    try {

      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {

        set({
          user: JSON.parse(storedUser),
          token: storedToken,
          hydrated: true,
        });

        console.log("USER LOADED");

      } else {

        set({
          hydrated: true,
        });

      }

    } catch (err) {

      console.log("LOAD STORAGE ERROR:", err);

      set({
        user: null,
        token: null,
        hydrated: true,
      });

    }
  },

  // ======================
  // LOGOUT
  // ======================
  logout: async () => {

    try {

      await signOut(auth);

    } catch (err) {

      console.log("FIREBASE LOGOUT ERROR:", err);

    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
    });

    console.log("LOGOUT SUCCESS");
  },
}));