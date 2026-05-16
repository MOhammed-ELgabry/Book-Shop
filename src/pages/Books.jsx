
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
import { Search, Mic } from "lucide-react";
import BooksPageSkeleton from "../component/skeletons/books/BooksPageSkeleton";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

import "animate.css";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const booksPerPage = 12;
  const [selectedCategory, setSelectedCategory] = useState("");

const [loading, setLoading] = useState(true);


  

useEffect(() => {
  async function fetchBooks() {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:1337/api/books?populate=*");
      const data = await res.json();

      const formattedBooks = data.data.map((item) => ({
        id: item.id,
        name: item.name || "No title",
        author: item.auther || "Unknown author",
        rate: item.rate || 0,
        price: item.price || 0,
        category: item.category?.name || "Unknown",
        img: item.img?.url
          ? `http://localhost:1337${item.img.url}`
          : "https://via.placeholder.com/120x180",
      }));

      setBooks(formattedBooks);

    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false); // ✅ الصح
    }
  }

  fetchBooks();
}, []);

const filteredBooks = books.filter((b) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      b.name.toLowerCase().includes(search) ||
      b.author.toLowerCase().includes(search) ||
      b.category.toLowerCase().includes(search);

    const matchesCategory = selectedCategory
      ? b.category === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return loading?(
    <BooksPageSkeleton/>)
    :(
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <NavBar />

      {/* 🔥 HERO */}
      <div
        className="w-full h-[200px] md:h-[300px] bg-cover bg-center bg-fixed relative animate__animated animate__fadeIn"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-5xl font-bold  animate__animated animate__fadeInDown">
            Explore Books
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full flex-1">

        {/* 🔥 SIDEBAR */}
        <aside className="w-full md:w-1/4 p-5 bg-gray-100 md:bg-gray-200  animate__animated animate__fadeInLeft">
          <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>

          <div className="flex flex-col gap-2">
            {[
              "Business","Romance","Politics","Science","History",
              "Technology","Psychology","Fiction","Self-Help",
              "Travel","Art & Culture"
            ].map((cat, index) => (
              <label
                key={cat}
                className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-all duration-300 
                hover:bg-pink-100 hover:scale-[1.02] 
                ${selectedCategory === cat ? "bg-pink-200 font-semibold" : ""}
                 animate__animated animate__fadeInUp`}
                data-delay={`${0.1 * index}s`}
              >
                <input
                  type="checkbox"
                  className="accent-pink-500"
                  checked={selectedCategory === cat}
                  onChange={() =>
                    setSelectedCategory(selectedCategory === cat ? "" : cat)
                  }
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* 🔥 CONTENT */}
        <main className="w-full md:w-3/4 p-5 flex flex-col gap-6  animate__animated animate__fadeInRight">

          {/* 🔍 SEARCH */}
          <div className="flex items-center bg-white rounded-full px-4 py-3 shadow-md transition-all duration-300 
          focus-within:shadow-pink-200/50 focus-within:scale-[1.01]">
            
            <input
              type="text"
              placeholder="Search by name, author, or category"
              className="w-full outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Mic size={18} className="text-gray-400 mr-2 hover:scale-110 transition" />
            <Search size={18} className="text-pink-500 hover:scale-110 transition" />
          </div>

          {/* 📚 BOOKS */}
          <Outlet
            context={{
              currentBooks,
              totalPages,
              currentPage,
              setCurrentPage,
              loading 
            }}
          />
        </main>
      </div>
    </div>
  );
  
 
}