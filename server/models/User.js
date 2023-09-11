import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
    },
    otp: String,
    otpExpiration: Date,
    verified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);
export default User;