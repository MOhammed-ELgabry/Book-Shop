// import React, { useEffect } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";

// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import PublicLayout from "./pages/PublicLayout";
// import HomeBefore from "./pages/HomeBefore";
// import { useAuthStore } from "./store/auth";
// import AboutUs from "./pages/AboutUs";
// import Books from "./pages/Books";
// import BooksList from "./pages/BooksList";
// import SingleBook from "./pages/SingleBook";
// import Cart from "./pages/Cart";
// import LoveBooks from "./pages/LoveBooks";
// import ProtectedRoute from "./component/ProtectedRoute";
// import ProfilePage from "./pages/ProfilePage";
// import 'react-loading-skeleton/dist/skeleton.css';
// import GlobalLoader from "./components/GlobalLoader";
// import { useLoaderStore } from "./store/loader";
// export default function App() {

//     const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);

//   useEffect(() => {
//     loadUserFromStorage();
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomeBefore  />} />


//         <Route element={<PublicLayout />}>
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/login" element={<LoginPage />} />
//         </Route>
//         <Route path="/about" element={<AboutUs />} />
//  <Route path="/books" element={<Books />}>
//   <Route index element={<BooksList />} />
 
// </Route>
// <Route path="/books/:id" element={<SingleBook />} />
// <Route
//   path="/cart"
//   element={
//     <ProtectedRoute>
//       <Cart />
//     </ProtectedRoute>
//   }
// />
// <Route
//   path="/lovebooks"
//   element={
//     <ProtectedRoute>
//       <LoveBooks />
//     </ProtectedRoute>
//   }
// />
// <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
      
//     </BrowserRouter>
//   );
// }

// import React, { useEffect } from "react";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import PublicLayout from "./pages/PublicLayout";
// import HomeBefore from "./pages/HomeBefore";
// import { useAuthStore } from "./store/auth";
// import AboutUs from "./pages/AboutUs";
// import Books from "./pages/Books";
// import BooksList from "./pages/BooksList";
// import SingleBook from "./pages/SingleBook";
// import Cart from "./pages/Cart";
// import LoveBooks from "./pages/LoveBooks";
// import ProtectedRoute from "./component/ProtectedRoute";
// import ProfilePage from "./pages/ProfilePage";

// import "react-loading-skeleton/dist/skeleton.css";

// import GlobalLoader from "./component/GlobalLoader";
// import { useLoaderStore } from "./store/loader";


// function AppContent() {
//   const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);
//   const loading = useLoaderStore((state) => state.loading);
//   const setLoading = useLoaderStore((state) => state.setLoading);

//   const location = useLocation();

//   useEffect(() => {
//     loadUserFromStorage();
//   }, []);

//   // 👇 ده المسؤول عن تشغيل اللودر مع التنقل
//   useEffect(() => {
//     setLoading(true);

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, [location]);

//   return (
//     <>
//       {loading && <GlobalLoader />}

//       <Routes>
//         <Route path="/" element={<HomeBefore />} />

//         <Route element={<PublicLayout />}>
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/login" element={<LoginPage />} />
//         </Route>

//         <Route path="/about" element={<AboutUs />} />

//         <Route path="/books" element={<Books />}>
//           <Route index element={<BooksList />} />
//         </Route>

//         <Route path="/books/:id" element={<SingleBook />} />

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <Cart />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/lovebooks"
//           element={
//             <ProtectedRoute>
//               <LoveBooks />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/profile" element={<ProfilePage />} />
//       </Routes>
//     </>
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
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

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

// Components
import ProtectedRoute from "./component/ProtectedRoute";
import GlobalLoader from "./component/GlobalLoader";

// Stores
import { useAuthStore } from "./store/auth";
import { useLoaderStore } from "./store/loader";

// Styles
import "react-loading-skeleton/dist/skeleton.css";

function AppContent() {
  const loadUserFromStorage = useAuthStore(
    (state) => state.loadUserFromStorage
  );
  const loading = useLoaderStore((state) => state.loading);
  const setLoading = useLoaderStore((state) => state.setLoading);

  const location = useLocation();

  // تحميل اليوزر أول ما الاب يفتح
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // تشغيل اللودر مع تغيير الصفحات
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // مدة أخف وأنعم

    return () => clearTimeout(timer);
  }, [location.pathname]); // 👈 مهم جدًا

  return (
    <>
      {/* 👇 اللودر ثابت مش بيتشال */}
      <GlobalLoader loading={loading} />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomeBefore />} />

        {/* Auth */}
        <Route element={<PublicLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Pages */}
        <Route path="/about" element={<AboutUs />} />

        {/* Books */}
        <Route path="/books" element={<Books />}>
          <Route index element={<BooksList />} />
        </Route>

        <Route path="/books/:id" element={<SingleBook />} />

        {/* Protected */}
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

        {/* Profile */}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}