
import "animate.css";

export default function ServicesGrid({ services }) {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {services.map((el, index) => (
          <div
            key={el.documentId}
            className="flex flex-col gap-2 shadow-2xl p-6 rounded-lg bg-white animate__animated animate__fadeInUp"
            data-delay={`${0.2 * index}s`}
          >

            {/* IMAGE */}
            {el.image?.url && (
              <img
                className="w-[60px] h-[60px] object-cover rounded-full animate__animated animate__zoomIn"
                src={
                  el.image.url?.startsWith("http")
                    ? el.image.url
                    : `${import.meta.env.VITE_API_URL}${el.image.url}`
                }
                alt={el.h2 || "service image"}
              />
            )}

            {/* TITLE */}
            <h2 className="font-bold text-lg animate__animated animate__fadeInUp">
              {el.h2}
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-600 animate__animated animate__fadeIn">
              {el.paragraph}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}