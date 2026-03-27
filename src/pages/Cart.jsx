
import { useEffect } from "react";
import { useCartStore, initCart } from "../store/CartStore";
import { useAuthStore } from "../store/auth";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  // جلب الكارت من Strapi بعد login
  useEffect(() => {
    if (user && token) {
      initCart(user, token);
    }
  }, [user, token]);

  // زيادة الكمية
  const increaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item) updateQuantity(id, item.quantity + 1, token);
  };

  // تقليل الكمية
  const decreaseQty = (id) => {
    const item = cart.find((i) => i.id === id);
    if (item && item.quantity > 1) updateQuantity(id, item.quantity - 1, token);
  };

  // حذف عنصر
  const handleRemove = async (id) => {
    await removeFromCart(id, token);
  };

  // الحسابات
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
        <NavBar/>
       <div
           className="w-full h-48 bg-cover bg-center"
           style={{ backgroundImage: `url(${bgImage})` }}
       ></div>
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500">Your cart is empty 😢</div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* 🛒 المنتجات */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl shadow flex gap-6 items-center"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">${item.price}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">${item.price * item.quantity}</p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 text-sm mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 Summary */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className="border-t my-4"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-pink-600">${total}</span>
              </div>
              <button className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl hover:bg-pink-700 transition">
                Checkout
              </button>
            </div>
          </div>
          
        )}
     
      </div>
      <Footer />
   
    </div>
  );
}