
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

// 🌍 i18n
import { useLanguageStore } from "../store/languageStore";
import { dictionary } from "../i18n/dictionary";

export default function HomeBefore() {
  const [useServices, setUseServices] = useState([]);
  const [imageSlider, setImageSlider] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [sale, setSale] = useState([]);

  // 🌍 language
  const lang = useLanguageStore((s) => s.lang);
  const t = dictionary[lang];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/sales/?populate=*`
        );
        setSale(res.data.data);
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
          `${import.meta.env.VITE_API_URL}/api/recommends/?populate=*`
        );
        setRecommended(res.data.data);
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
          `${import.meta.env.VITE_API_URL}/api/image-sliders?populate=*`
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
          `${import.meta.env.VITE_API_URL}/api/services?populate=*`
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

      {/* HERO */}
      <div
        className="w-full h-dvh bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="w-full h-full bg-black/30 flex items-center justify-center">

          {/* SEARCH */}
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {}}
          >
            <Form className="relative w-full max-w-md">
              <Field
                name="search"
                placeholder={t.searchPlaceholder}
                className="input w-full pr-12 bg-white rounded-full border border-gray-300 h-12 px-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />

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

      {/* SERVICES */}
      <ServicesGrid services={useServices} />

      {/* BEST SELLER */}
      <BestSellerSlider images={images} />

      {/* RECOMMENDED */}
      <Recommended recommended={recommended} />

      {/* FLASH SALE */}
      <FlashSale FlashSale={FlashSale} />

      {/* FOOTER */}
      <Footer />
    </div>
  );
}