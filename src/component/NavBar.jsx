


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaShoppingCart, FaHeart } from "react-icons/fa";

import logo from "../assets/images/book-bookmark 1.png";
import { useAuthStore } from "../store/auth";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); 
  

  return (
    <div className="fixed top-0 left-0 w-full h-[92px] bg-[rgba(255,255,255,0.5)] z-50 flex justify-between items-center px-10">
     
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" className="h-10" />
        <Link to="/" className="text-2xl text-white font-semibold hidden md:inline-block border-r-2 px-2">
          Book Shop
        </Link>
        <Link to="/" className="text-2xl text-white hidden md:inline-block px-2">Home</Link>
        <Link to="/books" className="text-2xl text-white hidden md:inline-block px-2">Books</Link>
        <Link to="/about" className="text-2xl text-white hidden md:inline-block px-2">About Us</Link>
      </div>

    
      <div className="hidden md:flex gap-4 items-center">
        {user ? (
          <>
            <div className="flex flex-col items-center text-white text-sm">
              <span>{user.username}</span>
              <span className="text-[rgba(200,200,200,0.8)] text-xs">{user.email}</span>
            </div>
            <img src={user.avatar || "https://via.placeholder.com/40"} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
            <button className="text-white">
              <FaShoppingCart size={20} />
            </button>
            <button className="text-white">
              <FaHeart size={20} />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")} className="bg-[rgba(217,23,108,1)] px-4 py-2 rounded text-white">
              Log in
            </button>
            <button onClick={() => navigate("/register")} className="bg-white px-4 py-2 rounded text-[rgba(217,23,108,1)]">
              Sign Up
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <AiOutlineClose size={25} className="text-white" /> : <AiOutlineMenu size={25} className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[92px] left-0 w-full bg-white flex flex-col items-center py-4 space-y-3 shadow-md md:hidden">
          <Link to="/" className="text-2xl text-[rgba(217,23,108,1)]">Book Shop</Link>
          <Link to="/" className="text-xl text-gray-800">Home</Link>
          <Link to="/books" className="text-xl text-gray-800">Books</Link>
          <Link to="/about" className="text-xl text-gray-800">About Us</Link>

          {user ? (
            <>
              <div className="flex flex-col items-center">
                <span className="font-semibold">{user.username}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
              <img src={user.avatar || "https://via.placeholder.com/40"} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              <button className="w-3/4 py-2 flex items-center justify-center gap-2 bg-[rgba(217,23,108,1)] text-white rounded">
                <FaShoppingCart size={20} /> Cart
              </button>
              <button className="w-3/4 py-2 flex items-center justify-center gap-2 border border-[rgba(217,23,108,1)] text-[rgba(217,23,108,1)] rounded">
                <FaHeart size={20} /> Favorites
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} className="w-3/4 py-2 bg-[rgba(217,23,108,1)] text-white rounded">Log in</button>
              <button onClick={() => navigate("/register")} className="w-3/4 py-2 border border-[rgba(217,23,108,1)] text-[rgba(217,23,108,1)] rounded">Sign Up</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
