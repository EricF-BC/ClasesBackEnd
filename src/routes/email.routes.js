import { Router } from 'express';
import { sendGmail, sendMailEthereal } from '../controllers/email.controller.js';

const router = Router();

router.post('/send', sendMailEthereal);
router.post('/send/gmail', sendGmail);

export default router;