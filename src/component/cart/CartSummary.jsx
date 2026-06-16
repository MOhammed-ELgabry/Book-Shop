export default function CartSummary({ subtotal, shipping, total, onCheckout }) {
  return (
    <div className="bg-white p-6 rounded-xl h-fit">
      <div className="mb-3">Subtotal: ${subtotal}</div>
      <div className="mb-3">Shipping: ${shipping}</div>
      <div className="font-bold text-lg">Total: ${total}</div>
      <button
        onClick={onCheckout}
        className="w-full mt-4 bg-pink-600 text-white p-3 rounded"
      >
        Checkout
      </button>
    </div>
  );
}