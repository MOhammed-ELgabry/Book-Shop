

// import { useOutletContext } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCartStore } from "../store/CartStore";
// import { useLoveBooksStore } from "../store/LoveBooks";
// import { useAuthStore } from "../store/auth";
// import BooksListSkeleton from "../component/skeletons/books/BooksListSkeleton";
// export default function BookList() {
//   const {
//   currentBooks,
//   currentPage,
//   totalPages,
//   setCurrentPage,
//   loading
// } = useOutletContext();

//   const navigate = useNavigate();
//   const addToCart = useCartStore((state) => state.addToCart);
//   const token = useAuthStore((state) => state.token);

//   // 🌟 LoveBooks Store
//   const addToLoveBooks = useLoveBooksStore((state) => state.addBook);

//   const goToBook = (book) => {
//     navigate(`/books/${book.id}`, { state: book });
//   };

//   // 🛒 Add To Cart
  

// //   const handleAddToCart = async (book, e) => {
// //   e.stopPropagation();

// //   if (!token) {
// //     Swal.fire({
// //       icon: "warning",
// //       title: "Login Required",
// //       text: "You need to login first!",
// //       confirmButtonText: "Go to Login",
// //     }).then(() => {
// //       navigate("/login");
// //     });
// //     return;
// //   }

// //   const success = await addToCart(book, token);

// //   if (success) {
// //     Swal.fire({
// //       icon: "success",
// //       title: "Added!",
// //       text: "Book added to cart 🛒",
// //       timer: 1500,
// //       showConfirmButton: false,
// //     });
// //   } else {
// //     Swal.fire({
// //       icon: "warning",
// //       title: "Already Added",
// //       text: "This book is already in your cart ⚠️",
// //     });
// //   }
// // };

// const handleAddToCart = async (book, e) => {
//   e.stopPropagation();

//   if (!token) {
//     Swal.fire({
//       icon: "warning",
//       title: "Login Required",
//       text: "You need to login first to add books to cart 🛒",
//       showCancelButton: true,
//       confirmButtonText: "Login",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate("/login");
//       }
//     });
//     return;
//   }

//   const success = await addToCart(book, token);

//   if (success) {
//     Swal.fire({
//       icon: "success",
//       title: "Added!",
//       text: "Book added to cart 🛒",
//       timer: 1500,
//       showConfirmButton: false,
//     });
//   } else {
//     Swal.fire({
//       icon: "warning",
//       title: "Already Added",
//       text: "This book is already in your cart ⚠️",
//     });
//   }
// };

//   // ❤️ Add To Love Books

// // const handleAddToLoveBooks = (book, e) => {
// //   e.stopPropagation();

// //   if (!token) {
// //     Swal.fire({
// //       icon: "warning",
// //       title: "Login Required",
// //       text: "You need to login first!",
// //       confirmButtonText: "Go to Login",
// //     }).then(() => {
// //       navigate("/login");
// //     });
// //     return;
// //   }

// //   const success = addToLoveBooks(book);

// //   if (success) {
// //     Swal.fire({
// //       icon: "success",
// //       title: "Book Added!",
// //       text: `"${book.name}" has been added to your favorites.`,
// //       timer: 1500,
// //       showConfirmButton: false,
// //     });
// //   } else {
// //     Swal.fire({
// //       icon: "warning",
// //       title: "Already Added",
// //       text: `"${book.name}" is already in your favorites.`,
// //       timer: 1500,
// //       showConfirmButton: false,
// //     });
// //   }
// // };

// const handleAddToLoveBooks = (book, e) => {
//   e.stopPropagation();

//   if (!token) {
//     Swal.fire({
//       icon: "warning",
//       title: "Login Required",
//       text: "Login to save your favorite books ❤️",
//       showCancelButton: true,
//       confirmButtonText: "Login",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#e11d48",
//       cancelButtonColor: "#6b7280",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate("/login");
//       }
//     });
//     return;
//   }

//   const success = addToLoveBooks(book);

//   if (success) {
//     Swal.fire({
//       icon: "success",
//       title: "Book Added!",
//       text: `"${book.name}" added to favorites ❤️`,
//       timer: 1500,
//       showConfirmButton: false,
//     });
//   } else {
//     Swal.fire({
//       icon: "warning",
//       title: "Already Added",
//       text: `"${book.name}" is already in your favorites.`,
//       timer: 1500,
//       showConfirmButton: false,
//     });
//   }
// };
// if (loading) return <BooksListSkeleton />;
//   return (
//     <div className="flex flex-col gap-6">
//       {currentBooks.map((book) => (
//         <div
//           onClick={() => goToBook(book)}
//           key={book.id}
//           className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-start cursor-pointer"
//         >
//           <img
//             src={book.img}
//             alt={book.name}
//             className="w-40 h-56 object-cover rounded-lg"
//           />

