import { HttpResponse } from "../utils/http.response.js";
import { logger } from '../utils/logger.js';
const httpResponse = new HttpResponse();


export const errorHandler = (error, req, res, next) => {
    logger.error(`error ${error}`)
    const status = error.status || 500
    return httpResponse.ServerError(res, error.message)
}