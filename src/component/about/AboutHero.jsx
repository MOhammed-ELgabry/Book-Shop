
// import bgImage from "../../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

// // 🌍 i18n
// import { useLanguageStore } from "../../store/languageStore";
// import { dictionary } from "../../i18n/dictionary";

// export default function AboutHero({ aboutPhoto }) {
//   const lang = useLanguageStore((state) => state.lang);
//   const t = dictionary[lang];

//   return (
//     <div
//       className="w-full min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       {aboutPhoto.map((el, index) => (
//         <div
//           key={index}
//           className="w-full min-h-screen flex items-center justify-center px-4"
//         >
//           <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] flex flex-col gap-5">

//             {/* 🌍 Title fallback optional */}
//             <h2 className="text-center text-xl sm:text-2xl md:text-3xl text-white font-bold">
//               {el.header || t.aboutHeroTitle}
//             </h2>

//             <p
//               className="text-justify text-white leading-relaxed text-sm sm:text-base md:text-lg"
//               style={{ textAlignLast: "center" }}
//             >
//               {el.details}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import bgImage from "../../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

// 🌍 i18n
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutHero({ aboutPhoto }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-fixed bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* Premium Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />
      
      {aboutPhoto.map((el, index) => (
        <div
          key={index}
          className="relative w-full min-h-screen flex items-center justify-center px-6 py-20"
        >
          <div className="w-full max-w-4xl flex flex-col items-center gap-8 text-center">
            {/* Glassmorphic Badge */}
            <div className="animate-fade-in inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-sm font-medium tracking-wider uppercase mb-2">
              Our Story
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl text-white font-black tracking-tight leading-tight">
              {el.header || t.aboutHeroTitle}
            </h1>

            <div className="h-1.5 w-24 bg-pink-600 rounded-full" />

            <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed">
              {el.details}
            </p>
            
            {/* Floating effect SVG or subtle icon could go here */}
          </div>
        </div>
      ))}
      
      {/* Bottom transition gradient to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}