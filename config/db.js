import mongoose from "mongoose";
import config from "./env.config.js";

const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(config.mongoUri)
        console.log('Conectado con MongoDB')
    } catch (error) {
        console.log('error al connectar con MongoDB')
    }
}

export default connectMongoDB