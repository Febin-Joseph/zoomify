import express from 'express'
import { signup, login } from '../controllers/auth.js'
import { validateSignup, validateLogin } from '../controllers/auth.js'

const router = express.Router()

router.post('/signin', validateLogin, login)
router.post('/signup', validateSignup, signup)
router.post('/verifyOtp')

export default router;