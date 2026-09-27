import multer from "multer"
import path from 'path'
import __dirname from "../utils.js"
import CustomError from "../errors/CustomError.js"
import { ERROR_TYPES } from "../errors/error.dictionary.js"
import logger from "./logger.config.js"

const uploadsRoute = path.join(__dirname, 'uploads', 'users')

const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png'
]

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, uploadsRoute)
    },
    filename: (req, file, cb) =>{
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb)=>{
        if (!allowedMimeTypes.includes(file.mimetype)) {
            logger.warning(`Tipo de archivo invalido, MIME type recibido: ${file.mimetype}, Nombre del archivo: ${file.originalname}`)
            return cb(new CustomError(ERROR_TYPES.INVALID_FILE_TYPE), false)
        } 
        
        cb(null, true)
    },
    limits: {
        fileSize: 5242880
    }
})

export default upload