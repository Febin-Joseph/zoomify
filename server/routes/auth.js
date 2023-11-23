import express from 'express'
import passport from 'passport';
import { signup, login, verifyOTP } from '../controllers/auth.js'
import { validateSignup, validateLogin } from '../controllers/auth.js'

const router = express.Router()

router.post('/signin', validateLogin, login)
router.post('/signup', validateSignup, signup)
router.post('/verifyOtp', verifyOTP)

router.get('/google/callback',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        failureRedirect: '/auth/google/failed',
    }),
    (req, res) => {
        res.redirect('/auth/google/success');
    }
)

router.get('/google/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "successfully Logged In"
        })
    } else {
        res.status(403).json({
            error: true,
            message: "User not found",
        })
    }
})

router.get('/google/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: "Failed to authenticate",
    })
})

router.get('/github/callback',
    passport.authenticate('github', {
        scope: ['profile'],
        failureRedirect: '/auth/github/failed',
    }),
    (req, res) => {
        res.redirect('/auth/github/success');
    }
);

router.get('/github/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: 'Successfully Logged In with GitHub',
        });
    } else {
        res.status(403).json({
            error: true,
            message: 'User not found',
        });
    }
});

router.get('/github/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Failed to authenticate with GitHub',
    });
});

export default router;