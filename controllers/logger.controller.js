import logger from "../config/logger.config.js";

export const testLogger = (req, res)=>{
    logger.debug('Debug test')
    logger.http('Http test')
    logger.info('Info test')
    logger.warning('Warning test')
    logger.error('Error test')
    logger.fatal('Fatal test')

    return res.status(200).json({
        status: 'success',
        message: 'Logger funcionando correctamente'
    })
}