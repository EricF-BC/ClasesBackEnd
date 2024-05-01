import express from 'express';
import  ProductManager from './manager/ProductManager.js';

const productManager = new ProductManager('./products.json');
const app = express();


app.get('/products', async(req, res) =>{

    try{
        
        const { limit } = req.query
        const products = await productManager.getProducts();

        if(limit){
            const limitProducts = products.slice(0, parseInt(limit));
            res.status(200).json(limitProducts)
        }else{
            res.status(200).json(products)
        }


    } catch(err){
        res.status(500).json({message: err.message});
    }
})


app.get('/products/:pid', async(req, res) =>{
    try{
        const {pid} = req.params;
        const product = await productManager.getProductById(pid);
        if(!product) res.status(404).json({message: "Product not found"})
        else res.status(200).json(product) 


    }catch(err){
        res.status(500).json({message: err.message});
    }

})

app.get('/products/:limit5', async(req, res) =>{
    try{
        const {pid} = req.params;
        const product = await productManager.getProductById(pid);
        if(!product) res.status(404).json({message: "Product not found"})
        else res.status(200).json(product) 


    }catch(err){
        res.status(500).json({message: err.message});
    }

})

const PORT = 8080



app.listen(PORT, ()=>console.log(`Server ok en puerto ${PORT}`));