
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import { useLoveBooksStore } from "../store/LoveBooks";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import { getStrapiMedia } from "../utils/getStrapiMedia";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, BookOpen, ChevronRight, Star } from "lucide-react";

export default function LoveBooks() {
  const { loveBooks, removeBook } = useLoveBooksStore();
  const { addToCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  const handleAddToCart = async (book) => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to add books to your cart.",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    const res = await addToCart(book, user);
    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Added to cart! 🎉",
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (res.message === "ALREADY_IN_CART") {
      Swal.fire({
        icon: "info",
        title: "Already in cart",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Failed to add book to cart.",
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      <NavBar />

      {/* Hero Section */}
      <div
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center relative flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-6 animate__animated animate__fadeIn">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest mb-6">
            <Heart size={14} fill="currentColor" />
            My Favorites
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white drop-shadow-2xl tracking-tight mb-4">
            Saved for <span className="text-orange-500">Later</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium max-w-xl mx-auto drop-shadow-md">
            All the stories and knowledge you've saved. Your personal literary collection.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 -mt-16 relative z-20 pb-24">
        {loveBooks.length === 0 ? (
          /* Empty State */
          <div className="bg-white p-12 md:p-24 text-center rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 animate__animated animate__zoomIn">
            <div className="w-32 h-32 bg-orange-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 transform hover:scale-110 hover:rotate-12 transition-all duration-500 cursor-default shadow-lg shadow-orange-500/10">
              <Heart size={64} className="text-orange-400" fill="none" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Your wishlist is empty</h3>
            <p className="text-slate-500 text-lg mb-12 max-w-md mx-auto leading-relaxed font-medium">
              You haven't saved any books yet. Explore our collection and find something that inspires you!
            </p>
            <Link 
              to="/books" 
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-orange-500/30 transition-all transform hover:scale-105 active:scale-95 group"
            >
              Browse Our Books
              <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {loveBooks.map((book) => (
              <div
                key={book.id}
                className="group bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-200/40 cursor-pointer"
                onClick={() => navigate(`/books/${book.id}`, { state: book })}
              >
                {/* Book Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                  <img
                    src={getStrapiMedia(book.img)}
                    alt={book.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <button className="w-full py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-all">
                      <BookOpen size={16} />
                      Quick View
                    </button>
                  </div>
                  
                  {/* Rating Badge */}
                  {book.rate && (
                    <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-xl flex items-center gap-1.5 shadow-lg text-sm font-black text-slate-800">
                      <Star size={14} className="text-orange-500 fill-orange-500" />
                      {book.rate}
                    </div>
                  )}
                </div>

                {/* Book Details */}
                <div className="p-6 flex-1 flex flex-col gap-4">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">
                      {book.category || "General"}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-orange-500 transition-colors mb-1">
                      {book.name}
                    </h2>
                    <p className="text-slate-400 text-sm font-bold">
                      by {book.author || "Unknown Author"}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6 pt-4 border-t border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Price</span>
                        <div className="text-2xl font-black text-slate-900">
                          ${book.price}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-5 gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(book);
                        }}
                        className="col-span-4 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-orange-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBook(book.id);
                        }}
                        className="col-span-1 bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-2xl transition-all active:scale-95 flex items-center justify-center group/trash"
                        title="Remove from favorites"
                      >
                        <Trash2 size={20} className="group-hover/trash:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

