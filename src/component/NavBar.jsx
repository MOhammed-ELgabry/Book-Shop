
// import { useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { FaShoppingCart, FaHeart } from "react-icons/fa";
// import Swal from "sweetalert2";
// import "animate.css";
// import logo from "../assets/images/book-bookmark 1.png";

// import { useAuthStore } from "../store/auth";
// import { useCartStore } from "../store/CartStore";
// import { useLoveBooksStore } from "../store/LoveBooks";

// // 🌍 i18n
// import { useLanguageStore } from "../store/languageStore";
// import { dictionary } from "../i18n/dictionary";

// export default function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();

//   const user = useAuthStore((state) => state.user);
//   const logout = useAuthStore((state) => state.logout);

//   const cart = useCartStore((state) => state.cart);
//   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//   const loveBooks = useLoveBooksStore((state) => state.loveBooks);
//   const loveBooksCount = loveBooks.length;

//   const accountType = user?.accountType?.toLowerCase();
//   const isSeller = accountType === "seller" || accountType === "admin";
//   const isAdmin = accountType === "admin";

//   // 🌍 language (READ ONLY)
//   const lang = useLanguageStore((state) => state.lang);
//   const t = dictionary[lang];

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         navigate("/login");
//         Swal.fire({
//           icon: "success",
//           title: "Logged out!",
//           timer: 1500,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   const getDisplayName = () => {
//     if (!user) return "";
//     if (user.firstName || user.lastName) {
//       return `${user.firstName || ""} ${user.lastName || ""}`.trim();
//     }
//     return user.username || user.email || "User";
//   };

// const avatarUrl = user?.avatar
//   ? user.avatar.startsWith("http")
//     ? user.avatar
//     : `${import.meta.env.VITE_API_URL}${user.avatar}`
//   : "https://i.pravatar.cc/40";

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full h-[92px] z-50 flex justify-between items-center px-10 transition-all duration-300
//       ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
//     >

//       {/* Logo + Links */}
//       <div className="flex gap-2 items-center">
//         <img src={logo} alt="logo" className="h-10" />

//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `text-2xl hidden md:inline-block px-2 ${
//               isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"
//             }`
//           }
//         >
//           {t.home}
//         </NavLink>

//         <NavLink
//           to="/books"
//           className={({ isActive }) =>
//             `text-2xl hidden md:inline-block px-2 ${
//               isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"
//             }`
//           }
//         >
//           {t.books}
//         </NavLink>

//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             `text-2xl hidden md:inline-block px-2 ${
//               isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"
//             }`
//           }
//         >
//           {t.about}
//         </NavLink>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex gap-4 items-center">

//         {user ? (
//           <>
//             {/* USER INFO */}
//             <div
//               onClick={() => navigate("/profile")}
//               className={`flex flex-col items-center text-sm cursor-pointer ${
//                 scrolled ? "text-black" : "text-white"
//               }`}
//             >
//               <span>{getDisplayName()}</span>
//               <span className="text-xs opacity-70">{user.email}</span>
//             </div>

//             <img
//               onClick={() => navigate("/profile")}
//               src={avatarUrl}
//               alt="avatar"
//               className="w-10 h-10 rounded-full object-cover cursor-pointer"
//             />

//             {/* USER MODE */}
//             {!isSeller ? (
//               <>
//                 <button onClick={() => navigate("/cart")} className="relative">
//                   <FaShoppingCart
//                     size={20}
//                     className={totalItems > 0 ? "text-red-500" : scrolled ? "text-black" : "text-white"}
//                   />
//                   {totalItems > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                       {totalItems}
//                     </span>
//                   )}
//                 </button>

//                 <button onClick={() => navigate("/lovebooks")} className="relative">
//                   <FaHeart
//                     size={20}
//                     className={loveBooksCount > 0 ? "text-red-500" : scrolled ? "text-black" : "text-white"}
//                   />
//                   {loveBooksCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                       {loveBooksCount}
//                     </span>
//                   )}
//                 </button>
//               </>
//             ) : (
//               <div className="flex gap-2 items-center">
//                 <button
//                   onClick={() => navigate("/my-orders")}
//                   className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   {t.myOrders}
//                 </button>

