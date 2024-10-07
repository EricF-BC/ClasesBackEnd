import { Router } from "express";
import { isAuthSession } from "../middlewares/isAuth.js";
import CartController from "../controllers/cart.controller.js";

const controller = new CartController();
const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getById)

router.post('/product/:id', [ isAuthSession ] ,controller.addProductToCart);

router.delete('/product/:pid', [ isAuthSession ] ,controller.deleteProductFromCartController)

router.delete('/clear/',[ isAuthSession ] ,controller.clearProductsFromCartController)

router.put('/product/:pid', [ isAuthSession ] ,controller.updateProdQuantityToCartController)

export default router;