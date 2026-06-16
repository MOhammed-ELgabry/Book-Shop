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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        {/* طرق الدفع */}
        <div className="flex flex-col gap-3 mb-6">
          <button
            onClick={() => setPaymentMethod("visa")}
            className={`border p-3 rounded-lg text-left ${
              paymentMethod === "visa" ? "border-pink-600 bg-pink-50" : ""
            }`}
          >
            💳 Visa / Mastercard
          </button>
          <button
            onClick={() => setPaymentMethod("wallet")}
            className={`border p-3 rounded-lg text-left ${
              paymentMethod === "wallet" ? "border-pink-600 bg-pink-50" : ""
            }`}
          >
            📱 Mobile Wallet
          </button>
          <button
            onClick={() => setPaymentMethod("cash")}
            className={`border p-3 rounded-lg text-left ${
              paymentMethod === "cash" ? "border-pink-600 bg-pink-50" : ""
            }`}
          >
            🚚 Cash On Delivery
          </button>
        </div>

        {/* العنوان والهاتف */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            name="address"
            value={checkoutData.address}
            onChange={handleChange}
            placeholder="Address"
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            name="phone"
            value={checkoutData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
          />
        </div>

        {/* نموذج Visa */}
        {paymentMethod === "visa" && (
          <div className="flex flex-col gap-4 mb-6">
            <input
              type="text"
              name="cardName"
              value={checkoutData.cardName}
              onChange={handleChange}
              placeholder="Card Holder Name"
              className="border p-3 rounded-lg"
            />
            <input
              type="text"
              name="cardNumber"
              value={checkoutData.cardNumber}
              onChange={handleChange}
              placeholder="Card Number"
              className="border p-3 rounded-lg"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="expiry"
                value={checkoutData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="border p-3 rounded-lg"
              />
              <input
                type="text"
                name="cvv"
                value={checkoutData.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="border p-3 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* نموذج المحفظة */}
        {paymentMethod === "wallet" && (
          <div className="flex flex-col gap-4 mb-6">
            <select
              name="walletType"
              value={checkoutData.walletType}
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option value="">Choose Wallet</option>
              <option value="vodafone">Vodafone Cash</option>
              <option value="orange">Orange Cash</option>
              <option value="etisalat">Etisalat Cash</option>
              <option value="we">WE Pay</option>
            </select>

            {checkoutData.walletType && (
              <>
                <div className="border rounded-xl p-4 bg-gray-50">
                  <p className="text-sm text-gray-500 mb-2">Send payment to:</p>
                  <p className="text-xl font-bold text-pink-600">
                    {walletNumbers[checkoutData.walletType]}
                  </p>
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Upload payment screenshot
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPaymentProof(e.target.files[0])}
                    className="border p-2 rounded-lg w-full"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* أزرار الإجراء */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 border p-3 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="flex-1 bg-pink-600 text-white p-3 rounded-lg"
          >
            {checkoutLoading ? "Processing..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
}