
import { FaTruck } from "react-icons/fa";
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutGrid({ aboutGrid }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  return (
    <div className="p-6 flex flex-col gap-6">
      
      {/* Title */}
      <h2 className="text-2xl font-bold text-center">
        {t.aboutGridTitle}
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aboutGrid.map((el, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 p-4 shadow-2xl"
          >
            
            <div className="text-gray-500 text-2xl">
              <FaTruck />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {el?.title}
            </h3>

            <p className="text-gray-500 text-sm">
              {el?.description}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}