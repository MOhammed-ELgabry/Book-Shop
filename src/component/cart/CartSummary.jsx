export default function CartSummary({ subtotal, shipping, total, onCheckout }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-6">
      <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100">Order Summary</h3>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">${shipping}</span>
        </div>
        <div className="flex justify-between text-2xl font-bold text-gray-900 pt-4 border-t border-gray-100">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 shadow-lg shadow-pink-200"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}