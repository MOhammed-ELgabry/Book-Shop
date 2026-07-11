export default function CheckoutModal({
  show,
  onClose,
  paymentMethod,
  setPaymentMethod,
  checkoutData,
  handleChange,
  checkoutLoading,
  handleCheckout,
  paymentProof,
  setPaymentProof,
}) {
  if (!show) return null;

  const walletNumbers = {
    vodafone: "01006164484",
    orange: "01111111111",
    etisalat: "01222222222",
    we: "01533333333",
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4 transition-all"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-3xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* طرق الدفع */}
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Payment Method</p>
          <button
            onClick={() => setPaymentMethod("visa")}
            className={`border-2 p-4 rounded-2xl text-left transition-all flex items-center gap-3 ${
              paymentMethod === "visa" ? "border-pink-600 bg-pink-50 ring-2 ring-pink-100" : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl">💳</span>
            <span className="font-medium">Visa / Mastercard</span>
          </button>
          <button
            onClick={() => setPaymentMethod("wallet")}
            className={`border-2 p-4 rounded-2xl text-left transition-all flex items-center gap-3 ${
              paymentMethod === "wallet" ? "border-pink-600 bg-pink-50 ring-2 ring-pink-100" : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl">📱</span>
            <span className="font-medium">Mobile Wallet</span>
          </button>
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`border-2 p-4 rounded-2xl text-left transition-all flex items-center gap-3 ${
              paymentMethod === "cash" ? "border-pink-600 bg-pink-50 ring-2 ring-pink-100" : "border-gray-100 hover:border-gray-300"
            }`}
          >
            <span className="text-2xl">🚚</span>
            <span className="font-medium">Cash On Delivery</span>
          </button>
        </div>

        {/* العنوان والهاتف */}
        <div className="flex flex-col gap-4 mb-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Shipping Details</p>
          <input
            type="text"
            name="address"
            value={checkoutData.address}
            onChange={handleChange}
            placeholder="Delivery Address"
            className="border-2 border-gray-100 p-4 rounded-2xl focus:border-pink-600 focus:outline-none transition-all"
          />
          <input
            type="text"
            name="phone"
            value={checkoutData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border-2 border-gray-100 p-4 rounded-2xl focus:border-pink-600 focus:outline-none transition-all"
          />
        </div>

        {/* نموذج Visa */}
        {paymentMethod === "visa" && (
          <div className="flex flex-col gap-4 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Card Information</p>
            <input
              type="text"
              name="cardName"
              value={checkoutData.cardName}
              onChange={handleChange}
              placeholder="Card Holder Name"
              className="border-2 border-gray-100 p-4 rounded-2xl focus:border-pink-600 focus:outline-none transition-all"
            />
            <input
              type="text"
              name="cardNumber"
              value={checkoutData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              className="border-2 border-gray-100 p-4 rounded-2xl focus:border-pink-600 focus:outline-none transition-all"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiry"
                value={checkoutData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="border-2 border-gray-100 p-4 rounded-2xl focus:border-pink-600 focus:outline-none transition-all"
              />
              <input
                type="text"
                name="cvv"
                value={checkoutData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="border-2 border-gray-100 p-4 rounded-2xl focus:border-pink-600 focus:outline-none transition-all"
              />
            </div>
          </div>
        )}

        {/* نموذج المحفظة */}
        {paymentMethod === "wallet" && (
          <div className="flex flex-col gap-4 mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Wallet Details</p>
            <select
              name="walletType"
              value={checkoutData.walletType}
              onChange={handleChange}
              className="border-2 border-gray-100 p-4 rounded-2xl focus:border-pink-600 focus:outline-none transition-all"
            >
              <option value="">Choose Wallet</option>
              <option value="vodafone">Vodafone Cash</option>
              <option value="orange">Orange Cash</option>
              <option value="etisalat">Etisalat Cash</option>
              <option value="we">WE Pay</option>
            </select>

            {checkoutData.walletType && (
              <>
                <div className="border-2 border-pink-100 rounded-2xl p-5 bg-pink-50 text-center transition-all">
                  <p className="text-xs text-pink-500 uppercase font-bold mb-2">Send payment to:</p>
                  <p className="text-2xl font-extrabold text-pink-600 tracking-wider">
                    {walletNumbers[checkoutData.walletType]}
                  </p>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Upload payment screenshot
                  </label>
                  <div className="relative border-2 border-dashed border-gray-200 p-4 rounded-2xl hover:border-pink-400 transition-all group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPaymentProof(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-center text-gray-500 group-hover:text-pink-600 transition-colors">
                      <span className="text-2xl block mb-1">📸</span>
                      <span className="text-sm font-medium">Click to upload image</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* أزرار الإجراء */}
        <div className="flex gap-4 pt-4">
          <button
            onClick={onClose}
            className="flex-1 border-2 border-gray-100 p-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="flex-1 bg-pink-600 text-white p-4 rounded-2xl font-bold hover:bg-pink-700 transition-all transform active:scale-95 shadow-lg shadow-pink-200 disabled:bg-pink-300"
          >
            {checkoutLoading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
}