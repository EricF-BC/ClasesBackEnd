import { Router } from "express";
import { isAuthSession } from "../middlewares/isAuth.js";
import CartController from "../controllers/cart.controller.js";

const controller = new CartController();
const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById)

router.post('/product/:id', [ isAuthSession ] , controller.addProductToCart);

router.put('/addProduct', controller.getById);

router.delete('/:id/product/:pid', controller.deleteProductFromCartController)

router.delete('/clear/:id', controller.clearProductsFromCartController)

router.put('/:id/product/:id', controller.updateProdQuantityToCartController)


export default router;