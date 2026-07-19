import { Router } from 'express'
import { admin, githubCallback, logout, profile, register, session } from '../controllers/auth.controller.js'
import { login } from '../controllers/auth.controller.js'
import { protectRoutes, roleMiddleware } from '../middlewares/auth.middleware.js'
import passport from 'passport'
import { USER_ROLES } from '../constants/index.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', protectRoutes, profile)
router.get('/session', protectRoutes, session)
router.get('/admin', protectRoutes, roleMiddleware(USER_ROLES.ADMIN), admin)
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/github/callback', passport.authenticate('github', { session: false }), githubCallback)

export default router