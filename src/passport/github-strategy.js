import * as services from '../services/user.services.js'
import { Strategy as GithubStrategy } from "passport-github2";
import passport from 'passport';
import 'dotenv/config';

const strategyConfig = {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT,
    callbackURL: process.env.CALLBACK_URL
};

const registerOrLogin = async(accessToken, refreshToken, profile, done) => {
    try {
        const email = profile._json.email ?? '';
        const first_name = profile._json.name ?? '';
        const user = await services.getUserByEmail(email);
        if(user) return done(null,user);
        const newUser = await services.register({
            first_name,
            email,
            password: ' ',
            isGithub: true
        })
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
}

passport.use('github', new GithubStrategy(strategyConfig, registerOrLogin));

passport.serializeUser((user, done) => {
    done(null, { id: user._id, email: user.email });
});

passport.deserializeUser(async (userObj, done) => {
    try {
        const user = await services.getUserById(userObj.id);
        if (user) {
            user.email = userObj.email; // Añadir el correo electrónico al objeto del usuario
        }
        return done(null, user);
    } catch (error) {
        done(error);
    }
});
