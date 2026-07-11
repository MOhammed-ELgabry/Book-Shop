
// import { FaTruck } from "react-icons/fa";
// import { useLanguageStore } from "../../store/languageStore";
// import { dictionary } from "../../i18n/dictionary";

// export default function AboutGrid({ aboutGrid }) {
//   const lang = useLanguageStore((state) => state.lang);
//   const t = dictionary[lang];

//   return (
//     <div className="p-6 flex flex-col gap-6">
      
//       {/* Title */}
//       <h2 className="text-2xl font-bold text-center">
//         {t.aboutGridTitle}
//       </h2>

//       {/* Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {aboutGrid.map((el, index) => (
//           <div
//             key={index}
//             className="flex flex-col gap-3 p-4 shadow-2xl"
//           >
            
//             <div className="text-gray-500 text-2xl">
//               <FaTruck />
//             </div>

//             <h3 className="text-lg font-semibold text-gray-800">
//               {el?.title}
//             </h3>

//             <p className="text-gray-500 text-sm">
//               {el?.description}
//             </p>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { FaTruck } from "react-icons/fa";
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutGrid({ aboutGrid }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  return (
    <div className="bg-gray-50 py-24 px-6 relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-[15rem] font-black whitespace-nowrap">
        SERVICES
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-pink-600 font-bold uppercase tracking-widest text-xs">Features</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            {t.aboutGridTitle}
          </h2>
          <div className="h-1.5 w-20 bg-pink-600 rounded-full" />
        </div>

        {/* Modern Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutGrid.map((el, index) => (
            <div
              key={index}
              className="group flex flex-col gap-6 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-pink-600 transition-all duration-300 group-hover:bg-pink-600 group-hover:text-white group-hover:rotate-6 shadow-sm">
                <FaTruck size={28} />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                  {el?.title}
                </h3>

                <p className="text-gray-500 text-base font-light leading-relaxed">
                  {el?.description}
                </p>
              </div>

              {/* Decorative hover element */}
              <div className="h-1 w-0 bg-pink-600 group-hover:w-full transition-all duration-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}