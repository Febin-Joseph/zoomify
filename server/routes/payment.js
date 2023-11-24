import express from 'express';
import { paypalPay, paypalSuccess, razorpay, stripe } from '../controllers/payment.js';

const router = express.Router();

router.post('/razorpay/order', razorpay);
router.post('/stripe/order', stripe);
router.post('/paypal/order', paypalPay)
router.post('/paypal/success', paypalSuccess)

export default router