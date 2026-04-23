
// import { useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { FaShoppingCart, FaHeart } from "react-icons/fa";
// import Swal from "sweetalert2";
// import WOW from "wowjs";

// import "animate.css";
// import logo from "../assets/images/book-bookmark 1.png";
// import { useAuthStore } from "../store/auth";
// import { useCartStore } from "../store/CartStore";
// import { useLoveBooksStore } from "../store/LoveBooks";

// export default function NavBar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Zustand state
//   const user = useAuthStore((state) => state.user);
//   const logout = useAuthStore((state) => state.logout);

//   const cart = useCartStore((state) => state.cart);
//   const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//   const loveBooks = useLoveBooksStore((state) => state.loveBooks);
//   const loveBooksCount = loveBooks.length;

//   // Initialize WOW.js
//   useEffect(() => {
//     new WOW.WOW({
//       live: false,
//     }).init();
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
//     <div className="fixed top-0 left-0 w-full h-[92px] bg-[rgba(255,255,255,0.5)] z-50 flex justify-between items-center px-10 wow animate__animated animate__fadeInDown">

//       {/* Logo + Links */}
//       <div className="flex gap-2 items-center wow animate__animated animate__fadeInLeft" data-wow-delay="0.2s">
//         <img src={logo} alt="logo" className="h-10 animate__animated animate__zoomIn" />
//         <NavLink to="/" className={({ isActive }) => `text-2xl hidden md:inline-block px-2 wow animate__animated animate__fadeInUp ${isActive ? "text-orange-500" : "text-white"}`} data-wow-delay="0.3s">Home</NavLink>
//         <NavLink to="/books" className={({ isActive }) => `text-2xl hidden md:inline-block px-2 wow animate__animated animate__fadeInUp ${isActive ? "text-orange-500" : "text-white"}`} data-wow-delay="0.4s">Books</NavLink>
//         <NavLink to="/about" className={({ isActive }) => `text-2xl hidden md:inline-block px-2 wow animate__animated animate__fadeInUp ${isActive ? "text-orange-500" : "text-white"}`} data-wow-delay="0.5s">About Us</NavLink>
//       </div>

//       {/* Desktop */}
//       <div className="hidden md:flex gap-4 items-center wow animate__animated animate__fadeInRight" data-wow-delay="0.6s">
//         {user ? (
//           <>
//             <div onClick={() => navigate("/profile")} className="flex flex-col items-center text-white text-sm cursor-pointer wow animate__animated animate__fadeIn" data-wow-delay="0.7s">
//               <span>{user.username}</span>
//               <span className="text-[rgba(200,200,200,0.8)] text-xs">{user.email}</span>
//             </div>

//             <img
//               onClick={() => navigate("/profile")}
//               src={user.avatar || "https://via.placeholder.com/40"}
//               alt="avatar"
//               className="w-10 h-10 rounded-full object-cover cursor-pointer wow animate__animated animate__zoomIn"
//               data-wow-delay="0.8s"
//             />

//             <button onClick={() => navigate("/cart")} className="relative wow animate__animated animate__fadeIn" data-wow-delay="0.9s">
//               <FaShoppingCart size={20} className={`transition ${totalItems > 0 ? "text-red-500" : "text-white"}`} />
//               {totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{totalItems}</span>
//               )}
//             </button>

//             <button onClick={() => navigate("/lovebooks")} className="relative wow animate__animated animate__fadeIn" data-wow-delay="1s">
//               <FaHeart size={20} className={`transition ${loveBooksCount > 0 ? "text-red-500" : "text-white"}`} />
//               {loveBooksCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">{loveBooksCount}</span>
//               )}
//             </button>

//             <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition wow animate__animated animate__fadeIn" data-wow-delay="1.1s">Logout</button>
//           </>
//         ) : (
//           <>
//             <button onClick={() => navigate("/login")} className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white wow animate__animated animate__fadeIn" data-wow-delay="0.7s">Log in</button>
//             <button onClick={() => navigate("/register")} className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)] wow animate__animated animate__fadeIn" data-wow-delay="0.8s">Sign Up</button>
//           </>
//         )}
//       </div>

//       {/* Mobile Toggle */}
//       <div className="md:hidden wow animate__animated animate__fadeIn" data-wow-delay="1.2s">
//         <button onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <AiOutlineClose size={25} className="text-white" /> : <AiOutlineMenu size={25} className="text-white" />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="absolute top-[92px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-3 shadow-md md:hidden wow animate__animated animate__fadeInDown">
//           <Link to="/" className="text-2xl text-[rgba(217,23,108,1)]">Book Shop</Link>
//           <Link to="/" className="text-xl text-gray-800">Home</Link>
//           <Link to="/books" className="text-xl text-gray-800">Books</Link>
//           <Link to="/about" className="text-xl text-gray-800">About Us</Link>

