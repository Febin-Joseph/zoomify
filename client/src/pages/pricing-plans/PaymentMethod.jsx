import React from 'react'

const PaymentMethod = ({ onClose, onSelectPaymentMethod }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Select Payment Method</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg m-2"
          onClick={() => onSelectPaymentMethod('razorpay')}
        >
          Razorpay
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg m-2"
          onClick={() => onSelectPaymentMethod('stripe')}
        >
          Stripe
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg m-2"
          onClick={() => onSelectPaymentMethod('paypal')}
        >
          PayPal
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-lg m-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod