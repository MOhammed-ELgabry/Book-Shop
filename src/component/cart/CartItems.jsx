import { getStrapiMedia } from "../../utils/getStrapiMedia";

export default function CartItems({ items, updateQuantity, removeFromCart, user }) {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6">
      {items.map((item) => {
        const imgUrl =
          item?.img ||
          item?.book?.img?.url ||
          item?.book?.img?.data?.attributes?.url ||
          null;
        const finalImg = getStrapiMedia(imgUrl);

        return (
          <div
            key={item.bookId}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex gap-6 transition-hover hover:shadow-md"
          >
            {finalImg && (
              <img
                src={finalImg}
                className="w-28 h-36 object-cover rounded-xl shadow-sm"
                alt={item.name}
              />
            )}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-xl text-gray-800">{item.name}</h2>
                <p className="text-pink-600 font-bold text-lg mt-1">${item.price}</p>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-3 items-center bg-gray-50 p-1 rounded-lg border border-gray-200">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors font-bold text-gray-600"
                    onClick={() => {
                      if (item.quantity <= 1) return;
                      updateQuantity(item.bookId, item.quantity - 1, user);
                    }}
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-700">{item.quantity}</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors font-bold text-gray-600"
                    onClick={() =>
                      updateQuantity(item.bookId, item.quantity + 1, user)
                    }
                  >
                    +
                  </button>
                </div>
                
                <button
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm font-medium flex items-center gap-1"
                  onClick={() => removeFromCart(item.bookId, user)}
                >
                  <span>🗑️</span> Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}