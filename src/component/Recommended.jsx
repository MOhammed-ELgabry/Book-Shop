
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
  <section className="w-full px-4 py-8">
    {/* TITLE */}
    <h3 className="mb-6 text-2xl font-bold animate__animated animate__fadeInUp">
      {t.recommendedTitle}
    </h3>

    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      {recommended.map((el) => (
        <div
          key={el.documentId}
          onClick={() => navigate("/books")}
          className="flex w-full min-w-0 cursor-pointer items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl animate__animated animate__fadeInUp"
        >
          <img
            src={
              el.image?.url?.startsWith("http")
                ? el.image.url
                : `${import.meta.env.VITE_API_URL}${el.image.url}`
            }
            alt={el.header}
            className="h-32 w-28 shrink-0 rounded-xl object-cover"
          />

          <div className="flex min-w-0 flex-1 flex-col gap-3">

            <h3 className="truncate text-xl font-bold">
              {el.header}
            </h3>

            <p>
              {t.author}:{" "}
              <span className="font-bold">{el.auther}</span>
            </p>

            <p className="line-clamp-2 text-sm text-gray-600">
              {el.description}
            </p>

            <div className="flex items-center justify-between">

              <div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((star)=>(
                    <FaStar
                      key={star}
                      className={`text-lg ${
                        star <= el.rate
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm">
                  {t.rate}: {el.rate}
                </p>
              </div>

              <p className="font-bold">
                {el.price}$
              </p>

            </div>

            <button
              onClick={(e)=>handleAddToLove(e,el)}
              className="flex w-fit rounded-xl border border-pink-600 p-3 transition hover:scale-105"
            >
              <FiHeart className="text-2xl text-pink-600"/>
            </button>

          </div>
        </div>
      ))}
    </div>
  </section>
);
}