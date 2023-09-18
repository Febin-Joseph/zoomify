import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import authRoutes from './routes/auth.js'
import { Server } from 'socket.io';

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
    origin: ['https://zoomify.vercel.app', 'https://zoomify.pages.dev', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


//Routes
app.use('/auth', authRoutes)


//MONGODB CONNECTION
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MONGO DB connected')
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

io.on('connection', socket => {
    socket.on('room:join', (data) => {
        const { email, room } = data
        emailToSocketIdMap.set(email, socket.id);
        socketIdToEmailMap.set(socket.id, email);
        io.to(room).emit('user:joined', { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit('room:join', data);
    })

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