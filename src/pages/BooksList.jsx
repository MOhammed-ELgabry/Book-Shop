
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCartStore } from "../store/CartStore";
import { useLoveBooksStore } from "../store/LoveBooks";
import { useAuthStore } from "../store/auth";
import BooksListSkeleton from "../component/skeletons/books/BooksListSkeleton";
import { getStrapiMedia } from "../utils/getStrapiMedia";
import { useState } from "react";
import { ShoppingCart, Heart, Star, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

export default function BookList() {
  const [loadingId, setLoadingId] = useState(null);
  
  const {
    currentBooks = [],
    currentPage,
    totalPages = 1,
    setCurrentPage,
    loading,
  } = useOutletContext();

  const navigate = useNavigate();

  const addToCart = useCartStore((state) => state.addToCart);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  const addToLoveBooks = useLoveBooksStore((state) => state.addBook);

  // ======================
  // NAVIGATE
  // ======================
  const goToBook = (book) => {
    navigate(`/books/${book.id}`, {
      state: book,
    });
  };

  // ======================
  // ADD TO CART
  // ======================
  const handleAddToCart = async (book, e) => {
    e?.stopPropagation();

    if (!token || !user?.id) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to login first to add books to cart 🛒",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#f97316",
        cancelButtonColor: "#94a3b8",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });

      return;
    }

    const cleanBook = {
      id: book.id,
      documentId: book.documentId,
      name: book.name,
      author: book.author,
      price: book.price,
      img: book.img,
    };

    try {
      setLoadingId(book.id);
      const result = await addToCart(cleanBook, user);

      if (result?.success) {
        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Book added to cart 🛒",
          timer: 1200,
          showConfirmButton: false,
        });
      } else if (result?.message === "ALREADY_IN_CART") {
        Swal.fire({
          icon: "info",
          title: "Already Added",
          text: "This book is already in your cart",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong",
      });
    } finally {
      setLoadingId(null);
    }
  };

  // ======================
  // FAVORITES
  // ======================
  const handleAddToLoveBooks = (book, e) => {
    e?.stopPropagation();

    if (!token || !user?.id) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Login to save your favorite books ❤️",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#f97316",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });

      return;
    }

    const success = addToLoveBooks(book);

    if (success) {
      Swal.fire({
        icon: "success",
        title: "Book Added!",
        text: `"${book.name}" added to favorites ❤️`,
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "info",
        title: "Already Added",
      });
    }
  };

  if (loading) return <BooksListSkeleton />;

  if (currentBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-[3rem] border border-slate-100 shadow-sm">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <BookOpen size={48} className="text-orange-400" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-3">No Books Found</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          We couldn't find any books matching your current search or filters. Try adjusting your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {currentBooks.map((book) => (
          <div
            key={book.id}
            onClick={() => goToBook(book)}
            className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-orange-200/40 hover:-translate-y-2 flex flex-col h-full cursor-pointer overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
              <img
                src={getStrapiMedia(book.img)}
                alt={book.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                 <button className="w-full py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white hover:text-slate-900 transition-all">
                   <BookOpen size={16} />
                   Quick View
                 </button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={(e) => handleAddToLoveBooks(book, e)}
                className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-110 transition-all shadow-lg active:scale-95 z-10"
              >
                <Heart size={20} fill={false ? "currentColor" : "none"} />
              </button>

              {/* Rating Badge */}
              {book.rate && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-xl flex items-center gap-1.5 shadow-lg text-sm font-black text-slate-800">
                  <Star size={14} className="text-orange-500 fill-orange-500" />
                  {book.rate}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3">
                  {book.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-tight mb-1 group-hover:text-orange-500 transition-colors">
                  {book.name}
                </h3>
                <p className="text-slate-500 font-medium text-sm">
                  by {book.author}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Price</span>
                  <span className="text-2xl font-black text-slate-900">${book.price}</span>
                </div>

                <button
                  onClick={(e) => handleAddToCart(book, e)}
                  disabled={loadingId === book.id}
                  className="w-12 h-12 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 text-white rounded-xl flex items-center justify-center transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                >
                  {loadingId === book.id ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ShoppingCart size={22} />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-10 border-t border-slate-100">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all active:scale-90 shadow-sm"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2 px-4">
            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
              (num) => (
                <button
                  key={num}
                  className={`w-12 h-12 rounded-2xl font-black text-sm transition-all duration-300 active:scale-90 shadow-sm border ${
                    num === currentPage
                      ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110"
                      : "bg-white border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500"
                  }`}
                  onClick={() => {
                    if (num !== currentPage) setCurrentPage(num);
                  }}
                >
                  {num}
                </button>
              )
            )}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 hover:border-orange-500 hover:text-orange-500 disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all active:scale-90 shadow-sm"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}