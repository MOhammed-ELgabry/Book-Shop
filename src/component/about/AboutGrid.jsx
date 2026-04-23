import { FaTruck } from "react-icons/fa";

export default function AboutGrid({ aboutGrid }) {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {aboutGrid.map((el, index) => (
        <div key={index} className="flex flex-col gap-3 p-4 shadow-2xl">
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
  );
}