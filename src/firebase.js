import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, browserPopupRedirectResolver } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD16Y38oG6Y6fgH9Su5rPhP_INjUkeTR7c",
  authDomain: "book-store-auth-53669.firebaseapp.com",
  projectId: "book-store-auth-53669",
  storageBucket: "book-store-auth-53669.firebasestorage.app",
  messagingSenderId: "8252337018",
  appId: "1:8252337018:web:11598f013cdd95a58a04c3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// إعداد إضافي لتجنب حظر النوافذ
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
