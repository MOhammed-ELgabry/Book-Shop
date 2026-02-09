// ServicesGrid.jsx
import React from "react";

export default function ServicesGrid({ services }) {
  return (
    <div className="container mt-10 flex justify-center items-center">
      <div className="container p-5 flex justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {services.map((el) => (
          <div key={el.documentId} className="flex flex-col gap-2 shadow-2xl p-4 rounded-lg">
            {el.image?.url && (
              <img
                className="w-[40px] h-[40px] object-cover"
                src={`http://localhost:1337${el.image.url}`}
                alt={el.h2 || "service image"}
              />
            )}
            <h2 className="font-bold ">{el.h2}</h2>
            <p>{el.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
