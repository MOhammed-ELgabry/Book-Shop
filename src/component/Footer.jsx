
// import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
// import { HiOutlineGlobeAlt } from "react-icons/hi2";
// import { FaXTwitter } from "react-icons/fa6";
// import { Link } from "react-router-dom";


// import logo from "../assets/images/book-bookmark 1.png";
// import "animate.css";

// export default function Footer() {
 

//   return (
//     <footer className="bg-[#3b2f4a] text-gray-300 px-6 py-10  animate__animated animate__fadeInUp">
//       <div className="max-w-7xl mx-auto">

//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-500 pb-8">

//           {/* LEFT */}
//           <div className="flex flex-col md:flex-row items-center gap-6  animate__animated animate__fadeInLeft" data-delay="0.2s">
//             <img src={logo} alt="logo" className="h-10 w-auto animate__animated animate__zoomIn" data-delay="0.3s" />

//             <ul className="flex gap-6 text-sm">
//               <li className="hover:text-white cursor-pointer  animate__animated animate__fadeInUp" data-delay="0.4s">
//                 <Link to="/">Home</Link>
//               </li>
//               <li className="hover:text-white cursor-pointer  animate__animated animate__fadeInUp" data-delay="0.5s">
//                 <Link to="/books">Books</Link>
//               </li>
//               <li className="hover:text-white cursor-pointer  animate__animated animate__fadeInUp" data-delay="0.6s">
//                 <Link to="/about">About Us</Link>
//               </li>
//             </ul>
//           </div>

//           {/* RIGHT */}
//           <div className="flex flex-col items-center md:items-end gap-4 animate__animated animate__fadeInRight" data-delay="0.7s">
//             <div className="flex gap-4 text-lg">
//               <FaFacebookF className="hover:text-white cursor-pointer animate__animated animate__pulse" data-delay="0.8s" />
//               <FaInstagram className="hover:text-white cursor-pointer animate__animated animate__pulse" data-delay="0.9s" />
//               <FaYoutube className="hover:text-white cursor-pointer animate__animated animate__pulse" data-delay="1s" />
//               <FaXTwitter className="hover:text-white cursor-pointer animate__animated animate__pulse" data-delay="1.1s" />
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs animate__animated animate__fadeInUp" data-delay="1.2s">
//           <p className="text-center md:text-left">
//             Developed by EraaSoft © All Rights Reserved 2024
//           </p>

//           <div className="flex items-center gap-2 border border-gray-400 rounded px-3 py-1 cursor-pointer hover:border-white animate__animated animate__pulse" data-delay="1.3s">
//             <HiOutlineGlobeAlt />
//             <span>English</span>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

import logo from "../assets/images/book-bookmark 1.png";
import "animate.css";

// 🌍 i18n
import { useLanguageStore } from "../store/languageStore";

export default function Footer() {
  const lang = useLanguageStore((s) => s.lang);
  const toggleLang = useLanguageStore((s) => s.toggleLang);

  return (
    <footer className="bg-[#3b2f4a] text-gray-300 px-6 py-10 animate__animated animate__fadeInUp">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-500 pb-8">

          {/* LEFT */}
          <div className="flex flex-col md:flex-row items-center gap-6 animate__animated animate__fadeInLeft">
            <img src={logo} alt="logo" className="h-10 w-auto animate__animated animate__zoomIn" />

            <ul className="flex gap-6 text-sm">
              <li className="hover:text-white cursor-pointer animate__animated animate__fadeInUp">
                <Link to="/">{lang === "en" ? "Home" : "الرئيسية"}</Link>
              </li>

              <li className="hover:text-white cursor-pointer animate__animated animate__fadeInUp">
                <Link to="/books">{lang === "en" ? "Books" : "الكتب"}</Link>
              </li>

              <li className="hover:text-white cursor-pointer animate__animated animate__fadeInUp">
                <Link to="/about">{lang === "en" ? "About Us" : "من نحن"}</Link>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center md:items-end gap-4 animate__animated animate__fadeInRight">
            <div className="flex gap-4 text-lg">
              <FaFacebookF className="hover:text-white cursor-pointer animate__animated animate__pulse" />
              <FaInstagram className="hover:text-white cursor-pointer animate__animated animate__pulse" />
              <FaYoutube className="hover:text-white cursor-pointer animate__animated animate__pulse" />
              <FaXTwitter className="hover:text-white cursor-pointer animate__animated animate__pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs animate__animated animate__fadeInUp">

          <p className="text-center md:text-left">
            {lang === "en"
              ? "Developed by Mohammed Elgabry © All Rights Reserved 2024"
              : "تم التطوير بواسطة محمد الجابري © جميع الحقوق محفوظة 2024"}
          </p>

          {/* 🌍 LANGUAGE BUTTON */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 border border-gray-400 rounded px-3 py-1 cursor-pointer hover:border-white animate__animated animate__pulse"
          >
            <HiOutlineGlobeAlt />
            <span>{lang === "en" ? "English" : "عربي"}</span>
          </button>

        </div>

      </div>
    </footer>
  );
}