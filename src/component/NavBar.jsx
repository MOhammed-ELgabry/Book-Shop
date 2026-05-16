
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
 

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

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

//   return (
//     <div
//       className={`fixed top-0 left-0 w-full h-[92px] z-50 flex justify-between items-center px-10 transition-all duration-300
//       ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
//     >

//       {/* Logo + Links */}
//       <div className="flex gap-2 items-center">
//         <img src={logo} alt="logo" className="h-10" />

//         <NavLink to="/" className={({ isActive }) =>
//           `text-2xl hidden md:inline-block px-2 ${isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"}`
//         }>
//           Home
//         </NavLink>

//         <NavLink to="/books" className={({ isActive }) =>
//           `text-2xl hidden md:inline-block px-2 ${isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"}`
//         }>
//           Books
//         </NavLink>

//         <NavLink to="/about" className={({ isActive }) =>
//           `text-2xl hidden md:inline-block px-2 ${isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"}`
//         }>
//           About Us
//         </NavLink>
//       </div>

//       {/* Desktop */}
//       <div className="hidden md:flex gap-4 items-center">
//         {user ? (
//           <>
//             <div onClick={() => navigate("/profile")}
//               className={`flex flex-col items-center text-sm cursor-pointer ${scrolled ? "text-black" : "text-white"}`}>
//               <span>{user.username}</span>
//               <span className="text-[rgba(200,200,200,0.8)] text-xs">{user.email}</span>
//             </div>

//             <img
//               onClick={() => navigate("/profile")}
//               src={user.avatar || "https://via.placeholder.com/40"}
//               alt="avatar"
//               className="w-10 h-10 rounded-full object-cover cursor-pointer"
//             />

//             <button onClick={() => navigate("/cart")} className="relative">
//               <FaShoppingCart
//                 size={20}
//                 className={`transition ${totalItems > 0 ? "text-red-500" : scrolled ? "text-black" : "text-white"}`}
//               />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {totalItems}
//                 </span>
//               )}
//             </button>

//             <button onClick={() => navigate("/lovebooks")} className="relative">
//               <FaHeart
//                 size={20}
//                 className={`transition ${loveBooksCount > 0 ? "text-red-500" : scrolled ? "text-black" : "text-white"}`}
//               />
//               {loveBooksCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {loveBooksCount}
//                 </span>
//               )}
//             </button>

//             <button onClick={handleLogout}
//               className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition">
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <button onClick={() => navigate("/login")}
//               className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white">
//               Log in
//             </button>

//             <button onClick={() => navigate("/register")}
//               className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)]">
//               Sign Up
//             </button>
//           </>
//         )}
//       </div>

//       {/* Mobile Toggle */}
//       <div className="md:hidden">
//         <button onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen
//             ? <AiOutlineClose size={25} className={scrolled ? "text-black" : "text-white"} />
//             : <AiOutlineMenu size={25} className={scrolled ? "text-black" : "text-white"} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-[92px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-3 shadow-md md:hidden">
//           <Link to="/" className="text-xl text-gray-800">Home</Link>
//           <Link to="/books" className="text-xl text-gray-800">Books</Link>
//           <Link to="/about" className="text-xl text-gray-800">About Us</Link>
//         </div>
//       )}
//     </div>
//   );
// }


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

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };

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

//   // 👇 دالة مساعدة للحصول على اسم العرض
//   const getDisplayName = () => {
//     if (!user) return "";
//     if (user.firstName || user.lastName) {
//       return `${user.firstName || ""} ${user.lastName || ""}`.trim();
//     }
//     return user.username || user.email || "User";
//   };

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
//           Home
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
//           Books
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
//           About Us
//         </NavLink>
//       </div>

//       {/* Desktop */}
//       <div className="hidden md:flex gap-4 items-center">
//         {user ? (
//           <>
//             <div
//               onClick={() => navigate("/profile")}
//               className={`flex flex-col items-center text-sm cursor-pointer ${
//                 scrolled ? "text-black" : "text-white"
//               }`}
//             >
//               <span>{getDisplayName()}</span>
//               <span className="text-[rgba(200,200,200,0.8)] text-xs">
//                 {user.email}
//               </span>
//             </div>

//             <img
//               onClick={() => navigate("/profile")}
//               src={
//                 user.avatar && user.avatar !== ""
//                   ? user.avatar.startsWith("http")
//                     ? user.avatar
//                     : `http://localhost:1337${user.avatar}`
//                   : "https://i.pravatar.cc/40"
//               }
//               alt="avatar"
//               className="w-10 h-10 rounded-full object-cover cursor-pointer"
//               onError={(e) => {
//                 e.target.src = "https://i.pravatar.cc/40";
//               }}
//             />

//             <button onClick={() => navigate("/cart")} className="relative">
//               <FaShoppingCart
//                 size={20}
//                 className={`transition ${
//                   totalItems > 0
//                     ? "text-red-500"
//                     : scrolled
//                     ? "text-black"
//                     : "text-white"
//                 }`}
//               />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {totalItems}
//                 </span>
//               )}
//             </button>

