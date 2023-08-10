import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect("mongodb+srv://febinachu123:8CPFknul2o7nB5Ba@cluster0.8k0aahc.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MONGO DB connected')
}).catch((err) => console.log(`cant connect because of this error  ${err}`));

// PORT CONNECTION
const PORT = 3000;
app.listen(PORT, () => console.log(`server started on port : ${PORT}`));