//                 <button
//                   onClick={() => navigate("/seller-dashboard")}
//                   className="px-4 py-2 rounded-lg text-white bg-black hover:bg-green-700"
//                 >
//                   {t.seller}
//                 </button>

//                 {isAdmin && (
//                   <button
//                     onClick={() => navigate("/admin-dashboard")}
//                     className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
//                   >
//                     {t.admin}
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* LOGOUT */}
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
//             >
//               {t.logout}
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white"
//             >
//               {lang === "en" ? "Log in" : "تسجيل الدخول"}
//             </button>

//             <button
//               onClick={() => navigate("/register")}
//               className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)]"
//             >
//               {lang === "en" ? "Sign Up" : "إنشاء حساب"}
//             </button>
//           </>
//         )}

//       </div>

//       {/* MOBILE */}
//       <div className="md:hidden flex items-center gap-3">
//         {user && (
//           <img
//             onClick={() => navigate("/profile")}
//             src={avatarUrl}
//             className="w-8 h-8 rounded-full object-cover"
//           />
//         )}

//         <button onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? (
//             <AiOutlineClose size={25} className={scrolled ? "text-black" : "text-white"} />
//           ) : (
//             <AiOutlineMenu size={25} className={scrolled ? "text-black" : "text-white"} />
//           )}
//         </button>
//       </div>

//       {/* MOBILE MENU */}
//       {menuOpen && (
//         <div className="absolute top-[92px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-3 shadow-md md:hidden z-50">
//           <Link to="/" onClick={() => setMenuOpen(false)}>{t.home}</Link>
//           <Link to="/books" onClick={() => setMenuOpen(false)}>{t.books}</Link>
//           <Link to="/about" onClick={() => setMenuOpen(false)}>{t.about}</Link>

//           {user && (
//             <>
//               {!isSeller ? (
//                 <div className="flex gap-4">
//                   <button onClick={() => navigate("/cart")}><FaShoppingCart /></button>
//                   <button onClick={() => navigate("/lovebooks")}><FaHeart /></button>
//                 </div>
//               ) : (
//                 <>
//                   <button onClick={() => navigate("/my-orders")}>{t.myOrders}</button>
//                   <button onClick={() => navigate("/seller-dashboard")}>{t.seller}</button>
//                   {isAdmin && (
//                     <button onClick={() => navigate("/admin-dashboard")}>{t.admin}</button>
//                   )}
//                 </>
//               )}

//               <button onClick={handleLogout}>{t.logout}</button>
//             </>
//           )}
//         </div>
//       )}

//     </div>
//   );
// }

// import { useState, useEffect, useMemo } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { FaShoppingCart, FaHeart } from "react-icons/fa";
// import Swal from "sweetalert2";
// import "animate.css";

// import logo from "../assets/images/book-bookmark 1.png";

// import { useAuthStore } from "../store/auth";
// import { useCartStore } from "../store/CartStore";
// import { useLoveBooksStore } from "../store/LoveBooks";

// import { useLanguageStore } from "../store/languageStore";
// import { dictionary } from "../i18n/dictionary";

// import { getStrapiMedia } from "../utils/getStrapiMedia";

// export default function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const navigate = useNavigate();

//   const user = useAuthStore((state) => state.user);
//   const logout = useAuthStore((state) => state.logout);

//   const cart = useCartStore((state) => state.cart) || [];
//   const loveBooks = useLoveBooksStore((state) => state.loveBooks) || [];

//   const totalItems = cart.reduce((acc, item) => acc + (item?.quantity || 0), 0);
//   const loveBooksCount = loveBooks.length;

//   const lang = useLanguageStore((state) => state.lang);
//   const t = dictionary[lang];

//   const accountType = user?.accountType?.toLowerCase() || "";
//   const isSeller = ["seller", "admin"].includes(accountType);
//   const isAdmin = accountType === "admin";
//   const isLoggedIn = !!user;

//   useEffect(() => {
//     let timeout;

//     const handleScroll = () => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => {
//         setScrolled(window.scrollY > 50);
//       }, 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       clearTimeout(timeout);
//     };
//   }, []);

//   const handleLogout = async () => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will be logged out!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, logout",
//     });

//     if (result.isConfirmed) {
//       logout();
//       navigate("/login");

//       Swal.fire({
//         icon: "success",
//         title: "Logged out!",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     }
//   };

