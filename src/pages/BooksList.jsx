
// import { useOutletContext } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useCartStore } from "../store/CartStore";

// export default function BookList() {
//   const { currentBooks, currentPage, totalPages, setCurrentPage } =
//     useOutletContext();

//   const navigate = useNavigate();
//   const addToCart = useCartStore((state) => state.addToCart);

//   const goToBook = (book) => {
//     navigate(`/books/${book.id}`, { state: book });
//   };

//   // 🛒 Add To Cart
//   const handleAddToCart = (book, e) => {
//     e.stopPropagation(); // يمنع فتح صفحة الكتاب

//     const success = addToCart(book);

//     if (success) {
//       Swal.fire({
//         icon: "success",
//         title: "Added!",
//         text: "Book added to cart 🛒",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } else {
//       Swal.fire({
//         icon: "warning",
//         title: "Already Added",
//         text: "This book is already in your cart ⚠️",
//       });
//     }
//   };

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

//               <button
//                 onClick={(e) => e.stopPropagation()}
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

import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCartStore } from "../store/CartStore";
import { useAuthStore } from "../store/auth";

export default function BookList() {
  const { currentBooks, currentPage, totalPages, setCurrentPage } =
    useOutletContext();

  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const token = useAuthStore((state) => state.token);

  const goToBook = (book) => {
    navigate(`/books/${book.id}`, { state: book });
  };

  // 🛒 Add To Cart
  const handleAddToCart = async (book, e) => {
    e.stopPropagation();

    const success = await addToCart(book, token);

    if (success) {
      Swal.fire({
        icon: "success",
        title: "Added!",
        text: "Book added to cart 🛒",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Already Added",
        text: "This book is already in your cart ⚠️",
      });
    }
  };

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
              <h2 className="text-2xl font-semibold">{book.name}</h2>
              <span className="text-sm border px-3 py-1 rounded-full text-yellow-600 bg-yellow-50">
                25% Discount code: Ne12
              </span>
            </div>

            <p className="text-gray-500">{book.description}</p>

            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-lg">⭐⭐⭐⭐☆</div>
              <span className="text-gray-500 text-sm">(210 Review)</span>
            </div>

            <p className="text-gray-600">Rate: {book.rate}</p>

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

          <div className="flex flex-col items-end gap-4">
            <p className="text-2xl font-bold">{book.price}$</p>

            <div className="flex gap-3">
              {/* 🛒 Add To Cart */}
              <button
                onClick={(e) => handleAddToCart(book, e)}
                className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700"
              >
                Add To Cart 🛒
              </button>

              <button
                onClick={(e) => e.stopPropagation()}
                className="border border-pink-600 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50"
              >
                ❤
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center gap-3 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            className={`px-4 py-2 rounded-lg ${
              num === currentPage ? "bg-pink-600 text-white" : "bg-white border"
            }`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}