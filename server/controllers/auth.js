import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import generateOTP from 'gen-otp';
import nodemailer from 'nodemailer'
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import Social from '../models/SocialAuth.js';

dotenv.config();

//VALIDATION FOR SIGN UP
export const validateSignup = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters'),
];


//USER SIGN UP
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {//PASSING THE VALUES FROM THE User.js
        const {
            email,
            password,
        } = req.body;//passed it to the req.body now it will be availbale in req.body

        const salt = await bcrypt.genSalt();//GENERATE RANDOM SALT
        const hashedPassword = await bcrypt.hash(password, salt)//HASHED THE PASSWORD

        //Generates OTP
        const genOTP = generateOTP({
            length: 4,
            digits: true,
            expiration: '3m',//OTP expires in 3 minutes
        })
        const otp = genOTP.otp.toString();
        const otpExpires = genOTP.expiresAt.toString();

        //Hash generated otp
        const saltOTP = await bcrypt.genSalt();
        const hashedOTP = await bcrypt.hash(otp, saltOTP)

        const newUser = new User({//CREATING A NEW USER FROM THE User.js 
            email,
            password: hashedPassword,//STORING THE PASSWORD AS HASHED PASSWORD IN THE DB
            otp: hashedOTP,
            otpExpiration: otpExpires,
        });
        const saveUser = await newUser.save();//SAVING IT TO THE DATABASE

        // Sending the OTP via email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for registration is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: 'Email could not be sent' });
            } else {
                res.status(201).json(saveUser);
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// OTP verification
export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.otpExpiration && user.otpExpiration < new Date()) {
            return res.status(400).json({ message: "OTP expired" })
        }

        if (user.otpUsed) {
            return res.status(400).json({ message: "OTP Already Used" })
        }

        const isOtp = await bcrypt.compare(otp, user.otp)
        if (!isOtp) return res.status(400).json({ message: 'Invalid OTP' });

        // Mark the user as verified
        user.verified = true;
        await user.save();

        //Mark OTP already used
        user.otpUsed = true;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

    if (User.otpUsed === true && User.verified === true) {
        try {
            const secretKey = process.env.JWT_KEY;
            const options = { expiresIn: '1h' }//EXPIRING TIME
            const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, options);//PASSING JWT TO THE USER'S ID
            delete user.password;//DELETING THE PASSWORD FOR NOT GETTING IT IN THE FRONT END
            res.status(200).json({ token, user })//PASSING USER AND TOKEN AS THE RESPONSE

        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
};


//VALIDATION FOR SIGN IN
export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];


//USER SIGN IN
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;//DESTRUCTURING EMAIL AND PASSWORD AND PASSING IT TO THE REQ BODY
        const user = await User.findOne({ email: email })//PASSING THE user VARIALBLE A VALUE FROM THE DB BY findOne() AND TAKING THE USERS EMAIL FROM DB 
        if (!user) return res.status(400).json({ message: "user not found" })//IF NOT USER IS AVAILABLE WITH THAT EMAIL

        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) return res.status(400).json({ message: "password is incorrect" })

        //JWT
        const secretKey = process.env.JWT_KEY;
        const options = { expiresIn: '1h' }//EXPIRING TIME
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, options);//PASSING JWT TO THE USER'S ID
        delete user.password;//DELETING THE PASSWORD FOR NOT GETTING IT IN THE FRONT END
        res.status(200).json({ token, user })//PASSING USER AND TOKEN AS THE RESPONSE

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://zoomify.vercel.app/home',
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await Social.findOne({ email: profile.emails[0].value })

                if (existingUser) {
                    return done(null, existingUser);
                } else {
                    const newUser = new Social({
                        id: profile.id,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value,
                        verified: true
                    });

                    const saveUser = await newUser.save();
                    return done(null, saveUser);
                }
            } catch (error) {
                console.error('Google OAuth Error:', error);
                return done(error, false);
            }
        }
    )
);

passport.use(
    new GithubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'https://zoomify-backend.onrender.com/auth/github/callback',
    },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            try {
                const existingUser = await Social.findOne({ githubId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                } else {
                    const newUser = new Social({
                        email: profile._json.email,
                        image: profile.photos[0].value,
                        githubId: profile.id,
                    });

                    const saveUser = await newUser.save();
                    return done(null, saveUser);
                }
            } catch (error) {
                console.error('GitHub OAuth Error:', error);
                return done(error, false);
            }
        }
    )
);


//FOR USING COOKIE SESSION
passport.serializeUser((user, done) => {
    return done(null, user.id)
})

passport.deserializeUser((id, done) => {
    Social.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});