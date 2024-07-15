import { Router } from "express";

const router = Router();
import { loginController, registerController, logout , googleResponse} from "../controllers/user.controller.js";
// import { validateLogin } from "../middlewares/validateLogin.js"; 
import passport from "passport"
import { isAuth } from "../middlewares/isAuth.js";

router.post('/login', passport.authenticate('login'), loginController);
router.post('/register', passport.authenticate('register'), registerController)
router.post('/logout', logout); 

router.get('/private', isAuth , (req, res) => res.json({ msg: "Ruta Privada"}))

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

// router.get('/:email',(req, res) => {
//     const emailRegex = /\S+@\S+\.\S+/
//     const { email } = req.params;
//     console.log(email)
//     if (email.match(emailRegex)){
//         res.send('Email Valido')
//     }else{
//         res.status(404).send('Email Invalido')
//     }
// })



// router.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) res.send(err);
//         res.redirect('/login'); 
//       });
// });

export default router;