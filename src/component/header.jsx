

import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
export default function Header() {
  return (
    <div
      className="w-full h-[338px] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full h-full bg-black/30 flex items-center justify-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold text-center">
          Welcome to Book Shop
        </h1>
      </div>
    </div>
  );
}

