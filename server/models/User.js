import mongoose from 'mongoose'

const User = new mongoose.Schema({
    profile: { type: String, required: true },
})

const UserSchema = mongoose.model('User', User);

export default UserSchema;