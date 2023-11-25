import * as dotenv from 'dotenv';
import Razorpay from 'razorpay'
import Stripe from 'stripe';
import paypal from 'paypal-rest-sdk'

//RAZORPAY
export const razorpay = async (req, res) => {
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    console.log("create orderId request", req.body);
    var options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options, function (err, order) {
        console.log(order);
        res.send({ orderId: order.id });
    });
}


//STRIPE
export const stripe = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: req.body.name,
                        },
                        unit_amount: req.body.amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://zoomify.vercel.app/plans',
            cancel_url: 'https://zoomify.vercel.app/plans',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//PAYPAL
export const paypalPay = async (req, res) => {
    paypal.configure({
        'mode': 'sandbox',
        'client_id': process.env.PAYPAL_KEY_ID,
        'client_secret': process.env.PAYPAL_SECRET_KEY,
    });

    const create_payment_json = {
        "intent": 'sale',
        "payer": {
            "payment_method": 'paypal',
        },
        "redirect_urls": {
            "return_url": 'https://zoomify-backend.onrender.com/create/paypal/success',
            "cancel_url": 'https://zoomify.vercel.app/plans',
        },
        "transactions": [
            {
                "item_list": {
                    "items": [
                        {
                            "name": req.body.name,
                            "sku": 'SKU',
                            "price": req.body.amount,
                            "currency": 'USD',
                            "quantity": 1,
                        },
                    ],
                },
                "amount": {
                    "currency": 'USD',
                    "total": req.body.amount,
                },
                "description": 'buy a subscription',
            },
        ],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            console.error('PayPal create payment error:', error.response || error.message);
            throw error;
        } else {
            console.log(payment);
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
};

export const paypalSuccess = (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.error(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Payment Success');
        }
    });
};