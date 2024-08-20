import { Router } from "express";
import { checkAdmin, checkAdminPremium } from "../middlewares/checkAdmin.js"
import { isAuthSession } from "../middlewares/isAuth.js";
import ProductController from "../controllers/product.controller.js";
const controller = new ProductController();

const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getProdById);

router.post('/', [ isAuthSession, checkAdminPremium ] , controller.createProd);

router.post('/createmock', [ isAuthSession, checkAdmin ], controller.createProductMock);

router.put('/:id', [ checkAdminPremium ] , controller.update);

router.delete('/:id', [ checkAdminPremium ] , controller.deleteProductC);


export default router;