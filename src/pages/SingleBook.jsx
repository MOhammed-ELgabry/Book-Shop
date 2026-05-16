

import { useLocation } from "react-router-dom";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import { useCartStore } from "../store/CartStore";
import { useLoveBooksStore } from "../store/LoveBooks";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import SingleBookSkeleton from "../component/skeletons/SingleBookSkeleton";
import Swal from "sweetalert2";

export default function SingleBook() {
  const location = useLocation();
  const book = location.state;

  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cart);

  const addToLoveBooks = useLoveBooksStore((state) => state.addBook);

  const [quantity, setQuantity] = useState(1);
  const [isLoved, setIsLoved] = useState(false);

  if (!book) return <SingleBookSkeleton />;

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rate ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  // 🛒 Add To Cart
  const handleAddToCart = () => {
    const exists = cartItems?.find((item) => item.id === book.id);

    if (exists) {
      Swal.fire({
        icon: "warning",
        title: "Already in cart ⚠️",
        text: "This book is already in your cart",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    addToCart({ ...book, quantity: Number(quantity) });

    Swal.fire({
      icon: "success",
      title: "Added to cart 🎉",
      text: "Book added successfully",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // ❤️ Love Books
  const handleAddToLoveBooks = () => {
    addToLoveBooks(book);
    setIsLoved(true);

    Swal.fire({
      icon: "success",
      title: "Added to favorites ❤️",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <NavBar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Image */}
          <div className="relative">
            <img
              src={book.img}
              alt={book.name}
              className="w-full rounded-2xl shadow-lg"
            />

            <button
              onClick={handleAddToLoveBooks}
              className={`absolute top-4 right-4 text-2xl transition-transform ${
                isLoved ? "text-red-500 scale-125" : "text-gray-300 hover:scale-110"
              }`}
            >
              <FaHeart />
            </button>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">

            <h1 className="text-2xl font-bold">{book.name}</h1>

            <p className="text-gray-500">
              by <span className="font-semibold">{book.author}</span>
            </p>

            <p className="text-gray-600">{book.description}</p>

            <div className="flex items-center gap-2 text-lg">
              {renderStars(book.rate)}
              <span className="text-gray-500 ml-2">({book.rate})</span>
            </div>

            <div className="text-2xl font-bold text-pink-600">
              ${book.price}
            </div>

            <div>
              <p className="text-gray-400 text-sm">Category</p>
              <p className="font-medium">{book.category}</p>
            </div>

            {/* Cart */}
            <div className="flex items-center gap-4 mt-4">

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-16 border rounded-lg p-2 text-center"
              />

              <button
                onClick={handleAddToCart}
                className="bg-pink-600 text-white px-6 py-2 rounded-xl hover:bg-pink-700 transition"
              >
                Add To Cart
              </button>
            </div>

          </div>
        </div>

        {/* Details */}
        <div className="mt-10">
          <div className="flex gap-6 border-b pb-2">
            <button className="font-semibold border-b-2 border-pink-600">
              Product Details
            </button>
            <button className="text-gray-500">Customer Reviews</button>
            <button className="text-gray-500">Recommended</button>
          </div>

          <div className="mt-4 text-gray-600 space-y-2">
            <p><b>Book Title:</b> {book.name}</p>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Category:</b> {book.category}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}