//           <div className="flex flex-col flex-1 gap-3">
//             <div className="flex justify-between items-start">
//               <h2 className="text-2xl font-semibold">{book.name}</h2>
//               <span className="text-sm border px-3 py-1 rounded-full text-yellow-600 bg-yellow-50">
//                 25% Discount code: Ne12
//               </span>
//             </div>

//             <p className="text-gray-500">{book.description}</p>

//             <div className="flex items-center gap-2">
//               <div className="text-yellow-400 text-lg">⭐⭐⭐⭐☆</div>
//               <span className="text-gray-500 text-sm">(210 Review)</span>
//             </div>

//             <p className="text-gray-600">Rate: {book.rate}</p>

//             <div className="flex gap-12 mt-2">
//               <div>
//                 <p className="text-gray-400 text-sm">Author</p>
//                 <p className="font-medium">{book.author}</p>
//               </div>

//               <div>
//                 <p className="text-gray-400 text-sm">Category</p>
//                 <p className="font-medium">{book.category}</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col items-end gap-4">
//             <p className="text-2xl font-bold">{book.price}$</p>

//             <div className="flex gap-3">
//               {/* 🛒 Add To Cart */}
//               <button
//                 onClick={(e) => handleAddToCart(book, e)}
//                 className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
//               >
//                 Add To Cart 🛒
//               </button>

//               {/* ❤️ Add To Love Books */}
//               <button
//                 onClick={(e) => handleAddToLoveBooks(book, e)}
//                 className="border border-pink-600 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50"
//               >
//                 ❤
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Pagination */}
//       <div className="flex justify-center gap-3 mt-6">
//         {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
//           <button
//             key={num}
//             className={`px-4 py-2 rounded-lg ${
//               num === currentPage ? "bg-pink-600 text-white" : "bg-white border"
//             }`}
//             onClick={() => setCurrentPage(num)}
//           >
//             {num}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// } 
//ما قبل التحديث 

// import { useOutletContext, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCartStore } from "../store/CartStore";
// import { useLoveBooksStore } from "../store/LoveBooks";
// import { useAuthStore } from "../store/auth";
// import BooksListSkeleton from "../component/skeletons/books/BooksListSkeleton";

// export default function BookList() {
//   const {
//     currentBooks,
//     currentPage,
//     totalPages,
//     setCurrentPage,
//     loading,
//   } = useOutletContext();

//   const navigate = useNavigate();

//   const cart = useCartStore((state) => state.cart);
//   const addToCart = useCartStore((state) => state.addToCart);

//   const token = useAuthStore((state) => state.token);
//   const user = useAuthStore((state) => state.user);

//   const addToLoveBooks = useLoveBooksStore((state) => state.addBook);

//   const goToBook = (book) => {
//     navigate(`/books/${book.id}`, { state: book });
//   };

//   // 🛒 ADD TO CART
//   const handleAddToCart = async (book, e) => {
//   e.stopPropagation();

//   if (!token) {
//     Swal.fire({
//       icon: "warning",
//       title: "Login Required",
//       text: "You need to login first to add books to cart 🛒",
//       showCancelButton: true,
//       confirmButtonText: "Login",
//       cancelButtonText: "Cancel",
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         navigate("/login");
//       }
//     });

//     return;
//   }

//   // 🔥 DEBUG
//   console.log("BOOK SENT TO CART:", book);

//   // 🔥 أهم خطوة
//   const cleanBook = {
//     id: book.id,
//     documentId: book.documentId,
//     name: book.name,
//     author: book.author,
//     price: book.price,
//     img: book.img,
//   };

//   const result = await addToCart(cleanBook, user);

//   if (result.success) {
//     Swal.fire({
//       icon: "success",
//       title: "Added!",
//       text: "Book added to cart 🛒",
//       timer: 1200,
//       showConfirmButton: false,
//     });
//   } else if (result.message === "ALREADY_IN_CART") {
//     Swal.fire({
//       icon: "info",
//       title: "Already Added",
//       text: "This book is already in your cart",
//     });
//   } else {
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "Something went wrong",
//     });
//   }
// };

//   // ❤️ LOVE BOOKS
//   const handleAddToLoveBooks = (book, e) => {
//     e.stopPropagation();

