import { Router } from "express";
// import ProductManager from "../manager/ProductManager.js";
// import { __dirname } from "../path.js";
// import { productValidator } from "../middlewares/productValidator.js";
import {
    getAllProducts,
    getProductByIdController,
    createProductController,
    updateProductController,
    deleteProductController
} from "../controllers/product.controller.js";

const router = Router();
// const productManager = new ProductManager(`${__dirname}/db/products.json`);

router.get('/', getAllProducts);

router.get('/:pid', getProductByIdController);

router.post('/', createProductController);

router.put('/:pid', updateProductController);

router.delete('/:pid', deleteProductController);


// router.get('/', async(req, res) =>{
//     try{
//         const { limit } = req.query
//         const products = await productManager.getProducts();

//         if(limit){
//             const limitProducts = products.slice(0, parseInt(limit));
//             res.status(200).json(limitProducts)
//         }else{
//             res.status(200).json(products)
//         }
//     } catch(err){
//         res.status(500).json({message: err.message});
//     }
// });


// router.get('/:pid', async(req, res) =>{
//     try{
//         const {pid} = req.params;
//         const product = await productManager.getProductById(pid);
//         if(!product) res.status(404).json({message: "Product not found"})
//         else res.status(200).json(product) 


//     }catch(err){
//         res.status(500).json({message: err.message});
//     }

// });

// router.get('/:limit5', async(req, res) =>{
//     try{
//         const {pid} = req.params;
//         const product = await productManager.getProductById(pid);
//         if(!product) res.status(404).json({message: "Product not found"})
//         else res.status(200).json(product) 


//     }catch(err){
//         res.status(500).json({message: err.message});
//     }

// });

// router.post('/',productValidator ,async(req, res) =>{
//     try{
//         const newProduct = await productManager.createProduct(req.body);
//         if(!newProduct) res.status(404).json({message: "Error creating product"});
//         else res.status(200).json(newProduct) ;
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
// })


// router.put("/:pid", async(req, res) =>{
//     try{
//         const { pid } = req.params;
//         const productUpd = await productManager.updateProduct(req.body, pid);
//         if(!productUpd) res.status(404).json({message: "Error updating product"});
//         else res.status(200).json(productUpd) ;
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
    
// });


// router.delete('/:pid', async(req, res) =>{
//     try{
//         const {pid} = req.params;
//         const delProduct = await productManager.deleteProduct(pid);
//         if(!delProduct) res.status(404).json({message: "error delete product"});
//         else res.status(200).json({msg: "Usuario eliminado correctamente"}) 
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
    
// });

export default router;