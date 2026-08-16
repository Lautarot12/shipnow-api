import bcrypt from 'bcrypt'
import { createUser, getUserByEmail, getUserById } from '../repositories/auth.repository.js'
import CustomError from '../errors/CustomError.js'
import { ERROR_TYPES } from '../errors/error.dictionary.js'

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
