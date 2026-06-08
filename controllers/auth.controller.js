import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateToken, protectRoutes } from '../middlewares/auth.middleware.js'

export const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    
    const coincidence = await User.findOne({ email })

    if (coincidence) {
        return res.status(409).json({ message: 'Error, ya existe un usuario con ese email' })
    }

    await User.create({
        first_name,
        last_name,
        email,
        password
    })

    res.status(201).json({ message: 'Usuario registrado con exito' })
}


export const login = async (req, res) => {
    const { email, password } = req.body
    const coincidence = await User.findOne({ email })
    if (!coincidence) {
        return res.status(404).json({ message: 'Error, este email no corresponde a un usuario registrado' })
    }
    const passwordCoincidence = await bcrypt.compare(password, coincidence.password)
    if (!passwordCoincidence) {
        return res.status(404).json({ message: 'Error, contrasena incorrecta' })
    }
    const token = generateToken(coincidence)
    res.cookie(
        'authToken',
        token,
        {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        }
    )
    return res.status(200).json({ message: 'Login exitoso', token })
}

export const profile = async (req, res) => {
    const userId = req.user.userId
    const userExists = await User.findById(userId)
    if (!userExists) {
        return res.status(404).json({ message: 'Error, no se encontro el perfil' })
    }
    
    return res.status(200).json({ message: 'Usuario', user: {
        first_name: userExists.first_name,
        last_name: userExists.last_name,
        email: userExists.email,
        role: userExists.role
    }})
}

export const admin = async (req, res) => {
    res.status(200).json({ message: 'Bienvenido admin' })
    }