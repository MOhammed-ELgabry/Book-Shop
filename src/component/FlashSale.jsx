


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart } from "react-icons/fa";

import Swal from "sweetalert2";
import "animate.css";

import { useCartStore } from "../store/CartStore";
import { useNavigate } from "react-router-dom";

export default function FlashSale({ FlashSale }) {
  const [sale, setSale] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60 * 60); // 30 ساعة بالثواني
const navigate = useNavigate()
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);

  // ✅ جلب بيانات الفلاش سيل
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:1337/api/sales?populate=*");
        setSale(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  // ✅ عداد تنازلي
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  
  

  // ✅ تحويل الثواني إلى hh:mm:ss
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  };

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 w-full p-4">
      {/* نص تعريفي */}
      <div className="flex flex-col gap-3 max-w-md  animate__animated animate__fadeInUp" data-delay="0.2s">
        <h2 className="font-bold text-2xl">Flash Sale</h2>
        <p className="text-start text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
          leo.
        </p>
      </div>

      {/* العداد */}
      <div className="flex justify-center md:justify-end  animate__animated animate__fadeInRight" data-delay="0.3s">
        <div className="w-[200px] h-[200px] rounded-full border-2 border-[rgba(217,23,108,.5)] outline outline-[rgba(217,23,108,1)] flex items-center justify-center">
          <span className="text-xl font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* الكروت */}
      {sale.map((el, index) => (
        <div onClick={()=>navigate ('/books')}
          key={el.id}
          className="w-full max-w-xl bg-[#3b2f4a] rounded-xl p-4 flex gap-4  animate__animated animate__fadeInUp"
          data-delay={`${0.2 * index}s`}
        >
          {/* صورة الكتاب */}
          <div className="flex-[0.35]">
            <img
              className="w-full h-full object-cover rounded  animate__animated animate__zoomIn"
              data-delay={`${0.2 * index + 0.1}s`}
              src={`http://localhost:1337${el.image.url}`}
              alt={el.h3}
            />
          </div>

          {/* محتوى الكارد */}
          <div className="flex-[0.65] flex flex-col gap-2">
            <h3 className="text-white font-bold text-lg  animate__animated animate__fadeInUp" data-delay={`${0.2 * index + 0.2}s`}>{el.h3}</h3>
            <p className="text-sm text-gray-300  animate__animated animate__fadeInUp" data-delay={`${0.2 * index + 0.3}s`}>
              Author <span className="font-semibold">{el.auther}</span>
            </p>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) =>
                el.rate >= star ? (
                  <FaStar key={star} className="text-yellow-400" />
                ) : el.rate >= star - 0.5 ? (
                  <FaStarHalfAlt key={star} className="text-yellow-400" />
                ) : (
                  <FaRegStar key={star} className="text-gray-500" />
                )
              )}
            </div>

            <div className="flex items-center gap-8 text-sm text-amber-50">
              <p>{el.rate}</p>
              <p className="text-white">({el.review} review)</p>
            </div>

            <div className="flex gap-3 items-center">
              <p className="line-through text-gray-400">{el.price_before} $</p>
              <p className="text-white text-2xl font-bold">{el.price_after} $</p>
            </div>

            <div className="flex w-full my-2">
              <div className="w-2/3 h-1 bg-amber-400 rounded-l"></div>
              <div className="w-1/3 h-[2px] bg-amber-200 self-center"></div>
            </div>

            <p className="text-sm text-white">{el.book_left} books left</p>

            <div className="flex justify-end mt-auto pt-2">
              <button
                // onClick={() => handleAddToCart(el)}
                className="w-9 h-9 flex items-center justify-center rounded-md shadow-md hover:scale-105 transition"
                style={{ backgroundColor: "rgba(217, 23, 108, 1)" }}
              >
                <FaShoppingCart className="text-white text-sm" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}