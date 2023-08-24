import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import authRoutes from './routes/auth.js'


//Middlewares
const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


//Routes
app.use('/auth', authRoutes)


//MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MONGO DB connected')
}).catch((err) => console.log(`cant connect because of this error  ${err}`));


// PORT CONNECTION
const PORT = 4000;
app.listen(PORT, () => console.log(`server started on port : ${PORT}`));
