import { Truck, ShieldCheck, Zap, Globe } from "lucide-react";
import { useLanguageStore } from "../../store/languageStore";
import { dictionary } from "../../i18n/dictionary";

export default function AboutGrid({ aboutGrid }) {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  const icons = [
    <Truck size={28} />,
    <ShieldCheck size={28} />,
    <Zap size={28} />,
    <Globe size={28} />
  ];

  return (
    <div className="bg-slate-50 py-24 px-6 relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[15rem] font-black whitespace-nowrap">
        SERVICES
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs">Features</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            {t.aboutGridTitle}
          </h2>
          <div className="h-2 w-20 bg-orange-500 rounded-full shadow-lg shadow-orange-500/20" />
        </div>

        {/* Modern Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aboutGrid.map((el, index) => (
            <div
              key={index}
              className="group flex flex-col gap-8 p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-orange-200/40 transition-all duration-500 hover:-translate-y-3"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-orange-500 transition-all duration-500 group-hover:bg-orange-500 group-hover:text-white group-hover:rotate-12 shadow-sm">
                {icons[index % icons.length]}
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-orange-500 transition-colors">
                  {el?.title}
                </h3>

                <p className="text-slate-500 text-base font-medium leading-relaxed">
                  {el?.description}
                </p>
              </div>

              {/* Decorative hover element */}
              <div className="h-1.5 w-0 bg-orange-500 group-hover:w-full transition-all duration-700 rounded-full shadow-lg shadow-orange-500/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
