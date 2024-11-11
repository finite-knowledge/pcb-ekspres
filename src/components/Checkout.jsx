// Checkout.jsx

import React, { useState } from "react";

const Checkout = ({ cartItems }) => {
  const [isShippingAdded, setIsShippingAdded] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const handleAddShipping = () => setIsShippingAdded(true);
  const handlePurchase = () => setIsPurchased(true);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>

      {/* Cart Items */}
      <div>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <span>{item.name}</span>
              <span>${item.price}</span>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Shipping Button */}
      {!isShippingAdded && (
        <button
          onClick={handleAddShipping}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Shipping Info
        </button>
      )}

      {/* Purchase Button */}
      {isShippingAdded && !isPurchased && (
        <button
          onClick={handlePurchase}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          Buy Now
        </button>
      )}

      {/* Checkmark for Purchase */}
      {isPurchased && (
        <div className="mt-4 text-green-600">
          <span>&#10003; Purchase Complete!</span>
        </div>
      )}
    </div>
  );
};

export default Checkout;
