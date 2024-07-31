import { Router } from "express";
import { loginController, registerController, logout , googleResponse, protectedSession, loginPostMan, profileController} from "../controllers/user.controller.js";
import passport from "passport"
// import { validateLogin } from "../middlewares/validateLogin.js"; 

const router = Router();

router.post('/login', passport.authenticate('login'), loginController);

router.post('/register', passport.authenticate('register'), registerController)

router.post('/logout', logout); 

router.get('/protected', protectedSession); 

router.post('/loginpost', loginPostMan);

router.get('/profile', profileController); 



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