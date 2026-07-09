import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import { generateToken } from '../middlewares/auth.middleware.js'
import passport from "passport"

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
        return res.status(401).json({ message: 'Error, credenciales inválidas' })
    }
    const passwordCoincidence = await bcrypt.compare(password, coincidence.password)
    if (!passwordCoincidence) {
        return res.status(401).json({ message: 'Error, credenciales inválidas' })
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

export const session = async (req, res) => {
    const userId = req.user.userId
    const userExists = await User.findById(userId)
    if (!userExists) {
        return res.status(404).json({ message: 'Error, no se encontro el perfil' })
    }
    
    return res.status(200).json({ message: 'Usuario',
        authenticated: true,
        user: {
        first_name: userExists.first_name,
        last_name: userExists.last_name,
        email: userExists.email,
        role: userExists.role
    }})
}

export const admin = async (req, res) => {
    res.status(200).json({ message: 'Bienvenido admin' })
}

export const logout = async (req, res) => {
    res.clearCookie('authToken')
    res.status(200).json({ message: 'Logout completo' })
}

export const githubCallback = async (req, res) => {
    const token = generateToken(req.user)
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