//   const displayName = useMemo(() => {
//     if (!user) return "";
//     if (user.firstName || user.lastName) {
//       return `${user.firstName || ""} ${user.lastName || ""}`.trim();
//     }
//     return user.username || user.email || "User";
//   }, [user]);

//   const avatarUrl = user?.avatar
//     ? getStrapiMedia(user.avatar, "https://i.pravatar.cc/40")
//     : "https://i.pravatar.cc/40";

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full h-[92px] z-50 flex justify-between items-center px-10 transition-all duration-300
//       ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
//     >
//       {/* Logo + Links */}
//       <div className="flex gap-2 items-center">
//         <img src={logo} alt="logo" className="h-10" />

//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `text-2xl hidden md:inline-block px-2 ${
//               isActive
//                 ? "text-orange-500"
//                 : scrolled
//                 ? "text-black"
//                 : "text-white"
//             }`
//           }
//         >
//           {t.home}
//         </NavLink>

//         <NavLink
//           to="/books"
//           className={({ isActive }) =>
//             `text-2xl hidden md:inline-block px-2 ${
//               isActive
//                 ? "text-orange-500"
//                 : scrolled
//                 ? "text-black"
//                 : "text-white"
//             }`
//           }
//         >
//           {t.books}
//         </NavLink>

//         <NavLink
//           to="/about"
//           className={({ isActive }) =>
//             `text-2xl hidden md:inline-block px-2 ${
//               isActive
//                 ? "text-orange-500"
//                 : scrolled
//                 ? "text-black"
//                 : "text-white"
//             }`
//           }
//         >
//           {t.about}
//         </NavLink>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex gap-4 items-center">
//         {isLoggedIn ? (
//           <>
//             {/* USER INFO */}
//             <div
//               onClick={() => navigate("/profile")}
//               className={`flex flex-col items-center text-sm cursor-pointer ${
//                 scrolled ? "text-black" : "text-white"
//               }`}
//             >
//               <span>{displayName}</span>
//               <span className="text-xs opacity-70">{user?.email}</span>
//             </div>

//             <img
//               onClick={() => navigate("/profile")}
//               src={avatarUrl}
//               alt="avatar"
//               className="w-10 h-10 rounded-full object-cover cursor-pointer"
//             />

//             {/* USER MODE */}
//             {!isSeller ? (
//               <>
//                 <button onClick={() => navigate("/cart")} className="relative">
//                   <FaShoppingCart
//                     size={20}
//                     className={
//                       totalItems > 0
//                         ? "text-red-500"
//                         : scrolled
//                         ? "text-black"
//                         : "text-white"
//                     }
//                   />
//                 </button>

//                 <button
//                   onClick={() => navigate("/lovebooks")}
//                   className="relative"
//                 >
//                   <FaHeart
//                     size={20}
//                     className={
//                       loveBooksCount > 0
//                         ? "text-red-500"
//                         : scrolled
//                         ? "text-black"
//                         : "text-white"
//                     }
//                   />
//                 </button>
//               </>
//             ) : (
//               <div className="flex gap-2 items-center">
//                 <button onClick={() => navigate("/my-orders")}>
//                   {t.myOrders}
//                 </button>

//                 <button onClick={() => navigate("/seller-dashboard")}>
//                   {t.seller}
//                 </button>

//                 {isAdmin && (
//                   <button onClick={() => navigate("/admin-dashboard")}>
//                     {t.admin}
//                   </button>
//                 )}
//               </div>
//             )}

//             {/* LOGOUT */}
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 px-4 py-2 rounded text-white"
//             >
//               {t.logout}
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white"
//             >
//               {lang === "en" ? "Log in" : "تسجيل الدخول"}
//             </button>

