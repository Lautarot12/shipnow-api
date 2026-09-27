import mongoose from "mongoose";
import config from "./env.config.js";
import logger from "./logger.config.js";

const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(config.mongoUri)
        logger.info('Conectado con MongoDB')
    } catch (error) {
        logger.fatal(`Error al connectar con MongoDB: ${error.message}`)
        throw error
    }
}

export default connectMongoDB