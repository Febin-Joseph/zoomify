import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js'
import plansRoutes from './routes/plans.js'
import { Server } from 'socket.io';
import Razorpay from 'razorpay'
import Stripe from 'stripe';
// import insertPlans from './db-data/plansData.js';

//RATELIMIT
const limiter = rateLimit({//It is used to prevent attacks and abuse
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});


//Middlewares
const app = express();
app.use(express.json());
app.use(limiter)
dotenv.config();
app.use(cors({
    origin: ['https://zoomify.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


//Routes
app.use('/auth', authRoutes)
app.use('/api/plans', plansRoutes)


//RAZORPAY
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.post('/create/razorpay/order', (req, res) => {
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
})

//STRIPE
const stripe = new Stripe('sk_test_51NvLbKSGqQ3kGNrgatSuqppiT0d7d2TwoXzYSD2oe45kvPvfxjPJd51RzHGxJe6QvfQtiomU80HbYExpBOXX0a0V00EiiubPUn', {
  });

app.post('/create/stripe/order', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'INR',
                        product_data: {
                            name: 'Product Name',
                        },
                        unit_amount: req.body.amount,
                    },
                    quantity: 1, // Quantity of the product
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
})


//MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('MONGO DB connected')
    // const db = mongoose.connection;
    // await insertPlans(db);
}).catch((err) => console.log(`cant connect because of this error  ${err}`));


// PORT CONNECTION
const PORT = 4000;
const server = app.listen(PORT, () => console.log(`server started on port : ${PORT}`));


//SOCKET CONNECTION
const io = new Server(server, {
    cors: true,
});

const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();

io.on('connection', (socket) => {
    socket.on('room:join', (data) => {
        const { email, room } = data
        emailToSocketIdMap.set(email, socket.id);
        socketIdToEmailMap.set(socket.id, email);
        io.to(room).emit('user:joined', { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit('room:join', data);
    })

    socket.on('chat:message', (data) => {
        const { message, room } = data;
        // Broadcast the chat message to all users in the room
        io.to(room).emit('chat:message', { message });
    });

    socket.on('user:call', ({ to, offer }) => {
        io.to(to).emit('incomming:call', { from: socket.id, offer })
    })

    socket.on('call:accepted', ({ to, ans }) => {
        io.to(to).emit('call:accepted', { from: socket.id, ans })
    })
    socket.on('peer:nego:needed', ({ to, offer }) => {
        io.to(to).emit('peer:nego:needed', { from: socket.id, offer })
    })

    socket.on('peer:nego:done', ({ to, ans }) => {
        io.to(to).emit('peer:nego:final', { from: socket.id, ans })
    })
});