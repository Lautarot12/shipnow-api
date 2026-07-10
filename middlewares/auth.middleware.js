import jwt from 'jsonwebtoken'
import config from '../config/env.config.js'

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
        return res.status(401).json({ message: 'No autorizado' })
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ meesage: 'Token invalido' })
    }
}

export const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acceso denegado' })
        }
        next()
    }
}

