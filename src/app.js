import express from 'express';
import  ProductManager from './manager/ProductManager.js';

const productManager = new ProductManager('./products.json');
const app = express();

app.use(express.json());


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
});


app.get('/products/:pid', async(req, res) =>{
    try{
        const {pid} = req.params;
        const product = await productManager.getProductById(pid);
        if(!product) res.status(404).json({message: "Product not found"})
        else res.status(200).json(product) 


    }catch(err){
        res.status(500).json({message: err.message});
    }

});

app.get('/products/:limit5', async(req, res) =>{
    try{
        const {pid} = req.params;
        const product = await productManager.getProductById(pid);
        if(!product) res.status(404).json({message: "Product not found"})
        else res.status(200).json(product) 


    }catch(err){
        res.status(500).json({message: err.message});
    }

});

app.post('/products/', async(req, res) =>{
    try{
        const newProduct = await productManager.createProduct(req.body);
        if(!newProduct) res.status(404).json({message: "Error creating product"});
        else res.status(200).json(newProduct) ;
    }catch(err){
        res.status(500).json({message: err.message});
    }
})


app.put("/products/:pid", async(req, res) =>{
    try{
        const { pid } = req.params;
        const productUpd = await productManager.updateProduct(req.body, pid);
        if(!productUpd) res.status(404).json({message: "Error updating product"});
        else res.status(200).json(productUpd) ;
    }catch(err){
        res.status(500).json({message: err.message});
    }
    
});


app.delete('/products/:pid', async(req, res) =>{
    try{
        const {pid} = req.params;
        const delProduct = await productManager.deleteProduct(pid);
        if(!delProduct) res.status(404).json({message: "error delete product"});
        else res.status(200).json({msg: "Usuario eliminado correctamente"}) 
    }catch(err){
        res.status(500).json({message: err.message});
    }
    
});




const PORT = 8080



app.listen(PORT, ()=>console.log(`Server ok en puerto ${PORT}`));