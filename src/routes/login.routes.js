import { Router } from "express";

const router = Router();

router.post('/', (req, res) => {
    const  { name, email} = req.body;
    res.cookie(name, email, { maxAge: 100000}).send('cookie agregada');
})

router.get('/get-cookie', (req, res) => {
    const usuario = req.cookies;
    console.log(usuario)
})  

export default router