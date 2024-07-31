import { Router } from 'express';
import {
    getAllProductsViews
} from "../controllers/product.controller.js";

const router = Router();

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/profile', (req, res) => {
    res.render('profile')
})

router.get('/products', async (req, res) => {
    const products = await getAllProductsViews()
    const data =  {
        "email" : req.session.email,
        "role" : req.session.role,
        products
    }
    res.render('products', data)
})

export default router