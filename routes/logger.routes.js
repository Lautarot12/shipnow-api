import { Router } from "express";
import { testLogger } from "../controllers/logger.controller.js";

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Logger
 *   description: Herramientas de prueba y validación del sistema de logging
 */

/**
 * @swagger
 * /api/v1/logger/test:
 *   get:
 *     summary: Probar el sistema de logging
 *     description: Genera registros en los distintos niveles del logger para validar su configuración. Este endpoint es una herramienta interna de prueba y no representa una funcionalidad de negocio.
 *     tags: [Logger]
 *     responses:
 *       200:
 *         description: Logs de prueba generados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.get('/test', testLogger)

export default router