
import { FaStar } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "animate.css";

import { useLoveBooksStore } from "../store/LoveBooks";

// 🌍 i18n
import { useLanguageStore } from "../store/languageStore";
import { dictionary } from "../i18n/dictionary";

export default function Recommended({ recommended }) {
  const navigate = useNavigate();

  const loveBooks = useLoveBooksStore((state) => state.loveBooks);
  const addToLoveBooks = useLoveBooksStore((state) => state.addToLoveBooks);

  // 🌍 language
  const lang = useLanguageStore((s) => s.lang);
  const t = dictionary[lang];

  const handleAddToLove = (e, product) => {
    e.stopPropagation();

    const exists = loveBooks.find(
      (item) => item.documentId === product.documentId
    );

    if (exists) {
      Swal.fire({
        icon: "info",
        title: t.alreadyAdded,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      addToLoveBooks(product);
      Swal.fire({
        icon: "success",
        title: t.addedSuccess,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container flex flex-col w-full p-4 gap-5">

      {/* TITLE */}
      <h3 className="text-2xl font-bold animate__animated animate__fadeInUp">
        {t.recommendedTitle}
      </h3>

      <div className="flex flex-col lg:flex-row gap-3 p-3">
        {recommended.map((el, index) => (
          <div
            key={el.documentId}
            onClick={() => navigate("/books")}
            className="container flex justify-between items-center shadow-2xl p-3 rounded cursor-pointer animate__animated animate__fadeInUp"
          >
            <div className="flex gap-3">

              <img
                src={`http://localhost:1337${el.image.url}`}
                alt=""
                className="w-50 object-cover p-2 animate__animated animate__zoomIn"
              />

              <div className="flex flex-col gap-3">

                <h3 className="text-2xl font-bold animate__animated animate__fadeInUp">
                  {el.header}
                </h3>

                <p>
                  {t.author}: <span className="font-bold">{el.auther}</span>
                </p>

                <p>{el.description}</p>

                <div className="flex justify-between items-center">

                  <div className="flex flex-col gap-2">

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`text-xl ${
                            star <= el.rate
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    <p>
                      {t.rate}: {el.rate}
                    </p>

                  </div>

                  <p className="font-bold p-2">{el.price}$</p>
                </div>

                <div className="flex gap-3">

                  <button
                    onClick={(e) => handleAddToLove(e, el)}
                    className="btn border border-[rgba(217,23,108,1)] p-3 rounded shadow hover:scale-105 transition-transform duration-300"
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