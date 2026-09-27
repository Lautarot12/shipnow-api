import bcrypt from 'bcrypt'
import { createUser, getUserByEmail, getUserById, addDocumentToUser } from '../repositories/auth.repository.js'
import CustomError from '../errors/CustomError.js'
import { ERROR_TYPES } from '../errors/error.dictionary.js'
import { DOCUMENT_TYPES } from '../constants/index.js'
import logger from '../config/logger.config.js'
import fs from 'fs/promises'

export const registerUser = async (userData)=>{
    const coincidence = await getUserByEmail(userData.email)

    if (coincidence) {
        throw new CustomError(ERROR_TYPES.DUPLICATE_USER)
    }

    const user = await createUser(userData)
    return user
}

export const loginUser = async (email, password)=>{
    const user = await getUserByEmail(email)

    if (!user) {
        throw new CustomError(ERROR_TYPES.USER_NOT_FOUND)
    }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw new CustomError(ERROR_TYPES.INVALID_CREDENTIALS)
    }
    
    return user
}

export const getUserProfile = async (id)=>{
    const user = await getUserById(id)
    if (!user) {
        throw new CustomError(ERROR_TYPES.USER_NOT_FOUND)
    }
    return user
}

export const addUserDocument = async (userId, file, documentType)=>{
    const user = await getUserById(userId)

    if (!user) {
        await fs.unlink(file.path)
        throw new CustomError(ERROR_TYPES.USER_NOT_FOUND)
    }

    if (!file) {
        throw new CustomError(ERROR_TYPES.MISSING_FILE)
    }

    if (!Object.values(DOCUMENT_TYPES).includes(documentType)) {
        await fs.unlink(file.path)
        throw new CustomError(ERROR_TYPES.INVALID_DOCUMENT_TYPE)
    }

    const documentData = {
        originalName: file.originalname,
        fileName: file.filename,
        path: file.path,
        mimeType: file.mimetype,
        size: file.size,
        type: documentType,
    }

    try {
        const updatedUser = await addDocumentToUser(userId, documentData)
    
        logger.info(`Carga de documento exitosa. ID: ${userId}, Nombre del archivo: ${documentData.originalName}, Tipo de documento: ${documentData.type}`)
    
        return updatedUser  
    } catch (error) {
        await fs.unlink(file.path)
        logger.error(`Error al guardar el archivo: ${error.message}`)
        throw new CustomError(ERROR_TYPES.FILE_SAVE_ERROR)
    }
}