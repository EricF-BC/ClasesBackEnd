import { Router } from "express";
import productRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import loginRouter from "./login.routes.js";
import viewsRouter from "./views.routes.js";
import userRouter from "./user.routes.js";
import sessionRouter from "./session.routes.js";

const router = Router();

router.use("/carts", cartRouter);
router.use("/products", productRouter);
router.use('/login', loginRouter);
router.use('/views', viewsRouter);
router.use('/users', userRouter)
router.use("/api/sessions", sessionRouter);


export default router;