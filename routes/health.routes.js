import { Router } from "express"
import config from "../config/env.config.js"

const router = Router()

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verificar estado de la API
 *     description: Devuelve información básica y no sensible sobre el estado de la API.
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API funcionando correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 environment:
 *                   type: string
 *                   example: development
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-09-28T12:00:00.000Z
 */
router.get('/', (req, res)=>{
    return res.status(200).json({
        status: 'ok',
        enviroment: config.nodeEnv,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
})

export default router