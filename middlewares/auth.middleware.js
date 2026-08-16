import jwt from 'jsonwebtoken'
import config from '../config/env.config.js'
import CustomError from '../errors/CustomError.js'
import { ERROR_TYPES } from '../errors/error.dictionary.js'

export const generateToken = (user)=> {
    return jwt.sign(
        { userId: user.id, role: user.role },
        config.jwtSecret,
        { expiresIn: '1h' } 
    )
}

export const protectRoutes = (req, res, next) => {
    const token = req.cookies.authToken
    if(!token) {
        return next(new CustomError(ERROR_TYPES.UNAUTHORIZED))
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        req.user = decoded
        next()
    } catch (error) {
        return next(new CustomError(ERROR_TYPES.INVALID_TOKEN))
    }
}

export const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)) {
            return next(new CustomError(ERROR_TYPES.FORBIDDEN))
        }
        next()
    }
}

