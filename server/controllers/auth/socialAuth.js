import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GithubStrategy } from 'passport-github2';
import passport from 'passport';
import Social from '../../models/SocialAuth.js';
import * as dotenv from 'dotenv';

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'https://zoomify.vercel.app/home',
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await Social.findOne({ email: profile.emails[0].value })

                if (existingUser) {
                    return done(null, existingUser);
                } else {
                    const newUser = new Social({
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
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});