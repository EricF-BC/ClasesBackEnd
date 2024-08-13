import { Router } from 'express';
import { logger } from '../utils/logger.js';

const router = Router();

router.get("/", (req, res) => {

    logger.debug("TEST DEBUG")
    logger.http("TEST HTTP")
    logger.info("TEST INFO")
    logger.warning("TEST WARNING")
    logger.error("TEST ERROR")
    logger.fatal("TEST FATAL")

    res.send("Ahi estan todos los test")
  });

export default router;