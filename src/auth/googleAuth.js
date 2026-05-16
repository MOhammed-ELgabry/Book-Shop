import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import api from "../api/api";

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  const firebaseUser = result.user;

  const res = await api.post("/google-auth", {
    email: firebaseUser.email,
    username: firebaseUser.displayName,
    avatar: firebaseUser.photoURL,
  });

  return res.data;
};