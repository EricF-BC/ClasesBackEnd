import { createResponse } from "../path.js";
import { logger } from '../utils/logger.js';

export const checkAdmin = async (req, res, next) => {
    try {
        const { role } = req.session;
        if (role !== "admin") createResponse(res, 401, "Este endpoint es para los usuarios administradores")
        else next();
    } catch (error) {
        logger.error(error);
    }
}

export const checkAdminPremium = async (req, res, next) => {
    try {
        const { role } = req.session;
        if (role !== "admin" && role !== 'premium') createResponse(res, 401, "Este endpoint es para los usuarios administradores o Premiums")
        else next();
    } catch (error) {
        logger.error(error);
    }
}
 