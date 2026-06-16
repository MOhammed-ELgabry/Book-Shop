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
            className="bg-white p-4 rounded-xl shadow flex gap-4"
          >
            {finalImg && (
              <img
                src={finalImg}
                className="w-24 h-32 object-cover rounded"
                alt={item.name}
              />
            )}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-gray-500 mt-1">${item.price}</p>
              <div className="flex gap-2 mt-4 items-center">
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => {
                    if (item.quantity <= 1) return;
                    updateQuantity(item.bookId, item.quantity - 1, user);
                  }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() =>
                    updateQuantity(item.bookId, item.quantity + 1, user)
                  }
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="text-red-500"
              onClick={() => removeFromCart(item.bookId, user)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
}