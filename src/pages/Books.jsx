
// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import NavBar from "../component/NavBar";
// import { Search, Mic } from "lucide-react";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

// export default function Books() {
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 12;
//   const [selectedCategory, setSelectedCategory] = useState("");



// useEffect(() => {
//   async function fetchBooks() {
//     try {
//       const res = await fetch("http://localhost:1337/api/books?populate=*");
//       const data = await res.json();

//       const formattedBooks = data.data.map((item) => ({
//         id: item.id,
//         name: item.name || "No title",
//         author: item.auther || "Unknown author",
//         rate: item.rate || 0,
//         price: item.price || 0,
//         category: item.category?.name || "Unknown",
//         img: item.img?.url
//           ? `http://localhost:1337${item.img.url}`
//           : "https://via.placeholder.com/120x180",
//       }));

//       setBooks(formattedBooks);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   }

//   fetchBooks();
// }, []);
//   // فلترة
//   const filteredBooks = selectedCategory
//     ? books.filter((b) => b.category === selectedCategory)
//     : books;

//   // Pagination
//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   return (
//     <div className="w-full min-h-screen flex flex-col bg-gray-200">
//       <NavBar />
//       <div
//         className="w-full h-[180px] sm:h-[220px] md:h-[300px] bg-cover bg-center"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       ></div>

//       <div className="flex flex-col md:flex-row w-full flex-1">
//         {/* Sidebar */}
//         <aside className="w-full md:w-1/4 p-4 md:p-6 bg-gray-100 md:bg-gray-200">
//           <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
//           <div className="flex flex-col gap-2">
//             {[
//               "Business","Romance","Politics","Science","History",
//               "Technology","Psychology","Fiction","Self-Help",
//               "Travel","Art & Culture"
//             ].map((cat) => (
//               <label key={cat} className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="accent-pink-500"
//                   checked={selectedCategory === cat}
//                   onChange={() =>
//                     setSelectedCategory(selectedCategory === cat ? "" : cat)
//                   }
//                 />
//                 <span>{cat}</span>
//               </label>
//             ))}
//           </div>
//         </aside>

//         {/* Content Area */}
//         <main className="w-full md:w-3/4 p-4 md:p-6 flex flex-col gap-6">
//           <div className="flex items-center bg-white rounded-full px-4 py-2 w-full shadow-sm mb-4">
//             <input type="text" placeholder="Search" className="w-full outline-none" />
//             <Mic size={18} className="text-gray-400 mr-2" />
//             <Search size={18} className="text-pink-500" />
//           </div>

//           {/* نمرر البيانات للـ Outlet */}
//           {/* <Outlet
//             context={{
//               currentBooks,
//               totalPages,
//               currentPage,
//               setCurrentPage,
//               filteredBooks,
//             }}
//           /> */}
//           <Outlet
//   context={{
//     currentBooks,
//   }}
// />
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
import { Search, Mic } from "lucide-react";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // search state
  const booksPerPage = 12;
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
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
      }
    }

    fetchBooks();
  }, []);

  // فلترة حسب Category + Search
  const filteredBooks = books.filter((b) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      b.name.toLowerCase().includes(search) ||
      b.author.toLowerCase().includes(search) ||
      b.category.toLowerCase().includes(search);

    const matchesCategory = selectedCategory ? b.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLast = currentPage * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-200">
      <NavBar />
      <div
        className="w-full h-[180px] sm:h-[220px] md:h-[300px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="flex flex-col md:flex-row w-full flex-1">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 p-4 md:p-6 bg-gray-100 md:bg-gray-200">
          <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
          <div className="flex flex-col gap-2">
            {[
              "Business","Romance","Politics","Science","History",
              "Technology","Psychology","Fiction","Self-Help",
              "Travel","Art & Culture"
            ].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
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

        {/* Content Area */}
        <main className="w-full md:w-3/4 p-4 md:p-6 flex flex-col gap-6">
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-full shadow-sm mb-4">
            <input 
              type="text" 
              placeholder="Search by name, author, or category" 
              className="w-full outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Mic size={18} className="text-gray-400 mr-2" />
            <Search size={18} className="text-pink-500" />
          </div>

          <Outlet
            context={{
              currentBooks,
              totalPages,
              currentPage,
              setCurrentPage
            }}
          />
        </main>
      </div>
    </div>
  );
}