import express from 'express'
import { signup, login, verifyOTP } from '../controllers/auth/auth.js'
import { validateSignup, validateLogin } from '../controllers/auth/auth.js'

const router = express.Router()

router.post('/signin', validateLogin, login)
router.post('/signup', validateSignup, signup)
router.post('/verifyOtp', verifyOTP)

export default router;