
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Routes Guards
import PublicRoute from "./component/routes/PublicRoute";
import ProtectedRoute from "./component/routes/ProtectedRoute";

// Pages
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PublicLayout from "./pages/PublicLayout";
import HomeBefore from "./pages/HomeBefore";
import AboutUs from "./pages/AboutUs";
import Books from "./pages/Books";
import BooksList from "./pages/BooksList";
import SingleBook from "./pages/SingleBook";
import Cart from "./pages/Cart";
import LoveBooks from "./pages/LoveBooks";
import ProfilePage from "./pages/ProfilePage";

// Store
import { useAuthStore } from "./store/auth";

// Styles
import "react-loading-skeleton/dist/skeleton.css";

function AppContent() {
  const loadUserFromStorage = useAuthStore(
    (state) => state.loadUserFromStorage
  );

  const hydrated = useAuthStore((state) => state.hydrated);

  // Load user once on app start
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // ⛔ مهم جدًا: منع أي Routes تشتغل قبل ما الـ auth يتحمل
  if (!hydrated) {
    return null; // أو حط GlobalLoader لو عندك
  }

  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomeBefore />} />

      {/* Auth (Public Routes) */}
      <Route element={<PublicLayout />}>
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
      </Route>

      {/* About */}
      <Route path="/about" element={<AboutUs />} />

      {/* Books */}
      <Route path="/books" element={<Books />}>
        <Route index element={<BooksList />} />
      </Route>

      <Route path="/books/:id" element={<SingleBook />} />

      {/* Protected Routes */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/lovebooks"
        element={
          <ProtectedRoute>
            <LoveBooks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}