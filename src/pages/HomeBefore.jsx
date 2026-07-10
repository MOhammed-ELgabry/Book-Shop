
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
    <div className="bg-slate-50 text-slate-900">
      <NavBar />

      {/* HERO */}
      <div
        className="relative w-full min-h-[680px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-slate-950/70" />
        <div className="relative z-10 flex min-h-[680px] w-full items-center justify-center px-4 pt-24 text-center">
          <div className="flex w-full max-w-3xl flex-col items-center gap-7">
            <p className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              {lang === "en" ? "Curated Book Shop" : "Ù…ØªØ¬Ø± ÙƒØªØ¨ Ù…Ù…ÙŠØ²"}
            </p>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                {lang === "en" ? "Find your next favorite book" : "Ø§ÙƒØªØ´Ù ÙƒØªØ§Ø¨Ùƒ Ø§Ù„Ù…ÙØ¶Ù„ Ø§Ù„ØªØ§Ù„ÙŠ"}
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
                {lang === "en"
                  ? "Browse best sellers, recommended reads, and limited offers in one refined shopping experience."
                  : "ØªØµÙØ­ Ø§Ù„Ø£ÙƒØ«Ø± Ù…Ø¨ÙŠØ¹Ù‹Ø§ ÙˆØ§Ù„ØªØ±Ø´ÙŠØ­Ø§Øª ÙˆØ§Ù„Ø¹Ø±ÙˆØ¶ ÙÙŠ ØªØ¬Ø±Ø¨Ø© ØªØ³ÙˆÙ‚ Ù…Ù…ÙŠØ²Ø©."}
              </p>
            </div>

          {/* SEARCH */}
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => {}}
          >
            <Form className="relative w-full max-w-xl rounded-full bg-white p-2 shadow-2xl shadow-black/20">
              <Field
                name="search"
                placeholder={t.searchPlaceholder}
                className="h-12 w-full rounded-full border border-transparent bg-white px-5 pr-14 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-pink-200 focus:ring-4 focus:ring-pink-100"
              />

              <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg shadow-pink-900/20 transition hover:scale-105"
                  style={{ background: "rgba(217, 23, 108, 1)" }}
                >
                  <AiOutlineSearch className="text-white text-lg" />
                </div>
              </div>
            </Form>
          </Formik>

          </div>
        </div>
      </div>

      <main className="flex flex-col gap-16 py-14 sm:gap-20 sm:py-20">
        {/* SERVICES */}
        <ServicesGrid services={useServices} />

        {/* BEST SELLER */}
        <BestSellerSlider images={images} />

        {/* RECOMMENDED */}
        <Recommended recommended={recommended} />

        {/* FLASH SALE */}
        <FlashSale FlashSale={FlashSale} />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
