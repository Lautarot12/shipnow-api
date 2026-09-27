import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import { generateToken } from '../middlewares/auth.middleware.js'
import passport from "passport"
import config from "../config/env.config.js"
import { addUserDocument, getUserProfile, loginUser, registerUser } from "../services/auth.service.js"

export const register = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body
        await registerUser({
            first_name,
            last_name,
            email,
            password
        })

        return res.status(201).json({
            status: 'success',
            message: 'Usuario registrado con exito'
        })

    } catch (error) {
        next(error)
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await loginUser(email, password)
        const token = generateToken(user)
        res.cookie(
            'authToken',
            token,
            {
                httpOnly: true,
                sameSite: 'lax',
                secure: config.nodeEnv === 'production'
            }
        )
        return res.status(200).json({
            status: 'success', message: 'Login exitoso', token })
    } catch (error) {
        next(error)
    }
}

export const profile = async (req, res, next) => {
    try {
        const user = await getUserProfile(req.user.userId)
        
        return res.status(200).json({ status: 'success', message: 'Usuario', user: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            documents: user.documents
        }})
    } catch (error) {
        next(error)
    }
}

export const session = async (req, res, next) => {
    try {
        const user = await getUserProfile(req.user.userId)

        return res.status(200).json({ status: 'success', message: 'Usuario',
            authenticated: true,
            user: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            documents: user.documents
        }})
    } catch (error) {
        next(error)
    }
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
            secure: config.nodeEnv === 'production'
        }
    )
    return res.status(200).json({ message: 'Login exitoso', token })
}

export const uploadUserDocument = async (req, res, next)=>{
    try {
        const { uid } = req.params
        const { documentType } = req.body

        const user = await addUserDocument(uid, req.file, documentType)

        return res.status(200).json({
            status: 'success',
            message: 'Documento subido correctamente',
            user
        })

    } catch (error) {
        next(error)
    }
}