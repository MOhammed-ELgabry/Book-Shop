
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import { useLoveBooksStore } from "../store/LoveBooks";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import { getStrapiMedia } from "../utils/getStrapiMedia";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function LoveBooks() {
  const { loveBooks, removeBook } = useLoveBooksStore();
  const { addToCart } = useCartStore();
  const user = useAuthStore((s) => s.user);

  const handleAddToCart = async (book) => {
    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please log in to add books to your cart.",
        confirmButtonColor: "#db2777",
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
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <NavBar />

      {/* Hero Section */}
      <div
        className="w-full h-72 bg-cover bg-center relative flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/40 to-indigo-900/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tight mb-3">
            My Wishlist
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium max-w-xl mx-auto opacity-90">
            All the books you've saved for later.
          </p>
        </div>
        {/* Decorative Blur */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {loveBooks.length === 0 ? (
          /* Empty State */
          <div className="bg-white p-20 text-center rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 animate-in fade-in zoom-in duration-500">
            <div className="text-8xl mb-8 transform hover:scale-110 transition-transform cursor-default">
              ❤️
            </div>
            <h3 className="text-3xl font-black text-gray-800 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Save books you love and they'll appear here. Let's find something special!
            </p>
            <Link 
              to="/books" 
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pink-200 transition-all transform active:scale-95"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {loveBooks.map((book) => (
              <div
                key={book.id}
                className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-200/60"
              >
                {/* Book Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={getStrapiMedia(book.img)}
                    alt={book.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Book Details */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-pink-600 transition-colors">
                      {book.name}
                    </h2>
                    <p className="text-gray-400 text-sm font-medium mt-1">
                      By {book.author || "Unknown Author"}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {book.category}
                      </div>
                      <div className="text-2xl font-black text-pink-600">
                        ${book.price}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleAddToCart(book)}
                        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-pink-100 transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span>🛒</span> Add to Cart
                      </button>
                      <button
                        onClick={() => removeBook(book.id)}
                        className="w-full bg-gray-50 text-gray-500 hover:bg-rose-50 hover:text-rose-600 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span>🗑️</span> Remove
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
