import CustomError from "../errors/CustomError.js";
import { ERROR_TYPES } from "../errors/error.dictionary.js";


export const errorMiddleware = (error, req, res, next)=>{
    if (error instanceof CustomError) {
        return res.status(error.status).json({
            status: 'error',
            code: error.code,
            message: error.message
        })
    } 

    const databaseError = ERROR_TYPES.DATABASE_ERROR

        return res.status(databaseError.status).json({
            status: 'error',
            code: databaseError.code,
            message: databaseError.message
        })
    
}