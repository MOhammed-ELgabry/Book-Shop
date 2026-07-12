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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-transparent" />
      
      {aboutPhoto.map((el, index) => (
        <div
          key={index}
          className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 animate__animated animate__fadeIn"
        >
          <div className="w-full max-w-4xl flex flex-col items-center gap-8 text-center">
            {/* Glassmorphic Badge */}
            <div className="inline-block px-5 py-2 bg-orange-500/20 backdrop-blur-md border border-orange-500/30 rounded-full text-orange-400 text-xs font-black tracking-[0.2em] uppercase mb-2">
              Our Story
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl text-white font-black tracking-tight leading-tight">
              {el.header || t.aboutHeroTitle}
            </h1>

            <div className="h-2 w-24 bg-orange-500 rounded-full shadow-lg shadow-orange-500/40" />

            <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-white/80 font-medium leading-relaxed drop-shadow-md">
              {el.details}
            </p>
          </div>
        </div>
      ))}
      
      {/* Bottom transition gradient to next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent" />
    </div>
  );
}
