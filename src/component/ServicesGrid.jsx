
import "animate.css";

export default function ServicesGrid({ services }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {services.map((el, index) => (
          <div
            key={el.documentId}
            className="group flex min-w-0 flex-col gap-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl animate__animated animate__fadeInUp"
            data-delay={`${0.2 * index}s`}
          >

            {/* IMAGE */}
            {el.image?.url && (
              <img
                className="h-14 w-14 rounded-2xl object-cover ring-4 ring-pink-50 transition duration-300 group-hover:scale-105 animate__animated animate__zoomIn"
                src={
                  el.image.url?.startsWith("http")
                    ? el.image.url
                    : `${import.meta.env.VITE_API_URL}${el.image.url}`
                }
                alt={el.h2 || "service image"}
              />
            )}

            {/* TITLE */}
            <h2 className="text-lg font-bold text-slate-900 animate__animated animate__fadeInUp">
              {el.h2}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-sm leading-6 text-slate-600 animate__animated animate__fadeIn">
              {el.paragraph}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}
