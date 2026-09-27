import CustomError from "../errors/CustomError.js";
import multer from "multer";
import logger from "../config/logger.config.js";
import { ERROR_TYPES } from "../errors/error.dictionary.js";


export const errorMiddleware = (error, req, res, next)=>{
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            const customError = new CustomError(ERROR_TYPES.FILE_TOO_LARGE)
            return res.status(customError.status).json({
            status: 'error',
            code: customError.code,
            message: customError.message
        })
        }

        if (error.code === 'LIMIT_UNEXPECTED_FILE') {
            const customError = new CustomError(ERROR_TYPES.UNEXPECTED_FILE)
            return res.status(customError.status).json({
            status: 'error',
            code: customError.code,
            message: customError.message
        })
        }
    }
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