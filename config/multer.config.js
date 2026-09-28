import multer from "multer"
import path from 'path'
import __dirname from "../utils.js"
import CustomError from "../errors/CustomError.js"
import { ERROR_TYPES } from "../errors/error.dictionary.js"
import logger from "./logger.config.js"

const allowedMimeTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png'
]

const createStorage = (folder) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads', folder))
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, uniqueName)
    }
})

const createUpload = (folder) => multer({
    storage: createStorage(folder),
    fileFilter: (req, file, cb) => {
        if (!allowedMimeTypes.includes(file.mimetype)) {
            logger.warning(
                `Tipo de archivo invalido, MIME type recibido: ${file.mimetype}, Nombre del archivo: ${file.originalname}`
            )
            return cb(new CustomError(ERROR_TYPES.INVALID_FILE_TYPE), false)
        }

        cb(null, true)
    },
    limits: {
        fileSize: 5242880
    }
})

const userUpload = createUpload('users')
const shipmentUpload = createUpload('shipments')

export { shipmentUpload }
export default userUpload