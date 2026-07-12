import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";
import { Target, Heart, Award } from "lucide-react";

export default function AboutMission({ aboutCard }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  const icons = [<Target size={32} />, <Heart size={32} />, <Award size={32} />];

  return (
    <div className="bg-white py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-50 rounded-full opacity-50 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto">
          <span className="text-orange-600 font-bold uppercase tracking-[0.3em] text-xs">Our Values</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {t.aboutMissionTitle}
          </h2>
          <div className="h-2 w-20 bg-orange-500 rounded-full shadow-lg shadow-orange-500/20" />
        </div>

        {/* Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutCard.map((el, index) => (
            <div
              key={index}
              className="group relative bg-white p-10 flex flex-col gap-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-100"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-orange-50 to-transparent rounded-tr-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col gap-5">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 transition-all duration-500 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-6">
                  {icons[index % icons.length]}
                </div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-orange-500 transition-colors">
                  {el.h2}
                </h3>
              </div>

              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                {el.p}
              </p>

              <button className="mt-auto group/btn flex items-center gap-3 text-orange-600 font-black text-sm tracking-widest uppercase hover:translate-x-2 transition-all">
                {el.button}
                <span className="text-2xl group-hover/btn:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
