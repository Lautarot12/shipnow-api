import CustomError from "../errors/CustomError.js";
import { ERROR_TYPES } from "../errors/error.dictionary.js";
import logger from "../config/logger.config.js";

export const errorMiddleware = (error, req, res, next)=>{
    if (error instanceof CustomError) {
        logger.warning(error.message)
        return res.status(error.status).json({
            status: 'error',
            code: error.code,
            message: error.message
        })
    }

    logger.error(error.stack || error.message)

    return res.status(500).json({
        status: 'error',
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Error interno del servidor'
    })
}