//             <button onClick={() => navigate("/lovebooks")} className="relative">
//               <FaHeart
//                 size={20}
//                 className={`transition ${
//                   loveBooksCount > 0
//                     ? "text-red-500"
//                     : scrolled
//                     ? "text-black"
//                     : "text-white"
//                 }`}
//               />
//               {loveBooksCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                   {loveBooksCount}
//                 </span>
//               )}
//             </button>

//             <button
//               onClick={handleLogout}
//               className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() => navigate("/login")}
//               className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white"
//             >
//               Log in
//             </button>

//             <button
//               onClick={() => navigate("/register")}
//               className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)]"
//             >
//               Sign Up
//             </button>
//           </>
//         )}
//       </div>

//       {/* Mobile Toggle */}
//       <div className="md:hidden">
//         <button onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? (
//             <AiOutlineClose
//               size={25}
//               className={scrolled ? "text-black" : "text-white"}
//             />
//           ) : (
//             <AiOutlineMenu
//               size={25}
//               className={scrolled ? "text-black" : "text-white"}
//             />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-[92px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-3 shadow-md md:hidden">
//           <Link to="/" className="text-xl text-gray-800">
//             Home
//           </Link>
//           <Link to="/books" className="text-xl text-gray-800">
//             Books
//           </Link>
//           <Link to="/about" className="text-xl text-gray-800">
//             About Us
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import "animate.css";
import logo from "../assets/images/book-bookmark 1.png";
import { useAuthStore } from "../store/auth";
import { useCartStore } from "../store/CartStore";
import { useLoveBooksStore } from "../store/LoveBooks";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const cart = useCartStore((state) => state.cart);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const loveBooks = useLoveBooksStore((state) => state.loveBooks);
  const loveBooksCount = loveBooks.length;

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
        Swal.fire({
          icon: "success",
          title: "Logged out!",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // دالة لعرض اسم المستخدم بشكل جميل
  const getDisplayName = () => {
    if (!user) return "";
    if (user.firstName || user.lastName) {
      return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }
    return user.username || user.email || "User";
  };

  // رابط الصورة مع fallback
  const avatarUrl = user?.avatar
    ? user.avatar.startsWith("http")
      ? user.avatar
      : `http://localhost:1337${user.avatar}`
    : "https://i.pravatar.cc/40";

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[92px] z-50 flex justify-between items-center px-10 transition-all duration-300
      ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      {/* Logo + Links (Desktop) */}
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
          Home
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
          Books
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
          About Us
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <>
            <div
              onClick={() => navigate("/profile")}
              className={`flex flex-col items-center text-sm cursor-pointer ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              <span>{getDisplayName()}</span>
              <span className="text-[rgba(200,200,200,0.8)] text-xs">
                {user.email}
              </span>
            </div>

            <img
              onClick={() => navigate("/profile")}
              src={avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onError={(e) => {
                e.target.src = "https://i.pravatar.cc/40";
              }}
            />

            <button onClick={() => navigate("/cart")} className="relative">
              <FaShoppingCart
                size={20}
                className={`transition ${
                  totalItems > 0
                    ? "text-red-500"
                    : scrolled
                    ? "text-black"
                    : "text-white"
                }`}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            <button onClick={() => navigate("/lovebooks")} className="relative">
              <FaHeart
                size={20}
                className={`transition ${
                  loveBooksCount > 0
                    ? "text-red-500"
                    : scrolled
                    ? "text-black"
                    : "text-white"
                }`}
              />
              {loveBooksCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {loveBooksCount}
                </span>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)]"
            >
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile: Avatar + Hamburger */}
      <div className="md:hidden flex items-center gap-3">
        {user && (
          <img
            onClick={() => navigate("/profile")}
            src={avatarUrl}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
            onError={(e) => {
              e.target.src = "https://i.pravatar.cc/32";
            }}
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

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-[92px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-3 shadow-md md:hidden z-50">
          <Link to="/" className="text-xl text-gray-800" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/books" className="text-xl text-gray-800" onClick={() => setMenuOpen(false)}>
            Books
          </Link>
          <Link to="/about" className="text-xl text-gray-800" onClick={() => setMenuOpen(false)}>
            About Us
          </Link>

          {user ? (
            <>
              {/* عرض معلومات المستخدم في الموبايل */}
              <div className="flex flex-col items-center pt-2 border-t border-gray-200 w-full text-center">
                <span className="font-semibold text-gray-800">{getDisplayName()}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>

              {/* الأزرار الخاصة بالمستخدم على الموبايل */}
              <div className="flex gap-4 justify-center w-full">
                <button
                  onClick={() => {
                    navigate("/cart");
                    setMenuOpen(false);
                  }}
                  className="relative"
                >
                  <FaShoppingCart size={22} className="text-gray-700" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
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
                  <FaHeart size={22} className="text-gray-700" />
                  {loveBooksCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {loveBooksCount}
                    </span>
                  )}
                </button>
              </div>

              {/* زر Logout */}
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-red-500 px-6 py-2 rounded text-white hover:bg-red-600 transition w-40 mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 w-full items-center pt-2 border-t border-gray-200">
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                className="bg-[rgba(217,23,108,1)] px-6 py-2 rounded text-white w-40"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setMenuOpen(false);
                }}
                className="border border-[rgba(217,23,108,1)] px-6 py-2 rounded text-[rgba(217,23,108,1)] w-40"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}