//     if (!token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//         text: "Login to save your favorite books ❤️",
//         showCancelButton: true,
//         confirmButtonText: "Login",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#e11d48",
//         cancelButtonColor: "#6b7280",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/login");
//         }
//       });

//       return;
//     }

//     const success = addToLoveBooks(book);

//     if (success) {
//       Swal.fire({
//         icon: "success",
//         title: "Book Added!",
//         text: `"${book.name}" added to favorites ❤️`,
//         timer: 1200,
//         showConfirmButton: false,
//       });
//     } else {
//       Swal.fire({
//         icon: "info",
//         title: "Already Added",
//       });
//     }
//   };

//   if (loading) return <BooksListSkeleton />;

//   return (
//     <div className="flex flex-col gap-6">
//       {currentBooks.map((book) => (
//         <div
//           onClick={() => goToBook(book)}
//           key={book.id}
//           className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-start cursor-pointer"
//         >
//           <img
//             src={book.img}
//             alt={book.name}
//             className="w-40 h-56 object-cover rounded-lg"
//           />

//           <div className="flex flex-col flex-1 gap-3">
//             <div className="flex justify-between items-start">
//               <h2 className="text-2xl font-semibold">{book.name}</h2>

//               <span className="text-sm border px-3 py-1 rounded-full text-yellow-600 bg-yellow-50">
//                 25% Discount code: Ne12
//               </span>
//             </div>

//             <p className="text-gray-500">{book.description}</p>

//             <div className="flex items-center gap-2">
//               <div className="text-yellow-400 text-lg">⭐⭐⭐⭐☆</div>

//               <span className="text-gray-500 text-sm">
//                 (210 Review)
//               </span>
//             </div>

//             <p className="text-gray-600">
//               Rate: {book.rate}
//             </p>

//             <div className="flex gap-12 mt-2">
//               <div>
//                 <p className="text-gray-400 text-sm">
//                   Author
//                 </p>

//                 <p className="font-medium">
//                   {book.author}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-gray-400 text-sm">
//                   Category
//                 </p>

//                 <p className="font-medium">
//                   {book.category}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col items-end gap-4">
//             <p className="text-2xl font-bold">
//               {book.price}$
//             </p>

//             <div className="flex gap-3">
//               {/* 🛒 Add To Cart */}
//               <button
//                 onClick={(e) => handleAddToCart(book, e)}
//                 className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
//               >
//                 Add To Cart 🛒
//               </button>

//               {/* ❤️ Add To Love Books */}
//               <button
//                 onClick={(e) =>
//                   handleAddToLoveBooks(book, e)
//                 }
//                 className="border border-pink-600 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50"
//               >
//                 ❤
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Pagination */}
//       <div className="flex justify-center gap-3 mt-6">
//         {Array.from(
//           { length: totalPages },
//           (_, i) => i + 1
//         ).map((num) => (
//           <button
//             key={num}
//             className={`px-4 py-2 rounded-lg ${
//               num === currentPage
//                 ? "bg-pink-600 text-white"
//                 : "bg-white border"
//             }`}
//             onClick={() => setCurrentPage(num)}
//           >
//             {num}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// deepseek



// import { useOutletContext, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCartStore } from "../store/CartStore";
// import { useLoveBooksStore } from "../store/LoveBooks";
// import { useAuthStore } from "../store/auth";
// import BooksListSkeleton from "../component/skeletons/books/BooksListSkeleton";

// export default function BookList() {

//   const {
//     currentBooks,
//     currentPage,
//     totalPages,
//     setCurrentPage,
//     loading,
//   } = useOutletContext();

//   const navigate = useNavigate();

//   const addToCart = useCartStore(
//     (state) => state.addToCart
//   );

//   const token = useAuthStore(
//     (state) => state.token
//   );

//   const addToLoveBooks = useLoveBooksStore(
//     (state) => state.addBook
//   );

//   const goToBook = (book) => {
//     navigate(`/books/${book.id}`, {
//       state: book,
//     });
//   };

//   // ======================
//   // ADD TO CART
//   // ======================
//   const handleAddToCart = async (book, e) => {

//     e.stopPropagation();

//     if (!token) {

//       Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//         text: "You need to login first to add books to cart 🛒",
//         showCancelButton: true,
//         confirmButtonText: "Login",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#d33",
//         cancelButtonColor: "#3085d6",
//       }).then((result) => {

//         if (result.isConfirmed) {
//           navigate("/login");
//         }
//       });

//       return;
//     }

//     const cleanBook = {
//       id: book.id,
//       documentId: book.documentId,
//       name: book.name,
//       author: book.author,
//       price: book.price,
//       img: book.img,
//     };

//     const result = await addToCart(cleanBook);