//             <button
//               onClick={() => navigate("/register")}
//               className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)]"
//             >
//               {lang === "en" ? "Sign Up" : "إنشاء حساب"}
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
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

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
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

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[92px] z-50 flex justify-between items-center px-10 transition-all duration-300
      ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      {/* LEFT: LOGO + LINKS */}
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="h-10" />

        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-2xl hidden md:inline-block px-2 ${
              isActive
                ? "text-orange-500"
                : scrolled
                ? "text-black"
                : "text-white"
            }`
          }
        >
          {t.home}
        </NavLink>

        <NavLink
          to="/books"
          className={({ isActive }) =>
            `text-2xl hidden md:inline-block px-2 ${
              isActive
                ? "text-orange-500"
                : scrolled
                ? "text-black"
                : "text-white"
            }`
          }
        >
          {t.books}
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `text-2xl hidden md:inline-block px-2 ${
              isActive
                ? "text-orange-500"
                : scrolled
                ? "text-black"
                : "text-white"
            }`
          }
        >
          {t.about}
        </NavLink>
      </div>

      {/* RIGHT: DESKTOP */}
      <div className="hidden md:flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            {/* USER INFO */}
            <div
              onClick={() => navigate("/profile")}
              className={`flex flex-col items-center text-sm cursor-pointer ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              <span>{displayName}</span>
              <span className="text-xs opacity-70">{user?.email}</span>
            </div>

            <img
              onClick={() => navigate("/profile")}
              src={avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />

            {/* USER MODE */}
            {!isSeller ? (
              <>
                <button
                  onClick={() => navigate("/cart")}
                  className="relative"
                >
                  <FaShoppingCart
                    size={20}
                    className={
                      totalItems > 0
                        ? "text-red-500"
                        : scrolled
                        ? "text-black"
                        : "text-white"
                    }
                  />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {totalItems}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigate("/lovebooks")}
                  className="relative"
                >
                  <FaHeart
                    size={20}
                    className={
                      loveBooksCount > 0
                        ? "text-red-500"
                        : scrolled
                        ? "text-black"
                        : "text-white"
                    }
                  />
                  {loveBooksCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {loveBooksCount}
                    </span>
                  )}
                </button>
              </>
            ) : (
              <div className="flex gap-2 items-center">
                <button onClick={() => navigate("/my-orders")}>
                  {t.myOrders}
                </button>

                <button onClick={() => navigate("/seller-dashboard")}>
                  {t.seller}
                </button>

                {isAdmin && (
                  <button onClick={() => navigate("/admin-dashboard")}>
                    {t.admin}
                  </button>
                )}
              </div>
            )}

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
            >
              {t.logout}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white"
            >
              {lang === "en" ? "Log in" : "تسجيل الدخول"}
            </button>

            <button
              onClick={() => navigate("/register")}
              className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)]"
            >
              {lang === "en" ? "Sign Up" : "إنشاء حساب"}
            </button>
          </>
        )}
      </div>

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center gap-3">
        {user && (
          <img
            onClick={() => navigate("/profile")}
            src={avatarUrl}
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            alt="avatar"
          />
        )}

        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <AiOutlineClose
              size={25}
              className={scrolled ? "text-black" : "text-white"}
            />
          ) : (
            <AiOutlineMenu
              size={25}
              className={scrolled ? "text-black" : "text-white"}
            />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-[92px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-3 shadow-md md:hidden z-50">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            {t.home}
          </Link>

          <Link to="/books" onClick={() => setMenuOpen(false)}>
            {t.books}
          </Link>

          <Link to="/about" onClick={() => setMenuOpen(false)}>
            {t.about}
          </Link>

          {isLoggedIn && (
            <>
              {!isSeller ? (
                <div className="flex gap-6 items-center">
                  <button
                    onClick={() => {
                      navigate("/cart");
                      setMenuOpen(false);
                    }}
                    className="relative"
                  >
                    <FaShoppingCart />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {totalItems}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      navigate("/lovebooks");
                      setMenuOpen(false);
                    }}
                    className="relative"
                  >
                    <FaHeart />
                    {loveBooksCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {loveBooksCount}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/my-orders");
                      setMenuOpen(false);
                    }}
                  >
                    {t.myOrders}
                  </button>

                  <button
                    onClick={() => {
                      navigate("/seller-dashboard");
                      setMenuOpen(false);
                    }}
                  >
                    {t.seller}
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => {
                        navigate("/admin-dashboard");
                        setMenuOpen(false);
                      }}
                    >
                      {t.admin}
                    </button>
                  )}
                </>
              )}

              <button onClick={handleLogout} className="text-red-500">
                {t.logout}
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                {lang === "en" ? "Log in" : "تسجيل الدخول"}
              </button>

              <button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
              >
                {lang === "en" ? "Sign Up" : "إنشاء حساب"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}