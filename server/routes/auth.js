import express from 'express'
import passport from 'passport'
import { signup, login, verifyOTP } from '../controllers/auth.js'
import { validateSignup, validateLogin } from '../controllers/auth.js'

const router = express.Router()

router.post('/signin', validateLogin, login)
router.post('/signup', validateSignup, signup)
router.post('/verifyOtp', verifyOTP)

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback')

export default router;