//     if (result.success) {

//       Swal.fire({
//         icon: "success",
//         title: "Added!",
//         text: "Book added to cart 🛒",
//         timer: 1200,
//         showConfirmButton: false,
//       });

//     } else if (
//       result.message === "ALREADY_IN_CART"
//     ) {

//       Swal.fire({
//         icon: "info",
//         title: "Already Added",
//         text: "This book is already in your cart",
//       });

//     } else {

//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Something went wrong",
//       });
//     }
//   };

//   // ======================
//   // FAVORITES
//   // ======================
//   const handleAddToLoveBooks = (book, e) => {

//     e.stopPropagation();

//     if (!token) {

//       Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//         text: "Login to save your favorite books ❤️",
//         showCancelButton: true,
//         confirmButtonText: "Login",
//         cancelButtonText: "Cancel",
//         confirmButtonColor: "#e11d48",
//         cancelButtonColor: "#6b7280",
//       }).then((result) => {

//         if (result.isConfirmed) {
//           navigate("/login");
//         }
//       });

//       return;
//     }

//     const success = addToLoveBooks(book);

//     if (success) {

//       Swal.fire({
//         icon: "success",
//         title: "Book Added!",
//         text: `"${book.name}" added to favorites ❤️`,
//         timer: 1200,
//         showConfirmButton: false,
//       });

//     } else {

//       Swal.fire({
//         icon: "info",
//         title: "Already Added",
//       });
//     }
//   };

//   if (loading) return <BooksListSkeleton />;

//   return (
//     <div className="flex flex-col gap-6">

//       {currentBooks.map((book) => (

//         <div
//           onClick={() => goToBook(book)}
//           key={book.id}
//           className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-start cursor-pointer"
//         >

//           <img
//             src={book.img}
//             alt={book.name}
//             className="w-40 h-56 object-cover rounded-lg"
//           />

//           <div className="flex flex-col flex-1 gap-3">

//             <div className="flex justify-between items-start">

//               <h2 className="text-2xl font-semibold">
//                 {book.name}
//               </h2>

//               <span className="text-sm border px-3 py-1 rounded-full text-yellow-600 bg-yellow-50">
//                 25% Discount code: Ne12
//               </span>

//             </div>

//             <p className="text-gray-500">
//               {book.description}
//             </p>

//             <div className="flex items-center gap-2">

//               <div className="text-yellow-400 text-lg">
//                 ⭐⭐⭐⭐☆
//               </div>

//               <span className="text-gray-500 text-sm">
//                 (210 Review)
//               </span>

//             </div>

//             <p className="text-gray-600">
//               Rate: {book.rate}
//             </p>

//             <div className="flex gap-12 mt-2">

//               <div>
//                 <p className="text-gray-400 text-sm">
//                   Author
//                 </p>

//                 <p className="font-medium">
//                   {book.author}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-gray-400 text-sm">
//                   Category
//                 </p>

//                 <p className="font-medium">
//                   {book.category}
//                 </p>
//               </div>

//             </div>
//           </div>

//           <div className="flex flex-col items-end gap-4">

//             <p className="text-2xl font-bold">
//               {book.price}$
//             </p>

//             <div className="flex gap-3">

//               <button
//                 onClick={(e) =>
//                   handleAddToCart(book, e)
//                 }
//                 className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
//               >
//                 Add To Cart 🛒
//               </button>

//               <button
//                 onClick={(e) =>
//                   handleAddToLoveBooks(book, e)
//                 }
//                 className="border border-pink-600 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50"
//               >
//                 ❤
//               </button>

//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="flex justify-center gap-3 mt-6">

//         {Array.from(
//           { length: totalPages },
//           (_, i) => i + 1
//         ).map((num) => (

//           <button
//             key={num}
//             className={`px-4 py-2 rounded-lg ${
//               num === currentPage
//                 ? "bg-pink-600 text-white"
//                 : "bg-white border"
//             }`}
//             onClick={() => setCurrentPage(num)}
//           >
//             {num}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useOutletContext, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCartStore } from "../store/CartStore";
// import { useLoveBooksStore } from "../store/LoveBooks";
// import { useAuthStore } from "../store/auth";
// import BooksListSkeleton from "../component/skeletons/books/BooksListSkeleton";

// export default function BookList() {
//   const {
//     currentBooks,
//     currentPage,
//     totalPages,
//     setCurrentPage,
//     loading,
//   } = useOutletContext();

//   const navigate = useNavigate();

