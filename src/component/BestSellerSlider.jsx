import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function BestSellerSlider({ images }) {
  return (
    <div className="flex justify-center items-center w-full h-dvh bg-[rgba(59,47,74,1)]">
      <div className="flex flex-col gap-8 justify-center items-center text-center px-4">
        
        <h3 className="text-white text-2xl font-bold">
          Best Seller
        </h3>

        <p className="text-white max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
          leo.
        </p>

        {/* Slider */}
        {images?.length > 0 && (
          <div className="container mt-10">
            <Swiper
              modules={[Autoplay, Navigation]}
              slidesPerView={7}
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
                  <div className="flex justify-center items-center bg-white shadow-md rounded-lg p- [120px]">
                    <img
                      src={`http://localhost:1337${img.url}`}
                      alt="slider"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <button className="bg-[rgba(217,23,108,1)] text-white px-8 py-3 rounded-2xl cursor-pointer">
          Shop now
        </button>
      </div>
    </div>
  );
}
