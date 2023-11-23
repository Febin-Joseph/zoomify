import mongoose from "mongoose";

const socialSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        // required: [true, 'Email is required!'],
    },
    username: {
        type: String,
        // required: [true, 'Username is required!']
    },
    image: {
        type: String,
    },
    githubId: String,
    verified: {
        type: Boolean,
        default: false
    }
});

const Social = mongoose.model('Social', socialSchema);

export default Social;