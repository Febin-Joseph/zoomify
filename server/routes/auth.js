import express from 'express';
import { signup, login } from '../controllers/auth.js';
import { validateSignup, validateLogin } from '../controllers/auth.js';

const router = express.Router();

// Sign Up route
router.post('/signup', validateSignup, async (req, res) => {
  try {
    const userData = req.body;
    const response = await signup(userData);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Sign In route
router.post('/signin', validateLogin, async (req, res) => {
  try {
    const userData = req.body;
    const response = await login(userData);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;