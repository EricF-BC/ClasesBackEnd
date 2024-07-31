import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';
import { isAuthSession } from '../middlewares/isAuth.js';
const controller = new TicketController();

const router = Router();

router.post('/purchase', [ isAuthSession ], controller.generateTicket)

export default router;