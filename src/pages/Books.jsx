
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
import { Search, Filter, X } from "lucide-react";
import BooksPageSkeleton from "../component/skeletons/books/BooksPageSkeleton";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import Swal from "sweetalert2";
import "animate.css";

import api from "../api/api";
import { useAuthStore } from "../store/auth";
import { getStrapiMedia } from "../utils/getStrapiMedia";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(true);

  const booksPerPage = 12;

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    async function fetchBooks() {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/books?populate=*`
        );
        const data = await res.json();

        const formatted = data.data.map((item) => ({
          id: item.id,
          name: item.name,
          author: item.auther,
          rate: item.rate,
          price: item.price,
          category: item.category?.name || "Unknown",
          img: getStrapiMedia(item.img?.url),
        }));

        setBooks(formatted);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((b) => {
    const search = searchTerm.toLowerCase();

    const matchSearch =
      b.name.toLowerCase().includes(search) ||
      b.author.toLowerCase().includes(search) ||
      b.category.toLowerCase().includes(search);

    const matchCategory =
      selectedCategory.length > 0
        ? selectedCategory.includes(b.category)
        : true;

    return matchSearch && matchCategory;
  });

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleAddToCart = async (book) => {
    if (!user) {
      Swal.fire("Login required", "", "warning");
      return;
    }

    try {
      const cartRes = await api.get(
        `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
      );

      const cart = cartRes.data.data[0];

      const exists = cart?.items?.some((i) => i.id === book.id);

      if (exists) {
        Swal.fire({
          icon: "info",
          title: "Already in cart",
        });
        return;
      }

      const newItems = [...(cart?.items || []), { ...book, quantity: 1 }];

      await api.put(`/carts/${cart.id}`, {
        data: {
          items: newItems,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Added to cart",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const categories = [
    "Business",
    "Romance",
    "Politics",
    "Science",
    "History",
    "Technology",
    "Psychology",
    "Fiction",
    "Self-Help",
    "Travel",
    "Art & Culture",
  ];

  return loading ? (
    <BooksPageSkeleton />
  ) : (
    <div className="w-full min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <NavBar />

      {/* Hero Header */}
      <div
        className="w-full h-[300px] md:h-[400px] bg-cover bg-center relative flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/70 backdrop-blur-[2px]" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate__animated animate__fadeIn">
          <h1 className="text-white text-4xl md:text-7xl font-black tracking-tight mb-4 drop-shadow-2xl">
            Discover Your Next <span className="text-orange-500">Story</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8 drop-shadow-md">
            Explore our curated collection of books across dozens of categories. Find the knowledge you seek.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 -mt-16 relative z-20 flex flex-col gap-8 pb-20">
        
        {/* Search & Filters Section */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 p-4 md:p-6 border border-slate-100 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative w-full flex-1 group">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 pl-14 pr-6 bg-slate-50 border-2 border-transparent rounded-2xl outline-none transition-all duration-300 focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-medium"
                placeholder="Search by title, author, or category..."
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={22} />
            </div>

            {/* Filter Toggle Button (Mobile) */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden h-14 px-6 rounded-2xl flex items-center gap-2 font-bold transition-all ${
                showFilters ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Category Chips */}
          <div className={`flex-wrap gap-2 md:flex ${showFilters ? 'flex' : 'hidden'}`}>
            <button
              onClick={() => setSelectedCategory([])}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 ${
                selectedCategory.length === 0
                  ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105"
                  : "bg-white border-slate-100 text-slate-600 hover:border-orange-200 hover:bg-orange-50"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory((prev) =>
                    prev.includes(cat)
                      ? prev.filter((c) => c !== cat)
                      : [...prev, cat]
                  );
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 border-2 flex items-center gap-2 ${
                  selectedCategory.includes(cat)
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105"
                    : "bg-white border-slate-100 text-slate-600 hover:border-orange-200 hover:bg-orange-50"
                }`}
              >
                {cat}
                {selectedCategory.includes(cat) && <X size={14} />}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid Outlet */}
        <main className="w-full">
          <Outlet
            context={{
              currentBooks,
              totalPages,
              currentPage,
              setCurrentPage,
              loading,
            }}
          />
        </main>
      </div>
    </div>
  );
}