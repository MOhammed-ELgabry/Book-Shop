

// import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
// import { HiOutlineGlobeAlt } from "react-icons/hi2";
// import { FaXTwitter } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import logo from "../assets/images/book-bookmark 1.png";

// export default function Footer() {
//   return (
//     <footer className="bg-[#3b2f4a] text-gray-300 px-6 py-10">
//       <div className="max-w-7xl mx-auto">

//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-500 pb-8">
          
//           {/* LEFT */}
//           <div className="flex flex-col md:flex-row items-center gap-6">
//             <img src={logo} alt="logo" className="h-10 w-auto" />

//             <ul className="flex gap-6 text-sm">
//               <li className="hover:text-white cursor-pointer">
//                 <Link to="/">Home</Link>
//               </li>
//               <li className="hover:text-white cursor-pointer">
//                 <Link to="/books">Books</Link>
//               </li>
//               <li className="hover:text-white cursor-pointer">
//                 <Link to="/about">About Us</Link>
//               </li>
//             </ul>
//           </div>

//           {/* RIGHT */}
//           <div className="flex flex-col items-center md:items-end gap-4">
//             <div className="flex gap-4 text-lg">
//               <FaFacebookF className="hover:text-white cursor-pointer" />
//               <FaInstagram className="hover:text-white cursor-pointer" />
//               <FaYoutube className="hover:text-white cursor-pointer" />
//               <FaXTwitter className="hover:text-white cursor-pointer" />
//             </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
//           <p className="text-center md:text-left">
//             Developed by EraaSoft © All Rights Reserved 2024
//           </p>

//           <div className="flex items-center gap-2 border border-gray-400 rounded px-3 py-1 cursor-pointer hover:border-white">
//             <HiOutlineGlobeAlt />
//             <span>English</span>
//           </div>
//         </div>

//       </div>
//     </footer>
//   );
// }
import { useEffect } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import WOW from "wowjs";

import logo from "../assets/images/book-bookmark 1.png";
import "animate.css";

export default function Footer() {
  useEffect(() => {
    new WOW.WOW({ live: false }).init();
  }, []);

  return (
    <footer className="bg-[#3b2f4a] text-gray-300 px-6 py-10 wow animate__animated animate__fadeInUp">
      <div className="max-w-7xl mx-auto">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-500 pb-8">

          {/* LEFT */}
          <div className="flex flex-col md:flex-row items-center gap-6 wow animate__animated animate__fadeInLeft" data-wow-delay="0.2s">
            <img src={logo} alt="logo" className="h-10 w-auto animate__animated animate__zoomIn" data-wow-delay="0.3s" />

            <ul className="flex gap-6 text-sm">
              <li className="hover:text-white cursor-pointer wow animate__animated animate__fadeInUp" data-wow-delay="0.4s">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-white cursor-pointer wow animate__animated animate__fadeInUp" data-wow-delay="0.5s">
                <Link to="/books">Books</Link>
              </li>
              <li className="hover:text-white cursor-pointer wow animate__animated animate__fadeInUp" data-wow-delay="0.6s">
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-center md:items-end gap-4 wow animate__animated animate__fadeInRight" data-wow-delay="0.7s">
            <div className="flex gap-4 text-lg">
              <FaFacebookF className="hover:text-white cursor-pointer animate__animated animate__pulse" data-wow-delay="0.8s" />
              <FaInstagram className="hover:text-white cursor-pointer animate__animated animate__pulse" data-wow-delay="0.9s" />
              <FaYoutube className="hover:text-white cursor-pointer animate__animated animate__pulse" data-wow-delay="1s" />
              <FaXTwitter className="hover:text-white cursor-pointer animate__animated animate__pulse" data-wow-delay="1.1s" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs wow animate__animated animate__fadeInUp" data-wow-delay="1.2s">
          <p className="text-center md:text-left">
            Developed by EraaSoft © All Rights Reserved 2024
          </p>

          <div className="flex items-center gap-2 border border-gray-400 rounded px-3 py-1 cursor-pointer hover:border-white animate__animated animate__pulse" data-wow-delay="1.3s">
            <HiOutlineGlobeAlt />
            <span>English</span>
          </div>
        </div>

      </div>
    </footer>
  );
}