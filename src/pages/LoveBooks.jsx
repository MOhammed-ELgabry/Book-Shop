// import Footer from "../component/Footer";
// import NavBar from "../component/NavBar";
// import { useLoveBooksStore } from "../store/LoveBooks";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

// export default function LoveBooks() {
//   const { loveBooks, removeBook } = useLoveBooksStore();

//   return (

//     <div className="flex flex-col gap-6 p-4">
//            <NavBar/>
//                <div
//                    className="w-full h-48 bg-cover bg-center"
//                    style={{ backgroundImage: `url(${bgImage})` }}
//                ></div>
//       <h1 className="text-2xl font-bold">Books I Love ❤️</h1>

//       {loveBooks.length === 0 ? (
//         <p className="text-gray-500">No books added yet.</p>
//       ) : (
//         loveBooks.map((book) => (
//           <div
//             key={book.id}
//             className="flex flex-col md:flex-row gap-4 items-center p-4 border rounded shadow-sm"
//           >
//             {/* صورة الكتاب */}
//             <img
//               src={book.img}
//               alt={book.name}
//               className="w-32 h-44 object-cover rounded-lg"
//             />

//             {/* بيانات الكتاب */}
//             <div className="flex-1 flex flex-col gap-1">
//               <h2 className="text-lg font-semibold">{book.name}</h2>
//               <p className="text-gray-500 text-sm">Author: {book.author}</p>
//               <p className="text-gray-500 text-sm">Category: {book.category}</p>
//               <p className="text-gray-700 font-bold">{book.price}$</p>
//             </div>

//             {/* زرار إزالة */}
//             <button
//               onClick={() => removeBook(book.id)}
//               className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-50"
//             >
//               Remove
//             </button>
           
//           </div>
//         ))
//       )}
//        <Footer/>
//     </div>
//   );
// }

import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import { useLoveBooksStore } from "../store/LoveBooks";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import { getStrapiMedia } from "../utils/getStrapiMedia";

export default function LoveBooks() {
  const { loveBooks, removeBook } = useLoveBooksStore();

  return (
    <div className="flex flex-col gap-6 p-4">
      <NavBar />

      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <h1 className="text-2xl font-bold">
        Books I Love ❤️
      </h1>

      {loveBooks.length === 0 ? (
        <p className="text-gray-500">
          No books added yet.
        </p>
      ) : (
        loveBooks.map((book) => (
          <div
            key={book.id}
            className="flex w-full min-w-0 flex-col md:flex-row gap-4 items-center p-4 border rounded-2xl shadow-sm"
          >
            {/* صورة الكتاب */}
            <img
              src={getStrapiMedia(book.img)}
              alt={book.name}
              className="w-32 h-44 shrink-0 object-cover rounded-lg"
            />

            {/* بيانات الكتاب */}
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <h2 className="text-lg font-semibold">
                {book.name}
              </h2>

              <p className="text-gray-500 text-sm">
                Author: {book.author}
              </p>

              <p className="text-gray-500 text-sm">
                Category: {book.category}
              </p>

              <p className="text-gray-700 font-bold">
                {book.price}$
              </p>
            </div>

            {/* زرار إزالة */}
            <button
              onClick={() => removeBook(book.id)}
              className="shrink-0 text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))
      )}

      <Footer />
    </div>
  );
}