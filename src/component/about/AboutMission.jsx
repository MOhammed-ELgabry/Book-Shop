
// import { useLanguageStore } from "../../store/languageStore";
// import { dictionary } from "../../i18n/dictionary";

// export default function AboutMission({ aboutCard }) {
//   const lang = useLanguageStore((state) => state.lang);
//   const t = dictionary[lang];

//   return (
//     <div className="container w-full h-dvh flex flex-col p-3 gap-5 mt-8">

//       {/* Title */}
//       <div>
//         <h2 className="text-2xl font-extrabold text-center">
//           {t.aboutMissionTitle}
//         </h2>
//       </div>

//       {/* Cards */}
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 gap-3">
//         {aboutCard.map((el, index) => (
//           <div
//             key={index}
//             className="p-2 flex flex-col gap-8 shadow rounded"
//           >
//             <h2 className="text-lg font-bold">{el.h2}</h2>

//             <p className="text-gray-600">{el.p}</p>

//             <button className="mt-2 px-4 py-2 text-pink-600 rounded cursor-pointer">
//               {el.button}
//             </button>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutMission({ aboutCard }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  return (
    <div className="bg-white py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-50 rounded-full opacity-50 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto">
          <span className="text-pink-600 font-bold uppercase tracking-widest text-xs">Our Values</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            {t.aboutMissionTitle}
          </h2>
          <div className="h-1 w-20 bg-pink-600/20 rounded-full" />
        </div>

        {/* Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutCard.map((el, index) => (
            <div
              key={index}
              className="group relative bg-white p-10 flex flex-col gap-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10 hover:border-pink-100"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-50 to-transparent rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 font-bold text-xl group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                  {el.h2}
                </h3>
              </div>

              <p className="text-gray-500 text-lg leading-relaxed font-light">
                {el.p}
              </p>

              <button className="mt-auto group/btn flex items-center gap-2 text-pink-600 font-bold text-sm tracking-wide uppercase hover:translate-x-2 transition-all">
                {el.button}
                <span className="text-xl">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}