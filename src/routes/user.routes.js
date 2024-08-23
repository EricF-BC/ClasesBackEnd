import { Router } from "express";
import { loginController,
        registerController,
        logout,
        googleResponse, 
        protectedSession, 
        loginPostMan, 
        profileController,
        updatePremiumController,
        registerPostman
        } from "../controllers/user.controller.js";
import passport from "passport"
import { isAuthSession } from "../middlewares/isAuth.js";
import UserController from '../controllers/user.controller.js';

const controller = new UserController();

const router = Router();

//router.post('/login', passport.authenticate('login'), loginController);

router.post('/register', passport.authenticate('register'), registerController)

router.post('/registerpost', registerPostman)

router.post('/logout', logout); 

router.get('/protected', protectedSession); 

router.post('/loginpost', loginPostMan);

router.get('/profile', profileController);

router.post('/premium/:uid', updatePremiumController);

router.post('/reset-pass', [isAuthSession] ,controller.generateResetPass)

router.put('/newpass', [isAuthSession] ,controller.updatePass)

////// REGISTRO Y LOGIN CON GITHUB Y GOOGLE /////////////
router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/profile', passport.authenticate('github', {
    failureRedirect: '/views/login',
    successRedirect: '/views/products',
    passReqToCallback: true
}));

router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), googleResponse)

router.get('/profile', passport.authenticate('google', {
    failureRedirect: '/views/login',
    successRedirect: '/views/products',
    passReqToCallback: true
}));


export default router;