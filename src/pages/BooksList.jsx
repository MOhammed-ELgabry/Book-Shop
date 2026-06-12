
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCartStore } from "../store/CartStore";
import { useLoveBooksStore } from "../store/LoveBooks";
import { useAuthStore } from "../store/auth";
import BooksListSkeleton from "../component/skeletons/books/BooksListSkeleton";
import { getStrapiMedia } from "../utils/getStrapiMedia";
import { useState } from "react";
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
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
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

  return (
    <div className="flex flex-col gap-6">
      {currentBooks.map((book) => (
        <div
          key={book.id}
          onClick={() => goToBook(book)}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-start cursor-pointer"
        >
          {/* IMAGE FIXED */}
          <img
            src={getStrapiMedia(book.img)}
            alt={book.name}
            className="w-40 h-56 object-cover rounded-lg"
          />

          {/* INFO */}
          <div className="flex flex-col flex-1 gap-3">
            <h2 className="text-2xl font-semibold">
              {book.name}
            </h2>

            <p className="text-gray-500">
              {book.description}
            </p>

            <p className="text-gray-600">
              Rate: {book.rate}
            </p>

            <div className="flex gap-12 mt-2">
              <div>
                <p className="text-gray-400 text-sm">Author</p>
                <p className="font-medium">{book.author}</p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Category</p>
                <p className="font-medium">{book.category}</p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col items-end gap-4">
            <p className="text-2xl font-bold">
              {book.price}$
            </p>

            <div className="flex gap-3">
           <button
  onClick={(e) => handleAddToCart(book, e)}
  disabled={loadingId === book.id}
  className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-60"
>
  {loadingId === book.id ? "Adding..." : "Add To Cart 🛒"}
</button>

              <button
                onClick={(e) => handleAddToLoveBooks(book, e)}
                className="border border-pink-600 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50"
              >
                ❤
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* PAGINATION */}
      <div className="flex justify-center gap-3 mt-6">
        {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map(
          (num) => (
            <button
              key={num}
              className={`px-4 py-2 rounded-lg ${
                num === currentPage
                  ? "bg-pink-600 text-white"
                  : "bg-white border"
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
    </div>
  );
}