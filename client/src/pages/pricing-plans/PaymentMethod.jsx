import React from 'react'
import axios from 'axios';
import { zoomifyLogo } from '../../constants/icons';

const PaymentMethod = ({ onClose, onSelectPaymentMethod, price }) => {
  const handlePaymentMethod = async (method) => {
    if (method === 'razorpay') {
      try {
        const response = await axios.post('http://localhost:4000/create/orderId', { amount: price });
        const orderId = response.data.orderId;
        console.log(orderId);

        // Razorpay
        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: price,
          currency: 'INR',
          name: 'Zoomify',
          description: 'Test Transaction',
          image: zoomifyLogo,
          order_id: orderId,
          handler: function (response) {
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature);
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
        console.error('Error creating order ID:', error);
      }
    }
    onSelectPaymentMethod(method);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Select Payment Method</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg m-2"
          onClick={() => handlePaymentMethod('razorpay')}>Razorpay</button>
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