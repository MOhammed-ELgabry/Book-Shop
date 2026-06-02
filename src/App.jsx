
// import React, { useEffect } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// // Routes Guards
// import PublicRoute from "./component/routes/PublicRoute";
// import ProtectedRoute from "./component/routes/ProtectedRoute";
// import SellerRoute from "./component/routes/SellerRoute"; // 👈 ضيف ده

// // Pages
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import PublicLayout from "./pages/PublicLayout";
// import HomeBefore from "./pages/HomeBefore";
// import AboutUs from "./pages/AboutUs";
// import Books from "./pages/Books";
// import BooksList from "./pages/BooksList";
// import SingleBook from "./pages/SingleBook";
// import Cart from "./pages/Cart";
// import LoveBooks from "./pages/LoveBooks";
// import ProfilePage from "./pages/ProfilePage";
// import SellerDashboard from "./pages/SellerDashboard";
// import MyOrders from "./pages/MyOrders";
// // Store
// import { useAuthStore } from "./store/auth";

// // Styles
// import "react-loading-skeleton/dist/skeleton.css";

// function AppContent() {
//   const loadUserFromStorage = useAuthStore(
//     (state) => state.loadUserFromStorage
//   );

//   const hydrated = useAuthStore((state) => state.hydrated);

//   // ======================
//   // LOAD AUTH FROM STORAGE
//   // ======================
//   useEffect(() => {
//     loadUserFromStorage();
//   }, [loadUserFromStorage]);

//   // ======================
//   // WAIT FOR HYDRATION
//   // ======================
//   if (!hydrated) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       {/* ====================== */}
//       {/* HOME */}
//       {/* ====================== */}
//       <Route path="/" element={<HomeBefore />} />

//       {/* ====================== */}
//       {/* AUTH */}
//       {/* ====================== */}
//       <Route element={<PublicLayout />}>
//         <Route
//           path="/register"
//           element={
//             <PublicRoute>
//               <RegisterPage />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <LoginPage />
//             </PublicRoute>
//           }
//         />
//       </Route>

//       {/* ====================== */}
//       {/* PUBLIC PAGES */}
//       {/* ====================== */}
//       <Route path="/about" element={<AboutUs />} />

//       <Route path="/books" element={<Books />}>
//         <Route index element={<BooksList />} />
//       </Route>

//       <Route path="/books/:id" element={<SingleBook />} />

//       {/* ====================== */}
//       {/* PROTECTED (USER) */}
//       {/* ====================== */}
//       <Route
//         path="/cart"
//         element={
//           <ProtectedRoute>
//             <Cart />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/lovebooks"
//         element={
//           <ProtectedRoute>
//             <LoveBooks />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <ProfilePage />
//           </ProtectedRoute>
//         }
//       />
// <Route
//   path="/my-orders"
//   element={
//     <ProtectedRoute>
//       <MyOrders />
//     </ProtectedRoute>
//   }
// />
//       {/* ====================== */}
//       {/* SELLER DASHBOARD (FIXED) */}
//       {/* ====================== */}
//       <Route
//         path="/seller-dashboard"
//         element={
//           <SellerRoute>
//             <SellerDashboard />
//           </SellerRoute>
//         }
//       />
//     </Routes>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Routes Guards
import PublicRoute from "./component/routes/PublicRoute";
import ProtectedRoute from "./component/routes/ProtectedRoute";
import SellerRoute from "./component/routes/SellerRoute";
import AdminRoute from "./component/routes/AdminRoute"; // 👈 NEW

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
import SellerDashboard from "./pages/SellerDashboard";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard"; // 👈 NEW

// Store
import { useAuthStore } from "./store/auth";

// Styles
import "react-loading-skeleton/dist/skeleton.css";

function AppContent() {
  const loadUserFromStorage = useAuthStore(
    (state) => state.loadUserFromStorage
  );

  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  if (!hydrated) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <Routes>

      {/* ====================== */}
      {/* HOME */}
      {/* ====================== */}
      <Route path="/" element={<HomeBefore />} />

      {/* ====================== */}
      {/* AUTH */}
      {/* ====================== */}
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

      {/* ====================== */}
      {/* PUBLIC PAGES */}
      {/* ====================== */}
      <Route path="/about" element={<AboutUs />} />

      <Route path="/books" element={<Books />}>
        <Route index element={<BooksList />} />
      </Route>

      <Route path="/books/:id" element={<SingleBook />} />

      {/* ====================== */}
      {/* USER PROTECTED */}
      {/* ====================== */}
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

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />

      {/* ====================== */}
      {/* SELLER */}
      {/* ====================== */}
      <Route
        path="/seller-dashboard"
        element={
          <SellerRoute>
            <SellerDashboard />
          </SellerRoute>
        }
      />

      {/* ====================== */}
      {/* ADMIN DASHBOARD */}
      {/* ====================== */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
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