import { Router } from 'express'
import { admin, githubCallback, logout, profile, register, session } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { protectRoutes, roleMiddleware } from '../middlewares/auth.middleware.js'
import passport from 'passport'
import { USER_ROLES } from '../constants/index.js'

const router = Router()

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Registrar un nuevo usuario
 *     description: Crea un nuevo usuario mediante autenticación local.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       409:
 *         description: Ya existe un usuario con ese email.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', register)
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Iniciar sesión
 *     description: Autentica un usuario mediante email y contraseña y genera un JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *           example:
 *             email: usuario@email.com
 *             password: password123
 *     responses:
 *       200:
 *         description: Login exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/login', login)
/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Cerrar sesión
 *     description: Elimina la cookie de autenticación del usuario.
 *     responses:
 *       200:
 *         description: Logout realizado correctamente.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/logout', logout)
/**
 * @swagger
 * /api/v1/auth/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener perfil del usuario autenticado
 *     description: Devuelve la información del usuario correspondiente al JWT almacenado en la cookie.
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       401:
 *         description: Usuario no autenticado o token inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/profile', protectRoutes, profile)
/**
 * @swagger
 * /api/v1/auth/session:
 *   get:
 *     summary: Validar sesión del usuario
 *     description: Verifica si el usuario está autenticado mediante su JWT.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Sesión válida
 *       401:
 *         description: Usuario no autenticado o token inválido
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/session', protectRoutes, session)
/**
 * @swagger
 * /api/v1/auth/admin:
 *   get:
 *     summary: Acceder al área de administración
 *     description: Permite acceder al endpoint únicamente a usuarios autenticados con rol de administrador.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Acceso autorizado
 *       401:
 *         description: Usuario no autenticado o token inválido
 *       403:
 *         description: El usuario no tiene permisos de administrador
 */
router.get('/admin', protectRoutes, roleMiddleware(USER_ROLES.ADMIN), admin)
/**
 * @swagger
 * /api/v1/auth/github:
 *   get:
 *     summary: Iniciar autenticación con GitHub
 *     description: Redirige al usuario hacia GitHub para iniciar el proceso de autenticación OAuth.
 *     tags:
 *       - Users
 *     responses:
 *       302:
 *         description: Redirección hacia GitHub para autenticación
 */
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
/**
 * @swagger
 * /api/v1/auth/github/callback:
 *   get:
 *     summary: Callback de autenticación con GitHub
 *     description: Recibe la respuesta de GitHub, autentica al usuario y genera un JWT.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       401:
 *         description: Error durante la autenticación con GitHub
 *       500:
 *         description: Error interno del servidor
 */
router.get('/github/callback', passport.authenticate('github', { session: false }), githubCallback)

export default router