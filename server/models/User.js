import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    profile: {
        type: String,
        default: 'https://o.remove.bg/downloads/7784919a-a713-469b-ac9b-5c2504bcd55d/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N-removebg-preview.png'
    },
    email: {
        type: String,
        unique: true,
        max: 50,
        validate: {
            validator: function (value) {
                if (this.githubId) {
                    return true;
                } else {
                    return value && value.length > 0;
                }
            }
        }
    },
    password: {
        type: String,
        validate: {
            validator: function (value) {
                if (this.githubId) {
                    return true;
                } else {
                    return value && value.length > 0;
                }
            }
        }
    },
    githubId: String,
    otp: String,
    otpExpiration: Date,
    otpUsed: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema);
export default User;