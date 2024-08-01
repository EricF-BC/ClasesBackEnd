import { Router } from "express";
import { checkAdmin } from "../middlewares/checkAdmin.js"
import { isAuthSession } from "../middlewares/isAuth.js";
import ProductController from "../controllers/product.controller.js";
const controller = new ProductController();

const router = Router();

router.get('/', controller.getAll);

router.get('/:id', controller.getProdById);

router.post('/', [ isAuthSession, checkAdmin ] , controller.createProd);

router.put('/:id', [ checkAdmin ] , controller.update);

router.delete('/:id', [ checkAdmin ] , controller.delete);


export default router;