import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/google/callback',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        failureRedirect: 'auth/v1/google/failed',
    }),
    (req, res) => {
        res.redirect('/auth/v1/google/success');
    }
)

router.get('/google/v1/success', (req, res) => {
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

router.get('/google/v1/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: "Failed to authenticate",
    })
})

router.get('/github/callback',
    passport.authenticate('github', {
        scope: ['profile'],
        failureRedirect: '/auth/v1/github/failed',
    }),
    (req, res) => {
        res.redirect('/auth/v1/github/success');
    }
);

router.get('/github/v1/success', (req, res) => {
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

router.get('/github/v1/failed', (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Failed to authenticate with GitHub',
    });
});

export default router;