//   const addToCart = useCartStore((s) => s.addToCart);
//   const addToLoveBooks = useLoveBooksStore((s) => s.addBook);
//   const token = useAuthStore((s) => s.token);
//   const user = useAuthStore((s) => s.user);

//   const goToBook = (book) =>
//     navigate(`/books/${book.id}`, { state: book });

//   const handleAddToCart = async (book, e) => {
//     e.stopPropagation();

//     if (!token) {
//       Swal.fire({
//         icon: "warning",
//         title: "Login Required",
//       });
//       return;
//     }

//     const cleanBook = {
//       id: book.id,
//       name: book.name,
//       author: book.author,
//       price: book.price,
//       img: book.img,
//     };

//     const res = await addToCart(cleanBook, user);

//     if (res.success) {
//       Swal.fire({ icon: "success", title: "Added" });
//     } else if (res.message === "ALREADY_IN_CART") {
//       Swal.fire({ icon: "info", title: "Already in cart" });
//     } else {
//       Swal.fire({ icon: "error", title: "Error" });
//     }
//   };

//   if (loading) return <BooksListSkeleton />;

//   return (
//     <div className="flex flex-col gap-6">
//       {currentBooks.map((book) => (
//         <div
//           key={book.id}
//           onClick={() => goToBook(book)}
//           className="bg-white p-6 rounded-xl flex"
//         >
//           <img src={book.img} className="w-40 h-56 rounded" />

//           <div className="flex-1 ml-4">
//             <h2>{book.name}</h2>
//             <p>{book.author}</p>
//             <p>{book.price}$</p>
//           </div>

//           <button
//             onClick={(e) => handleAddToCart(book, e)}
//             className="bg-pink-600 text-white px-4 py-2 rounded"
//           >
//             Add To Cart
//           </button>
//         </div>
//       ))}

//       <div className="flex gap-2 justify-center mt-6">
//         {Array.from({ length: totalPages }).map((_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className="px-3 py-2 border"
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// اخر اصدار 
import { useOutletContext, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCartStore } from "../store/CartStore";
import { useLoveBooksStore } from "../store/LoveBooks";
import { useAuthStore } from "../store/auth";
import BooksListSkeleton from "../component/skeletons/books/BooksListSkeleton";

export default function BookList() {
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
  // ADD TO CART (FIXED)
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
        if (result.isConfirmed) {
          navigate("/login");
        }
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
  // FAVORITES (FIXED)
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
        confirmButtonColor: "#e11d48",
        cancelButtonColor: "#6b7280",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
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

  // ======================
  // LOADING GUARD
  // ======================
  if (loading) return <BooksListSkeleton />;

  return (
    <div className="flex flex-col gap-6">
      {currentBooks.map((book) => (
        <div
          onClick={() => goToBook(book)}
          key={book.id}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 items-center lg:items-start cursor-pointer"
        >
          <img
            src={book.img}
            alt={book.name}
            className="w-40 h-56 object-cover rounded-lg"
          />

          <div className="flex flex-col flex-1 gap-3">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold">
                {book.name}
              </h2>

              <span className="text-sm border px-3 py-1 rounded-full text-yellow-600 bg-yellow-50">
                25% Discount code: Ne12
              </span>
            </div>

            <p className="text-gray-500">
              {book.description}
            </p>

            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-lg">
                ⭐⭐⭐⭐☆
              </div>

              <span className="text-gray-500 text-sm">
                (210 Review)
              </span>
            </div>

            <p className="text-gray-600">
              Rate: {book.rate}
            </p>

            <div className="flex gap-12 mt-2">
              <div>
                <p className="text-gray-400 text-sm">
                  Author
                </p>
                <p className="font-medium">
                  {book.author}
                </p>
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Category
                </p>
                <p className="font-medium">
                  {book.category}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <p className="text-2xl font-bold">
              {book.price}$
            </p>

            <div className="flex gap-3">
              <button
                onClick={(e) =>
                  handleAddToCart(book, e)
                }
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
              >
                Add To Cart 🛒
              </button>

              <button
                onClick={(e) =>
                  handleAddToLoveBooks(book, e)
                }
                className="border border-pink-600 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50"
              >
                ❤
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* ======================
          PAGINATION (SAFE)
      ====================== */}
      <div className="flex justify-center gap-3 mt-6">
        {Array.from(
          { length: totalPages || 1 },
          (_, i) => i + 1
        ).map((num) => (
          <button
            key={num}
            className={`px-4 py-2 rounded-lg ${
              num === currentPage
                ? "bg-pink-600 text-white"
                : "bg-white border"
            }`}
            onClick={() => {
              if (num === currentPage) return;
              setCurrentPage(num);
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}