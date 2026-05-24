// import { signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../firebase";
// import api from "../api/api";

// export const loginWithGoogle = async () => {
//   try {
//     // 🔥 Firebase Login
//     const result = await signInWithPopup(auth, googleProvider);

//     const firebaseUser = result.user;

//     // 🔥 Send user data to Strapi
//     const res = await api.post("/google-auth", {
//       email: firebaseUser.email,
//       username: firebaseUser.displayName,
//     });

//     // 🔥 Return backend data
//     return res.data;

//   } catch (error) {
//     console.log("GOOGLE LOGIN ERROR:", error);
//     throw error;
//   }
// };

//ما قبل اخر تعديل

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import api from "../api/api";

export const loginWithGoogle = async () => {

  try {

    // 🔥 Firebase Login
    const result = await signInWithPopup(
      auth,
      googleProvider
    );

    const firebaseUser = result.user;

    // 🔥 Send User To Strapi
    const res = await api.post(
      "/google-auth",
      {
        email: firebaseUser.email,

        username:
          firebaseUser.displayName,

        firebaseUid: firebaseUser.uid,

        googleAvatar:
          firebaseUser.photoURL,
      }
    );

    // 🔥 Return Backend Data
    return res.data;

  } catch (error) {

    console.log(
      "GOOGLE LOGIN ERROR:",
      error
    );

    throw error;
  }
};