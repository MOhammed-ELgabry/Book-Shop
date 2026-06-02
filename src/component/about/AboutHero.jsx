
import bgImage from "../../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

// 🌍 i18n
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutHero({ aboutPhoto }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {aboutPhoto.map((el, index) => (
        <div
          key={index}
          className="w-full min-h-screen flex items-center justify-center px-4"
        >
          <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] flex flex-col gap-5">

            {/* 🌍 Title fallback optional */}
            <h2 className="text-center text-xl sm:text-2xl md:text-3xl text-white font-bold">
              {el.header || t.aboutHeroTitle}
            </h2>

            <p
              className="text-justify text-white leading-relaxed text-sm sm:text-base md:text-lg"
              style={{ textAlignLast: "center" }}
            >
              {el.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}