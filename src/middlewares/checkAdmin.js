import { createResponse } from "../path.js";

export const checkAdmin = async (req, res, next) => {
    try {
        const { role } = req.session;
        if (role !== "admin") createResponse(res, 401, "Este endpoint es para los usuarios administradores")
        else next();
    } catch (error) {
        console.log(error);
    }
}
 