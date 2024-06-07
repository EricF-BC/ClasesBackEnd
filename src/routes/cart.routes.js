import { Router } from "express";
// import { __dirname } from "../path.js";
// import CartManager from "../manager/cart.manager.js";
import {
    getAllCarts,
    getCartByIdController,
    createCartController,
    addProductToCart,
    deleteCartController,
    deleteProductFromCartController,
    updateProdQuantityToCartController,
    clearProductsFromCartController
} from "../controllers/cart.controller.js";


const router = Router();

// const cartManager = new CartManager(`${__dirname}/db/cart.json`);


router.get('/', getAllCarts);

router.get('/:cid', getCartByIdController)

router.post('/:cid/product/:pid', addProductToCart);

router.post('/', createCartController);

router.put('/addProduct', getCartByIdController);

router.delete('/:cid', deleteCartController);

router.delete('/:cid/product/:pid', deleteProductFromCartController)

router.delete('/clear/:cid', clearProductsFromCartController)

router.put('/:cid/product/:pid', updateProdQuantityToCartController)



// router.post('/:cid/product/:pid', async (req, res) => {
//     try{
//         const {cid} = req.params;
//         const {pid} = req.params;
//         const response = await cartManager.saveProducttoCart(cid, pid);
//         res.json(response);
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
// });


// router.post('/', async (req, res) => {
//     try {
//         const response = await cartManager.createCart()
//         res.json(response);
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// })

// router.get('/:cid', async (req, res) => {
//     try{
//         const {cid} = req.params ;
//         console.log(cid);
//         res.json(await cartManager.getCartById(cid));
//     }catch (err) {
//         res.status(500).json({message: err.message});
//     }

// })


export default router;