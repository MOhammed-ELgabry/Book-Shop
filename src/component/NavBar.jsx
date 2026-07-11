
import { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import Swal from "sweetalert2";
import "animate.css";

import logo from "../assets/images/book-bookmark 1.png";

import { useAuthStore } from "../store/auth";
import { useCartStore } from "../store/CartStore";
import { useLoveBooksStore } from "../store/LoveBooks";

import { useLanguageStore } from "../store/languageStore";
import { dictionary } from "../i18n/dictionary";

import { getStrapiMedia } from "../utils/getStrapiMedia";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const cart = useCartStore((state) => state.cart) || [];
  const loveBooks = useLoveBooksStore((state) => state.loveBooks) || [];

  const totalItems = cart.reduce(
    (acc, item) => acc + (item?.quantity || 0),
    0
  );

  const loveBooksCount = loveBooks.length;

  const lang = useLanguageStore((state) => state.lang);
  const toggleLang = useLanguageStore((state) => state.toggleLang);
  const t = dictionary[lang];

  const accountType = user?.accountType?.toLowerCase() || "";
  const isSeller = ["seller", "admin"].includes(accountType);
  const isAdmin = accountType === "admin";
  const isLoggedIn = !!user;

  useEffect(() => {
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setScrolled(window.scrollY > 50);
      }, 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      logout();
      setMenuOpen(false);
      navigate("/login");

      Swal.fire({
        icon: "success",
        title: "Logged out!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const displayName = useMemo(() => {
    if (!user) return "";
    if (user.firstName || user.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user.username || user.email || "User";
  }, [user]);

  const avatarUrl = user?.avatar
    ? getStrapiMedia(user.avatar, "https://i.pravatar.cc/40")
    : "https://i.pravatar.cc/40";

  const linkClass = (isActive) =>
    `text-sm font-semibold tracking-wide hidden md:inline-block px-4 py-2 rounded-xl transition-all duration-200 ${
      isActive
        ? "text-orange-500 bg-orange-50/80 shadow-sm"
        : scrolled
        ? "text-slate-700 hover:text-orange-500 hover:bg-slate-50"
        : "text-white/95 hover:text-orange-400 hover:bg-white/10"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-slate-950/40 backdrop-blur-sm border-b border-white/5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12">
        {/* LEFT: LOGO + LINKS */}
        <div className="flex gap-2 sm:gap-4 lg:gap-6 items-center overflow-hidden">
          <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95">
            <img
              src={logo}
              alt="logo"
              className="h-9 sm:h-10 w-auto"
            />
          </Link>

          <div className="hidden md:flex gap-1 lg:gap-2">
            <NavLink to="/" className={({ isActive }) => linkClass(isActive)}>
              {t.home}
            </NavLink>

            <NavLink to="/books" className={({ isActive }) => linkClass(isActive)}>
              {t.books}
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => linkClass(isActive)}>
              {t.about}
            </NavLink>
          </div>
        </div>

        {/* RIGHT: DESKTOP */}
        <div className="hidden md:flex gap-3 lg:gap-5 items-center flex-shrink-0">
         

          {isLoggedIn ? (
            <>
              {/* USER INFO */}
              <div
                onClick={() => navigate("/profile")}
                className="flex flex-col items-end text-right cursor-pointer group max-w-[150px] lg:max-w-[200px]"
              >
                <span
                  className={`text-sm font-bold truncate w-full transition-colors duration-200 ${
                    scrolled
                      ? "text-slate-800 group-hover:text-orange-500"
                      : "text-white group-hover:text-orange-400"
                  }`}
                >
                  {displayName}
                </span>
                <span
                  className={`text-[11px] truncate w-full transition-colors duration-200 ${
                    scrolled ? "text-slate-500" : "text-white/60"
                  }`}
                >
                  {user?.email}
                </span>
              </div>

              <img
                onClick={() => navigate("/profile")}
                src={avatarUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-transparent hover:border-orange-500 hover:scale-105 transition-all duration-300 shadow-sm"
              />

              {/* USER MODE */}
              {!isSeller ? (
                <div className="flex gap-1.5 lg:gap-3">
                  <button
                    onClick={() => navigate("/cart")}
                    className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200 group active:scale-90"
                  >
                    <FaShoppingCart
                      size={20}
                      className={`transition-colors duration-200 ${
                        totalItems > 0
                          ? "text-orange-500"
                          : scrolled
                          ? "text-slate-700 group-hover:text-orange-500"
                          : "text-white/95 group-hover:text-orange-400"
                      }`}
                    />
                    {totalItems > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md ring-2 ring-white animate-bounce">
                        {totalItems}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => navigate("/lovebooks")}
                    className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200 group active:scale-90"
                  >
                    <FaHeart
                      size={20}
                      className={`transition-colors duration-200 ${
                        loveBooksCount > 0
                          ? "text-red-500"
                          : scrolled
                          ? "text-slate-700 group-hover:text-red-500"
                          : "text-white/95 group-hover:text-red-400"
                      }`}
                    />
                    {loveBooksCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md ring-2 ring-white">
                        {loveBooksCount}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div className="flex gap-1.5 lg:gap-2 items-center">
                  <button
                    className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all active:scale-95 whitespace-nowrap"
                    onClick={() => navigate("/my-orders")}
                  >
                    {t.myOrders}
                  </button>

                  <button
                    className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-105 transition-all active:scale-95 whitespace-nowrap"
                    onClick={() => navigate("/seller-dashboard")}
                  >
                    {t.seller}
                  </button>

                  {isAdmin && (
                    <button
                      className="px-3 lg:px-4 py-2 text-xs lg:text-sm font-bold rounded-xl bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-500/20 hover:scale-105 transition-all active:scale-95 whitespace-nowrap"
                      onClick={() => navigate("/admin-dashboard")}
                    >
                      {t.admin}
                    </button>
                  )}
                </div>
              )}

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className={`px-4 py-2 text-xs lg:text-sm font-bold rounded-xl border transition-all duration-200 active:scale-95 whitespace-nowrap ${
                  scrolled
                    ? "border-rose-100 text-rose-600 bg-rose-50/50 hover:bg-rose-600 hover:text-white hover:border-rose-600"
                    : "border-white/10 text-white/90 hover:bg-rose-600 hover:text-white hover:border-rose-600"
                }`}
              >
                {t.logout}
              </button>
            </>
          ) : (
            <div className="flex gap-2 lg:gap-3">
              <button
                onClick={() => navigate("/login")}
                className={`px-4 lg:px-6 py-2 text-xs lg:text-sm font-bold rounded-xl border transition-all duration-300 active:scale-95 ${
                  scrolled
                    ? "border-slate-200 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800"
                    : "border-white/20 text-white hover:bg-white hover:text-slate-900 hover:border-white"
                }`}
              >
                {lang === "en" ? "Log in" : "تسجيل الدخول"}
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-4 lg:px-6 py-2 text-xs lg:text-sm font-bold rounded-xl bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 active:scale-95 shadow-md shadow-orange-500/10"
              >
                {lang === "en" ? "Sign Up" : "إنشاء حساب"}
              </button>
            </div>
          )}
        </div>

        {/* MOBILE HEADER */}
        <div className="md:hidden flex items-center gap-2 sm:gap-4">
          {user && (
            <div className="flex flex-col items-end mr-1 max-w-[80px] xs:max-w-[120px]">
              <span className={`text-[10px] font-bold truncate w-full ${scrolled ? 'text-slate-800' : 'text-white'}`}>
                {displayName}
              </span>
            </div>
          )}

          {user && (
            <img
              onClick={() => navigate("/profile")}
              src={avatarUrl}
              className="w-9 h-9 rounded-full object-cover cursor-pointer border border-orange-500/30 ring-2 ring-white/10 shadow-sm"
              alt="avatar"
            />
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-xl transition-all duration-200 active:scale-90 ${
              scrolled ? "bg-slate-100 text-slate-800" : "bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <AiOutlineClose size={22} />
            ) : (
              <AiOutlineMenu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          <div 
            className="fixed inset-0 top-[80px] bg-slate-950/20 backdrop-blur-sm z-40 md:hidden animate__animated animate__fadeIn animate__faster" 
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-[80px] left-0 w-full bg-white border-b border-slate-100 flex flex-col items-center py-8 px-6 space-y-4 shadow-2xl md:hidden z-50 animate__animated animate__fadeInDown animate__faster">
            <div className="w-full space-y-1">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="text-base font-bold text-slate-700 hover:text-orange-500 w-full flex justify-center py-3.5 rounded-2xl hover:bg-slate-50 transition-all duration-200"
              >
                {t.home}
              </Link>

              <Link
                to="/books"
                onClick={() => setMenuOpen(false)}
                className="text-base font-bold text-slate-700 hover:text-orange-500 w-full flex justify-center py-3.5 rounded-2xl hover:bg-slate-50 transition-all duration-200"
              >
                {t.books}
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="text-base font-bold text-slate-700 hover:text-orange-500 w-full flex justify-center py-3.5 rounded-2xl hover:bg-slate-50 transition-all duration-200"
              >
                {t.about}
              </Link>
            </div>

            {/* 🌍 LANGUAGE BUTTON FOR MOBILE */}
          

            {isLoggedIn && (
              <div className="w-full space-y-4 pt-2">
                <div className="flex flex-col items-center bg-slate-50 rounded-2xl py-4 px-4 border border-slate-100 shadow-inner">
                  <p className="font-black text-slate-800 text-base truncate w-full text-center">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-500 truncate w-full text-center mt-0.5">{user?.email}</p>
                </div>

                {!isSeller ? (
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => {
                        navigate("/cart");
                        setMenuOpen(false);
                      }}
                      className="relative flex items-center justify-center gap-2.5 bg-white border-2 border-slate-100 hover:border-orange-500/50 rounded-2xl py-4 w-1/2 transition-all text-slate-700 hover:text-orange-500 font-bold text-sm active:scale-95 shadow-sm"
                    >
                      <FaShoppingCart size={18} className="text-orange-500" />
                      <span>{lang === "en" ? "Cart" : "السلة"}</span>
                      {totalItems > 0 && (
                        <span className="bg-orange-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                          {totalItems}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        navigate("/lovebooks");
                        setMenuOpen(false);
                      }}
                      className="relative flex items-center justify-center gap-2.5 bg-white border-2 border-slate-100 hover:border-red-500/50 rounded-2xl py-4 w-1/2 transition-all text-slate-700 hover:text-red-500 font-bold text-sm active:scale-95 shadow-sm"
                    >
                      <FaHeart size={18} className="text-red-500" />
                      <span>{lang === "en" ? "Favorites" : "المفضلة"}</span>
                      {loveBooksCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                          {loveBooksCount}
                        </span>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5 w-full">
                    <button
                      className="py-4 w-full text-sm font-black rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-600/10"
                      onClick={() => {
                        navigate("/my-orders");
                        setMenuOpen(false);
                      }}
                    >
                      {t.myOrders}
                    </button>

                    <button
                      className="py-4 w-full text-sm font-black rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-600/10"
                      onClick={() => {
                        navigate("/seller-dashboard");
                        setMenuOpen(false);
                      }}
                    >
                      {t.seller}
                    </button>

                    {isAdmin && (
                      <button
                        className="py-4 w-full text-sm font-black rounded-2xl bg-rose-600 text-white hover:bg-rose-700 active:scale-95 transition-all shadow-md shadow-rose-600/10"
                        onClick={() => {
                          navigate("/admin-dashboard");
                          setMenuOpen(false);
                        }}
                      >
                        {t.admin}
                      </button>
                    )}
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-center py-4 text-sm font-bold text-rose-500 rounded-2xl hover:bg-rose-50 transition-all border-2 border-rose-50 active:scale-95"
                >
                  {t.logout}
                </button>
              </div>
            )}

            {!isLoggedIn && (
              <div className="flex gap-3 w-full pt-4">
                <button
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                  className="py-4 text-sm font-extrabold text-slate-700 border-2 border-slate-100 rounded-2xl w-1/2 hover:bg-slate-50 transition-all active:scale-95"
                >
                  {lang === "en" ? "Log in" : "تسجيل الدخول"}
                </button>

                <button
                  onClick={() => {
                    navigate("/register");
                    setMenuOpen(false);
                  }}
                  className="py-4 text-sm font-extrabold bg-orange-500 text-white rounded-2xl w-1/2 hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                >
                  {lang === "en" ? "Sign Up" : "إنشاء حساب"}
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
