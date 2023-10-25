import express from 'express';
import { paypalPay, razorpay, stripe } from '../controllers/payment.js';

const router = express.Router();

router.post('/razorpay/order', razorpay);
router.post('/stripe/order', stripe);
router.post('/paypal/order', paypalPay)

export default router