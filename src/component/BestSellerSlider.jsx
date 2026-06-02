
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";


// import "swiper/css";
// import "swiper/css/navigation";
// import "animate.css";

// export default function BestSellerSlider({ images }) {


//   return (
//     <div className="flex justify-center items-center w-full min-h-dvh md:h-dvh bg-[rgba(59,47,74,1)]  animate__animated animate__fadeIn">
//       <div className="flex flex-col gap-8 justify-center items-center text-center px-4 w-full">

//         <h3 className="text-white text-2xl font-bold animate__animated animate__fadeInUp" data-delay="0.2s">
//           Best Seller
//         </h3>

//         <p className="text-white max-w-2xl  animate__animated animate__fadeInUp" data-delay="0.4s">
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
//           ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
//           leo.
//         </p>

//         {images?.length > 0 && (
//           <div className="w-full max-w-7xl mt-10">
//             <Swiper
//               modules={[Autoplay, Navigation]}
//               spaceBetween={12}
//               loop={images.length > 4}
//               navigation
//               autoplay={{
//                 delay: 2000,
//                 disableOnInteraction: false,
//               }}
//               breakpoints={{
//                 0: { slidesPerView: 2 },
//                 640: { slidesPerView: 3 },
//                 1024: { slidesPerView: 5 },
//                 1280: { slidesPerView: 7 },
//               }}
//             >
//               {images.map((img, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="flex justify-center items-center bg-white shadow-md rounded-lg p-3 h-[220px]  animate__animated animate__zoomIn" data-delay={`${0.1 * index}s`}>
//                     <img
//                       src={`http://localhost:1337${img.url}`}
//                       alt="slider"
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         )}

//         <button className="bg-[rgba(217,23,108,1)] text-white px-8 py-3 rounded-2xl  animate__animated animate__pulse hover:animate__pulse" data-delay="0.6s">
//           Shop now
//         </button>
//       </div>
//     </div>
//   );
// }

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "animate.css";

import { useLanguageStore } from "../store/languageStore";
import { dictionary } from "../i18n/dictionary";

export default function BestSellerSlider({ images }) {
  const lang = useLanguageStore((s) => s.lang);
  const t = dictionary[lang];

  return (
    <div className="flex justify-center items-center w-full min-h-dvh md:h-dvh bg-[rgba(59,47,74,1)] animate__animated animate__fadeIn">
      <div className="flex flex-col gap-8 justify-center items-center text-center px-4 w-full">

        {/* TITLE */}
        <h3 className="text-white text-2xl font-bold animate__animated animate__fadeInUp">
          {t.bestSellerTitle}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-white max-w-2xl animate__animated animate__fadeInUp">
          {t.bestSellerDesc}
        </p>

        {/* SLIDER */}
        {images?.length > 0 && (
          <div className="w-full max-w-7xl mt-10">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={12}
              loop={images.length > 4}
              navigation
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 7 },
              }}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="flex justify-center items-center bg-white shadow-md rounded-lg p-3 h-[220px] animate__animated animate__zoomIn">
                    <img
                      src={`http://localhost:1337${img.url}`}
                      alt="slider"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* BUTTON */}
        <button className="bg-[rgba(217,23,108,1)] text-white px-8 py-3 rounded-2xl animate__animated animate__pulse hover:animate__pulse">
          {t.shopNow}
        </button>

      </div>
    </div>
  );
}