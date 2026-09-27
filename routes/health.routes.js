import { Router } from "express"
import config from "../config/env.config.js"

const router = Router()

router.get('/', (req, res)=>{
    return res.status(200).json({
        status: 'ok',
        enviroment: config.nodeEnv,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
})

export default router