//           {user ? (
//             <>
//               <div onClick={() => navigate("/profile")} className="flex flex-col items-center cursor-pointer">
//                 <span className="font-semibold">{user.username}</span>
//                 <span className="text-sm text-gray-500">{user.email}</span>
//               </div>

//               <img
//                 onClick={() => navigate("/profile")}
//                 src={user.avatar || "https://via.placeholder.com/40"}
//                 alt="avatar"
//                 className="w-10 h-10 rounded-full object-cover cursor-pointer"
//               />

//               <button onClick={() => navigate("/cart")} className="w-3/4 py-2 flex items-center justify-center gap-2 bg-[rgba(217,23,108,1)] text-white rounded relative">
//                 <FaShoppingCart size={20} />
//                 Cart
//                 {totalItems > 0 && (
//                   <span className="absolute top-1 right-3 bg-white text-[rgba(217,23,108,1)] text-xs px-2 rounded-full">{totalItems}</span>
//                 )}
//               </button>

//               <button onClick={() => navigate("/lovebooks")} className="w-3/4 py-2 flex items-center justify-center gap-2 border border-[rgba(217,23,108,1)] text-[rgba(217,23,108,1)] rounded relative">
//                 <FaHeart size={20} />
//                 Favorites
//                 {loveBooksCount > 0 && (
//                   <span className="absolute top-1 right-3 bg-[rgba(217,23,108,1)] text-white text-xs px-2 rounded-full">{loveBooksCount}</span>
//                 )}
//               </button>

//               <button onClick={handleLogout} className="w-3/4 py-2 bg-red-500 text-white rounded">Logout</button>
//             </>
//           ) : (
//             <>
//               <button onClick={() => navigate("/login")} className="w-3/4 py-2 bg-[rgba(217,23,108,1)] text-white rounded">Log in</button>
//               <button onClick={() => navigate("/register")} className="w-3/4 py-2 border border-[rgba(217,23,108,1)] text-[rgba(217,23,108,1)] rounded">Sign Up</button>
//             </>
//           )}
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
import WOW from "wowjs";

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

  // WOW
  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

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

  return (
    <div
      className={`fixed top-0 left-0 w-full h-[92px] z-50 flex justify-between items-center px-10 transition-all duration-300
      ${scrolled ? "bg-white shadow-md" : "bg-transparent"}`}
    >

      {/* Logo + Links */}
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="h-10" />

        <NavLink to="/" className={({ isActive }) =>
          `text-2xl hidden md:inline-block px-2 ${isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"}`
        }>
          Home
        </NavLink>

        <NavLink to="/books" className={({ isActive }) =>
          `text-2xl hidden md:inline-block px-2 ${isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"}`
        }>
          Books
        </NavLink>

        <NavLink to="/about" className={({ isActive }) =>
          `text-2xl hidden md:inline-block px-2 ${isActive ? "text-orange-500" : scrolled ? "text-black" : "text-white"}`
        }>
          About Us
        </NavLink>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <>
            <div onClick={() => navigate("/profile")}
              className={`flex flex-col items-center text-sm cursor-pointer ${scrolled ? "text-black" : "text-white"}`}>
              <span>{user.username}</span>
              <span className="text-[rgba(200,200,200,0.8)] text-xs">{user.email}</span>
            </div>

            <img
              onClick={() => navigate("/profile")}
              src={user.avatar || "https://via.placeholder.com/40"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />

            <button onClick={() => navigate("/cart")} className="relative">
              <FaShoppingCart
                size={20}
                className={`transition ${totalItems > 0 ? "text-red-500" : scrolled ? "text-black" : "text-white"}`}
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
                className={`transition ${loveBooksCount > 0 ? "text-red-500" : scrolled ? "text-black" : "text-white"}`}
              />
              {loveBooksCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {loveBooksCount}
                </span>
              )}
            </button>

            <button onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}
              className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white">
              Log in
            </button>

            <button onClick={() => navigate("/register")}
              className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)]">
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen
            ? <AiOutlineClose size={25} className={scrolled ? "text-black" : "text-white"} />
            : <AiOutlineMenu size={25} className={scrolled ? "text-black" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[92px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-3 shadow-md md:hidden">
          <Link to="/" className="text-xl text-gray-800">Home</Link>
          <Link to="/books" className="text-xl text-gray-800">Books</Link>
          <Link to="/about" className="text-xl text-gray-800">About Us</Link>
        </div>
      )}
    </div>
  );
}