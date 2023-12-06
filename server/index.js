import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js'
import plansRoutes from './routes/plans.js'
import profileRoutes from './routes/profile.js'
import tokenRoutes from './routes/token.js'
import meetingRoutes from "./routes/meeting.js"
import paymentRoutes from "./routes/payment.js"
import passport from 'passport';
import cookieSession from 'cookie-session';
import { Server } from 'socket.io';
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
app.use(
    cookieSession({
        name: "session",
        keys: [process.env.COOKIE_KEY],
        maxAge: 24 * 60 * 60 * 100,  //24 hours
    })
)
app.use(cors({
    origin: ['https://zoomify.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// app.options('*', cors());

//Routes
app.use('/auth', authRoutes)
app.use('/api/plans', plansRoutes)
app.use('/profile', profileRoutes)
app.use('/agora', tokenRoutes)
app.use('/meeting', meetingRoutes)
app.use('/create', paymentRoutes)

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

io.on('connection', (socket) => {
    socket.on('join-room', ({ roomId }) => {
        socket.join(roomId);
        // console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('chat:message', (data) => {
        const { message, roomId } = data;
        // console.log(`Received message for room ${roomId} from user ${socket.id}:`, message);
        io.to(roomId).emit('chat:message', { message, roomId });
    });

    socket.on('join-meeting', ({ name, roomId }) => {
        let users = [];

        const newUser = {
            id: socket.id,
            name: name,
        }
        // console.log(`User ${socket.id} and name${name}`);

        users.push(newUser);
        io.to(roomId).emit('join-meeting', users);
        // console.log(`User ${socket.id} room id ${roomId} and name ${name}`);
    })
});