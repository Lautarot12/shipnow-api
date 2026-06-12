import { Router } from 'express'
import { admin, logout, profile, register, session } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { protectRoutes, roleMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', protectRoutes, profile)
router.get('/session', protectRoutes, session)
router.get('/admin', protectRoutes, roleMiddleware('admin'), admin)

export default router