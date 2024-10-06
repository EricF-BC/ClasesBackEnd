import { Router } from "express";
import { isAuthSession } from "../middlewares/isAuth.js";
import UserController from '../controllers/user.controller.js';
import { checkAdmin } from "../middlewares/checkAdmin.js"
// import {
//         googleResponse
//         } from "../controllers/user.controller.js";
// import passport from "passport"


const controller = new UserController();
const router = Router();

router.post('/registerpost', controller.registerPostman)

router.get('/protected', [isAuthSession] ,controller.protectedSession); 

router.post('/loginpost', controller.loginPostMan);

router.get('/profile', [isAuthSession] ,controller.profileController);

router.post('/premium/:uid', controller.updatePremiumController);

router.post('/logout', [isAuthSession] ,controller.logout); 

router.post('/reset-pass', [isAuthSession] ,controller.generateResetPass)

router.get('/', [checkAdmin] ,controller.getAllUsersDto);

router.delete('/', [checkAdmin] ,controller.deleteInactiveUsers);

router.put('/newpass', [isAuthSession] ,controller.updatePass)



// ESTAS RUTAS SON PARA LAS VISTAS, PUEDE REVISARLAS SI QUIERE.
//router.post('/login', passport.authenticate('login'), loginController);
// router.post('/register', passport.authenticate('register'), registerController)

////// REGISTRO Y LOGIN CON GITHUB Y GOOGLE /////////////

// router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));

// router.get('/profile', passport.authenticate('github', {
//     failureRedirect: '/views/login',
//     successRedirect: '/views/products',
//     passReqToCallback: true
// }));

// router.get('/oauth2/redirect/accounts.google.com', passport.authenticate('google', { assignProperty: 'user' }), googleResponse)

// router.get('/profile', passport.authenticate('google', {
//     failureRedirect: '/views/login',
//     successRedirect: '/views/products',
//     passReqToCallback: true
// }));


export default router;