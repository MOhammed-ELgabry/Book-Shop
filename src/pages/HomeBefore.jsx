import NavBar from "../component/NavBar";
import { Formik, Form, Field } from "formik";
import { AiOutlineSearch } from "react-icons/ai";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import { useEffect, useState } from "react";
import axios from "axios";
import ServicesGrid from "../component/ServicesGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Footer from "../component/Footer";
import BestSellerSlider from "../component/BestSellerSlider";
import FlashSale from "../component/FlashSale";
import { FaRegStar, FaShoppingCart, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import Recommended from "../component/Recommended";

export default function HomeBefore() {
  const [useServices, setUseServices] = useState([]);
  const [imageSlider, setImageSlider] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [sale,setSale] =useState([])
  useEffect(()=>{
      const fetchData =async()=>{
        try{
          const res =await axios.get(
            "http://localhost:1337/api/sales/?populate=*")
            setSale(res.data.data)
            console.log(res.data.data)
        }catch(err){
          console.log(err)
        }
       
      }
       fetchData()
    },[])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/recommends/?populate=*",
        );

        setRecommended(res.data.data);
        
      } catch (err) {
        console.log(err);
      }
      fetchData()
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/image-sliders?populate=*",
        );

        setImageSlider(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1337/api/services?populate=*",
        );
        setUseServices(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const images =
    imageSlider.length > 0
      ? [
          imageSlider[0].image1,
          imageSlider[0].image2,
          imageSlider[0].image3,
          imageSlider[0].image4,
          imageSlider[0].image5,
          imageSlider[0].image6,
          imageSlider[0].image7,
          imageSlider[0].image8,
        ].filter(Boolean)
      : [];

  return (
    <div>
      <NavBar />
      <div
        className="w-full h-dvh bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full h-full bg-black/30 flex items-center justify-center">
          {/* Formik Search Field */}
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {
              // لا يوجد أي لوجيك
            }}
          >
            <Form className="relative w-full max-w-md">
              <Field
                name="search"
                placeholder="Search..."
                className="input w-full pr-12 bg-white rounded-full border border-gray-300 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

              {/* Search Icon */}
              <div className="absolute right-0 top-0 h-full flex items-center justify-center pr-2">
                <div
                  className="flex items-center justify-center h-10 w-10 rounded-e-full"
                  style={{ background: "rgba(217, 23, 108, 1)" }}
                >
                  <AiOutlineSearch className="text-white text-lg" />
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <ServicesGrid services={useServices} />

      <BestSellerSlider images={images} />
      <Recommended recommended={recommended} />

      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 w-full p-4">
      
    
      <div className="flex flex-col gap-3 max-w-md">
        <h2 className="font-bold text-2xl">Flash Sale</h2>
        <p className="text-start text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
          ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
          leo.
        </p>
      </div>

     
      <div className="flex justify-center md:justify-end">
        <div className="w-[200px] h-[200px] rounded-full border-2 border-[rgba(217,23,108,.5)] outline outline-[rgba(217,23,108,1)] flex items-center justify-center">
          <span className="text-xl font-bold">30:00:00</span>
        </div>
      </div>

{sale.map((el) => (
  <div
    key={el.id}
    className="w-full max-w-xl bg-[#3b2f4a] rounded-xl p-4 flex gap-4"
  >
    {/* 🖼️ الصورة */}
    <div className="flex-[0.35]">
      <img
        className="w-full h-full object-cover rounded"
        src={`http://localhost:1337${el.image.url}`}
        alt=""
      />
    </div>

    {/* 📄 المحتوى */}
    <div className="flex-[0.65] flex flex-col gap-2">
      <h3 className="text-white font-bold text-lg">{el.h3}</h3>

      <p className="text-sm text-gray-300">
        Author <span className="font-semibold">{el.auther}</span>
      </p>

      {/* ⭐⭐⭐⭐⭐ */}
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
        <p className="line-through text-gray-400">
          {el.price_before} $
        </p>
        <p className="text-white text-2xl font-bold">
          {el.price_after} $
        </p>
      </div>

     <div className="flex w-full my-2">
 
  <div className="w-2/3 h-1 bg-amber-400 rounded-l"></div>

 
  <div className="w-1/3 h-[2px] bg-amber-200 self-center"></div>
</div>

      <p className="text-sm text-white">
        {el.book_left} books left
      </p>
       <div className="flex justify-end mt-auto pt-2">
    <button
      className="
        w-9 h-9
        flex items-center justify-center
        rounded-md
        shadow-md
        hover:scale-105
        transition
      "
      style={{ backgroundColor: "rgba(217, 23, 108, 1)" }}
    >
      <FaShoppingCart className="text-white text-sm" />
    </button>
  </div>
    </div>
  </div>
))}



    </div>

      <Footer />
    </div>
  );
}
