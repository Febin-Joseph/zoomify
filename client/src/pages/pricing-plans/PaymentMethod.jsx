import React from 'react'
import axios from 'axios';
import { zoomifyLogo } from '../../constants/icons';
import { loadStripe } from '@stripe/stripe-js';

const PaymentMethod = ({ onClose, onSelectPaymentMethod, price }) => {
  // Razorpay
  const handlePaymentMethod = async (method) => {
    if (method === 'razorpay') {
      try {
        const response = await axios.post('https://zoomify-backend-git-main-febin-joseph.vercel.app/create/razorpay/order', {
          amount: price
        });
        const orderId = response.data.orderId;
        console.log(orderId);

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
    } else if (method === 'stripe') {
      const stripePromise = loadStripe('pk_test_51NvLbKSGqQ3kGNrgXE0bQUZ4Ok0fpca427m2QrZlhleZ7SVTZaYjs5N8vuZDh0sAV1J2EniatH8SCLw9lH2KfOpy00OgcmhbI0');
      const stripe = await stripePromise;

      try {
        const response = await axios.post('https://zoomify-backend-git-main-febin-joseph.vercel.app/create/stripe/order', {
          amount: price
        })

        const result = await stripe.redirectToCheckout({
          sessionId: response.data.sessionId,
        });

        if (result.error) {
          console.error('Error redirecting to Stripe Checkout:', result.error.message);
        }
      } catch (error) {
        console.error('Error creating Stripe Checkout session:', error);
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
          onClick={() => handlePaymentMethod('stripe')}
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