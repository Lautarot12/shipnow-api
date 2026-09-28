import { Router } from 'express'

import {
    getAllShipments,
    getShipment,
    getShipmentTracking,
    createShipmentController,
    updateShipmentController,
    deleteShipmentController,
    uploadShipmentReceipt
} from '../controllers/shipment.controller.js'
import { shipmentUpload } from '../config/multer.config.js'

const router = Router()
/**
 * @swagger
 * /api/shipments:
 *   get:
 *     summary: Obtener envíos
 *     description: Obtiene una lista paginada de envíos.
 *     tags:
 *       - Shipments
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Cantidad máxima de envíos por página.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum:
 *             - PENDING
 *             - PREPARING
 *             - IN_TRANSIT
 *             - DELIVERED
 *             - CANCELLED
 *         description: Filtrar por estado.
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *         description: Filtrar por ID de usuario.
 *     responses:
 *       200:
 *         description: Envíos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Shipment'
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Parámetros inválidos.
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
router.get('/', getAllShipments)
/**
 * @swagger
 * /api/shipments/tracking/{trackingNumber}:
 *   get:
 *     summary: Consultar envío por tracking
 *     description: Obtiene un envío utilizando su número de tracking.
 *     tags:
 *       - Shipments
 *     parameters:
 *       - in: path
 *         name: trackingNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: Número de tracking del envío.
 *     responses:
 *       200:
 *         description: Envío obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Shipment'
 *       404:
 *         description: Envío no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SHIPMENT_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Envío no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/tracking/:trackingNumber', getShipmentTracking)
/**
 * @swagger
 * /api/shipments/{sid}/receipt:
 *   post:
 *     summary: Subir comprobante de un envío
 *     description: Sube un comprobante y lo asocia al envío indicado.
 *     tags:
 *       - Shipments
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del envío.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Comprobante subido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Comprobante subido correctamente
 *                 payload:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Archivo inválido, faltante o ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Envío no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SHIPMENT_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Envío no encontrado
 *       500:
 *         description: Error interno al guardar el comprobante.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/:sid/receipt', shipmentUpload.single('file'), uploadShipmentReceipt)
/**
 * @swagger
 * /api/shipments/{sid}:
 *   get:
 *     summary: Obtener un envío por ID
 *     description: Obtiene un envío específico utilizando su ID de MongoDB.
 *     tags:
 *       - Shipments
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del envío.
 *     responses:
 *       200:
 *         description: Envío obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 payload:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Envío no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: SHIPMENT_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Envío no encontrado
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:sid', getShipment)
/**
 * @swagger
 * /api/shipments:
 *   post:
 *     summary: Crear un envío
 *     description: Crea un nuevo envío asociado a un usuario.
 *     tags:
 *       - Shipments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - trackingNumber
 *               - user
 *               - origin
 *               - destination
 *             properties:
 *               trackingNumber:
 *                 type: string
 *                 example: TEST-TRACK-001
 *               user:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - PREPARING
 *                   - IN_TRANSIT
 *                   - DELIVERED
 *                   - CANCELLED
 *                 example: PENDING
 *               origin:
 *                 type: string
 *                 example: Buenos Aires
 *               destination:
 *                 type: string
 *                 example: Mendoza
 *     responses:
 *       201:
 *         description: Envío creado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Envío creado correctamente
 *                 payload:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Datos del envío inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: USER_NOT_FOUND
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 *       409:
 *         description: Ya existe un envío con ese tracking.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: DUPLICATE_TRACKING_NUMBER
 *                 message:
 *                   type: string
 *                   example: Ya existe un envío con ese número de tracking
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', createShipmentController)
/**
 * @swagger
 * /api/shipments/{sid}:
 *   put:
 *     summary: Actualizar un envío
 *     description: Actualiza los datos de un envío existente.
 *     tags:
 *       - Shipments
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del envío.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               trackingNumber:
 *                 type: string
 *                 example: TEST-TRACK-001
 *               user:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - PREPARING
 *                   - IN_TRANSIT
 *                   - DELIVERED
 *                   - CANCELLED
 *                 example: IN_TRANSIT
 *               origin:
 *                 type: string
 *                 example: Buenos Aires
 *               destination:
 *                 type: string
 *                 example: San Rafael
 *     responses:
 *       200:
 *         description: Envío actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Envío actualizado correctamente
 *                 payload:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: Datos o estado del envío inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Envío o usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: El tracking ya está asociado a otro envío.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 code:
 *                   type: string
 *                   example: DUPLICATE_TRACKING_NUMBER
 *                 message:
 *                   type: string
 *                   example: Ya existe un envío con ese número de tracking
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:sid', updateShipmentController)
/**
 * @swagger
 * /api/shipments/{sid}:
 *   delete:
 *     summary: Eliminar un envío
 *     description: Elimina un envío existente por su ID.
 *     tags:
 *       - Shipments
 *     parameters:
 *       - in: path
 *         name: sid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del envío.
 *     responses:
 *       200:
 *         description: Envío eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Envío eliminado correctamente
 *                 payload:
 *                   $ref: '#/components/schemas/Shipment'
 *       400:
 *         description: ID inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Envío no encontrado.
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
router.delete('/:sid', deleteShipmentController)

export default router