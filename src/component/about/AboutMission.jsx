
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutMission({ aboutCard }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  return (
    <div className="container w-full h-dvh flex flex-col p-3 gap-5 mt-8">

      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-center">
          {t.aboutMissionTitle}
        </h2>
      </div>

      {/* Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 gap-3">
        {aboutCard.map((el, index) => (
          <div
            key={index}
            className="p-2 flex flex-col gap-8 shadow rounded"
          >
            <h2 className="text-lg font-bold">{el.h2}</h2>

            <p className="text-gray-600">{el.p}</p>

            <button className="mt-2 px-4 py-2 text-pink-600 rounded cursor-pointer">
              {el.button}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}