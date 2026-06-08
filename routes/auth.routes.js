import { Router } from 'express'
import { admin, profile, register } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { protectRoutes, roleMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', protectRoutes, profile)
router.get('/admin', protectRoutes, roleMiddleware('admin'), admin)

export default router