// import { FaStar, FaShoppingCart } from "react-icons/fa";
// import { FiHeart } from "react-icons/fi";

// export default function Recommended({ recommended }) {
//   return (
//     <div className="container flex flex-col w-full  p-4 gap-5 ">
//       <h3 className=" text-2xl font-bold">Recomended For You</h3>

//       <div className="flex flex-col lg:flex-row gap-3 p-3 ">
//         {recommended.map((el) => {
//           return (
//             <div
//               key={el.documentId}
//               className="container flex justify-between items-center shadow-2xl p-3 rounded"
//             >
//               <div className="flex gap-3" >
//                 <img
//                   src={`http://localhost:1337${el.image.url}`}
//                   alt=""
//                   className="w-50 object-cover p-2"
//                 />

//                 <div className="flex flex-col gap-3">
//                   <h3 className="text-2xl font-bold">{el.header}</h3>

//                   <p>
//                     Author: <span className="font-bold">{el.auther}</span>
//                   </p>

//                   <p>{el.description}</p>

//                   <div className="flex justify-between items-center">
//                     <div className="flex flex-col gap-2">
//                       <div className="flex gap-1">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <FaStar
//                             key={star}
//                             className={`text-xl ${
//                               star <= el.rate
//                                 ? "text-yellow-400"
//                                 : "text-gray-300"
//                             }`}
//                           />
//                         ))}
//                       </div>

//                       <p>Rate: {el.rate}</p>
//                     </div>

//                     <p className="font-bold p-2">{el.price}$</p>
//                   </div>

//                   <div className="flex gap-3">
//                     <button className=" text-white p-3 w-[80%] flex justify-center items-center gap-2 btn rounded shadow bg-[rgba(217,23,108,1)]">
//                       Add To Cart
//                       <span>
//                         <FaShoppingCart className="text-2xl cursor-pointer" />
//                       </span>
//                     </button>

//                     <button className="btn btn-close-white border border-[rgba(217,23,108,1)] p-3 rounded shadow">
//                       <span>
//                         <FiHeart className="text-2xl text-[rgba(217,23,108,1)]" />
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import WOW from "wowjs";
import Swal from "sweetalert2";
import "animate.css";

import { useCartStore } from "../store/CartStore";
import { useLoveBooksStore } from "../store/LoveBooks";

export default function Recommended({ recommended }) {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  const loveBooks = useLoveBooksStore((state) => state.loveBooks);
  const addToLoveBooks = useLoveBooksStore((state) => state.addToLoveBooks);

  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  const handleAddToCart = (product) => {
  const exists = cart.find((item) => item.documentId === product.documentId);
  if (exists) {
    Swal.fire({
      icon: "info",
      title: "Book is already added!",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    addToCart({ ...product, quantity: 1 });
    Swal.fire({
      icon: "success",
      title: "Book added successfully!",
      timer: 1500,
      showConfirmButton: false,
    });
  }
};

const handleAddToLove = (product) => {
  const exists = loveBooks.find((item) => item.documentId === product.documentId);
  if (exists) {
    Swal.fire({
      icon: "info",
      title: "Book is already added!",
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    addToLoveBooks(product);
    Swal.fire({
      icon: "success",
      title: "Book added successfully!",
      timer: 1500,
      showConfirmButton: false,
    });
  }
};



  return (
    <div className="container flex flex-col w-full  p-4 gap-5 ">
      <h3 className=" text-2xl font-bold wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
        Recomended For You
      </h3>

      <div className="flex flex-col lg:flex-row gap-3 p-3 ">
        {recommended.map((el, index) => (
          <div
            key={el.documentId}
            className="container flex justify-between items-center shadow-2xl p-3 rounded wow animate__animated animate__fadeInUp"
            data-wow-delay={`${0.2 * index}s`}
          >
            <div className="flex gap-3" >
              <img
                src={`http://localhost:1337${el.image.url}`}
                alt=""
                className="w-50 object-cover p-2 wow animate__animated animate__zoomIn"
              />

              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-bold wow animate__animated animate__fadeInUp" data-wow-delay={`${0.2 * index + 0.1}s`}>
                  {el.header}
                </h3>

                <p className="wow animate__animated animate__fadeInUp" data-wow-delay={`${0.2 * index + 0.2}s`}>
                  Author: <span className="font-bold">{el.auther}</span>
                </p>

                <p className="wow animate__animated animate__fadeInUp" data-wow-delay={`${0.2 * index + 0.3}s`}>
                  {el.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`text-xl ${star <= el.rate ? "text-yellow-400" : "text-gray-300"} wow animate__animated animate__fadeIn`}
                          data-wow-delay={`${0.2 * index + 0.4}s`}
                        />
                      ))}
                    </div>

                    <p>Rate: {el.rate}</p>
                  </div>

                  <p className="font-bold p-2">{el.price}$</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(el)}
                    className=" text-white p-3 w-[80%] flex justify-center items-center gap-2 btn rounded shadow bg-[rgba(217,23,108,1)] hover:scale-105 transition-transform duration-300"
                  >
                    Add To Cart
                    <FaShoppingCart className="text-2xl cursor-pointer" />
                  </button>

                  <button
                    onClick={() => handleAddToLove(el)}
                    className="btn btn-close-white border border-[rgba(217,23,108,1)] p-3 rounded shadow hover:scale-105 transition-transform duration-300"
                  >
                    <FiHeart className="text-2xl text-[rgba(217,23,108,1)]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}