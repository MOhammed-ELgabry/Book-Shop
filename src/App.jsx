import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PublicLayout from "./pages/PublicLayout";
import HomeBefore from "./pages/HomeBefore";
import { useAuthStore } from "./store/auth";
import AboutUs from "./pages/AboutUs";
import Books from "./pages/Books";
import BooksList from "./pages/BooksList";
import SingleBook from "./pages/SingleBook";
import Cart from "./pages/Cart";
export default function App() {

    const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeBefore  />} />


        <Route element={<PublicLayout />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
 <Route path="/books" element={<Books />}>
  <Route index element={<BooksList />} />
 
</Route>
<Route path="/books/:id" element={<SingleBook />} />
<Route path="/cart" element={<Cart />} />

      </Routes>
      
    </BrowserRouter>
  );
}
