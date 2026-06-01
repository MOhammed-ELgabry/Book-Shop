
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