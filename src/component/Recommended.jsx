import { FaStar, FaShoppingCart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

export default function Recommended({ recommended }) {
  return (
    <div className="container flex flex-col w-full h-dvh p-4 gap-5 ">
      <h3 className=" text-2xl font-bold">Recomended For You</h3>

      <div className="flex flex-col lg:flex-row gap-3 p-3 ">
        {recommended.map((el) => {
          return (
            <div
              key={el.documentId}
              className="container flex justify-between items-center shadow-2xl p-3 rounded"
            >
              <div className="flex gap-3">
                <img
                  src={`http://localhost:1337${el.image.url}`}
                  alt=""
                  className="w-70 h-70 object-cover p-2"
                />

                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-bold">{el.header}</h3>

                  <p>
                    Author: <span className="font-bold">{el.auther}</span>
                  </p>

                  <p>{el.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={`text-xl ${
                              star <= el.rate
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>

                      <p>Rate: {el.rate}</p>
                    </div>

                    <p className="font-bold p-2">{el.price}$</p>
                  </div>

                  <div className="flex gap-3">
                    <button className=" text-white p-3 w-[80%] flex justify-center items-center gap-2 btn rounded shadow bg-[rgba(217,23,108,1)]">
                      Add To Cart
                      <span>
                        <FaShoppingCart className="text-2xl cursor-pointer" />
                      </span>
                    </button>

                    <button className="btn btn-close-white border border-[rgba(217,23,108,1)] p-3 rounded shadow">
                      <span>
                        <FiHeart className="text-2xl text-[rgba(217,23,108,1)]" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
