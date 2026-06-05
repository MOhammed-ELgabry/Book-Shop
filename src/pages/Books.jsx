
// import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import NavBar from "../component/NavBar";
// import { Search, Mic } from "lucide-react";
// import BooksPageSkeleton from "../component/skeletons/books/BooksPageSkeleton";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import Swal from "sweetalert2";
// import "animate.css";

// import api from "../api/api";
// import { useAuthStore } from "../store/auth";

// export default function Books() {
//   const [books, setBooks] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [loading, setLoading] = useState(true);

//   const booksPerPage = 12;

//   const user = useAuthStore((state) => state.user);

//   // ======================
//   // FETCH BOOKS
//   // ======================
//   useEffect(() => {
//     async function fetchBooks() {
//       try {
//         setLoading(true);

//         const res = await fetch(
//           `${import.meta.env.VITE_API_URL}/api/books?populate=*`
//         );
//         const data = await res.json();

//         const formatted = data.data.map((item) => ({
//           id: item.id,
//           name: item.name,
//           author: item.auther,
//           rate: item.rate,
//           price: item.price,
//           category: item.category?.name || "Unknown",
//           img: item.img?.url
//   ? `${import.meta.env.VITE_API_URL}${item.img.url}`
//   : "",
//         }));

//         setBooks(formatted);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBooks();
//   }, []);

//   // ======================
//   // FILTER
//   // ======================
//   const filteredBooks = books.filter((b) => {
//     const search = searchTerm.toLowerCase();

//     const matchSearch =
//       b.name.toLowerCase().includes(search) ||
//       b.author.toLowerCase().includes(search) ||
//       b.category.toLowerCase().includes(search);

//     const matchCategory = selectedCategory
//       ? b.category === selectedCategory
//       : true;

//     return matchSearch && matchCategory;
//   });

//   // ======================
//   // PAGINATION
//   // ======================
//   const indexOfLast = currentPage * booksPerPage;
//   const indexOfFirst = indexOfLast - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   // ======================
//   // ADD TO CART (BACKEND SAFE)
//   // ======================
//   const handleAddToCart = async (book) => {
//     if (!user) {
//       Swal.fire("Login required", "", "warning");
//       return;
//     }

//     try {
//       const cartRes = await api.get(
//         `/carts?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
//       );

//       const cart = cartRes.data.data[0];

//       const exists = cart?.items?.some((i) => i.id === book.id);

//       if (exists) {
//         Swal.fire({
//           icon: "info",
//           title: "Already in cart",
//         });
//         return;
//       }

//       const newItems = [...(cart?.items || []), { ...book, quantity: 1 }];

//       await api.put(`/carts/${cart.id}`, {
//         data: {
//           items: newItems,
//         },
//       });

//       Swal.fire({
//         icon: "success",
//         title: "Added to cart",
//         timer: 1200,
//         showConfirmButton: false,
//       });
//     } catch (err) {
//       console.log(err);
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   // ======================
//   // UI
//   // ======================
//   return loading ? (
//     <BooksPageSkeleton />
//   ) : (
//     <div className="w-full min-h-screen flex flex-col bg-gray-100">
//       <NavBar />

//       {/* HERO */}
//       <div
//         className="w-full h-[200px] md:h-[300px] bg-cover bg-center bg-fixed relative animate__animated animate__fadeIn"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//           <h2 className="text-white text-3xl md:text-5xl font-bold animate__animated animate__fadeInDown">
//             Explore Books
//           </h2>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row w-full flex-1">
//         {/* SIDEBAR */}
//         <aside className="w-full md:w-1/4 p-5 bg-gray-100 md:bg-gray-200">
//           <h2 className="text-xl font-semibold mb-4">
//             Filter by Category
//           </h2>

//           <div className="flex flex-col gap-2">
//             {[
//               "Business",
//               "Romance",
//               "Politics",
//               "Science",
//               "History",
//               "Technology",
//               "Psychology",
//               "Fiction",
//               "Self-Help",
//               "Travel",
//               "Art & Culture",
//             ].map((cat) => (
//               <label
//                 key={cat}
//                 className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
//                   selectedCategory === cat ? "bg-pink-200" : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={selectedCategory === cat}
//                   onChange={() =>
//                     setSelectedCategory(
//                       selectedCategory === cat ? "" : cat
//                     )
//                   }
//                 />
//                 {cat}
//               </label>
//             ))}
//           </div>
//         </aside>

//         {/* CONTENT */}
//         <main className="w-full md:w-3/4 p-5 flex flex-col gap-6">
//           {/* SEARCH */}
//           <div className="flex items-center bg-white rounded p-3">
//             <input
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full outline-none"
//               placeholder="Search books..."
//             />
//             <Search className="text-pink-500" />
//           </div>

//           {/* OUTLET */}
//           <Outlet
//             context={{
//               currentBooks,
//               totalPages,
//               currentPage,
//               setCurrentPage,
//               handleAddToCart,
//             }}
//           />
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";
import { Search, Mic } from "lucide-react";
import BooksPageSkeleton from "../component/skeletons/books/BooksPageSkeleton";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import Swal from "sweetalert2";
import "animate.css";

import api from "../api/api";
import { useAuthStore } from "../store/auth";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const booksPerPage = 12;

  const user = useAuthStore((state) => state.user);

  // ======================
  // FETCH BOOKS
  // ======================
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
          img: item.img?.url
            ? item.img.url.startsWith("http")
              ? item.img.url
              : `${import.meta.env.VITE_API_URL}${item.img.url}`
            : "",
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

    const matchCategory = selectedCategory
      ? b.category === selectedCategory
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

  return loading ? (
    <BooksPageSkeleton />
  ) : (
    <div className="w-full min-h-screen flex flex-col bg-gray-100">
      <NavBar />

      {/* HERO */}
      <div
        className="w-full h-[200px] md:h-[300px] bg-cover bg-center bg-fixed relative animate__animated animate__fadeIn"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h2 className="text-white text-3xl md:text-5xl font-bold animate__animated animate__fadeInDown">
            Explore Books
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full flex-1">

        {/* SIDEBAR */}
        <aside className="w-full md:w-1/4 p-5 bg-gray-100 md:bg-gray-200">
          <h2 className="text-xl font-semibold mb-4">
            Filter by Category
          </h2>

          <div className="flex flex-col gap-2">
            {[
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
            ].map((cat) => (
              <label
                key={cat}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                  selectedCategory === cat ? "bg-pink-200" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() =>
                    setSelectedCategory(
                      selectedCategory === cat ? "" : cat
                    )
                  }
                />
                {cat}
              </label>
            ))}
          </div>
        </aside>

        {/* CONTENT */}
        <main className="w-full md:w-3/4 p-5 flex flex-col gap-6">

          {/* SEARCH */}
          <div className="flex items-center bg-white rounded p-3">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none"
              placeholder="Search books..."
            />
            <Search className="text-pink-500" />
          </div>

          {/* OUTLET */}
          <Outlet
            context={{
              currentBooks,
              totalPages,
              currentPage,
              setCurrentPage,
              handleAddToCart,
            }}
          />

        </main>
      </div>
    </div>
  );
}