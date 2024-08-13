import { Router } from "express";
import { logger } from '../utils/logger.js';

const router = Router();

router.post('/', (req, res) => {
    const  { name, email} = req.body;
    res.cookie(name, email, { maxAge: 100000}).send('cookie agregada');
})

router.get('/get-cookie', (req, res) => {
    const usuario = req.cookies;
    logger.info(usuario)
})  

export default router