import { Router } from "express"
import { generateMocks, getCartsMock, getProductsMock, getUsersMock } from "../controllers/mock.controller.js"

const route = Router()

/**
 * @swagger
 * tags:
 *   name: Mocks
 *   description: Generación de datos simulados para pruebas
 */

/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     summary: Generar usuarios mock
 *     description: Genera usuarios simulados sin almacenarlos en MongoDB.
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: true
 *         description: Cantidad de usuarios a generar
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 20
 *     responses:
 *       200:
 *         description: Usuarios simulados generados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
route.get('/users', getUsersMock)

/**
 * @swagger
 * /api/mocks/products:
 *   get:
 *     summary: Generar productos mock
 *     description: Genera productos simulados sin almacenarlos en MongoDB.
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: true
 *         description: Cantidad de productos a generar
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 20
 *     responses:
 *       200:
 *         description: Productos simulados generados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
route.get('/products', getProductsMock)

/**
 * @swagger
 * /api/mocks/carts:
 *   get:
 *     summary: Generar carritos mock
 *     description: Genera carritos simulados sin almacenarlos en MongoDB.
 *     tags: [Mocks]
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: true
 *         description: Cantidad de carritos a generar
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 10
 *     responses:
 *       200:
 *         description: Carritos simulados generados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
route.get('/carts', getCartsMock)

/**
 * @swagger
 * /api/mocks/generate:
 *   post:
 *     summary: Generar e insertar datos mock
 *     description: Genera usuarios, productos y carritos simulados y los almacena en MongoDB. Los carritos mantienen relaciones con los productos generados.
 *     tags: [Mocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - users
 *               - products
 *               - carts
 *             properties:
 *               users:
 *                 type: integer
 *                 minimum: 1
 *                 example: 20
 *               products:
 *                 type: integer
 *                 minimum: 1
 *                 example: 50
 *               carts:
 *                 type: integer
 *                 minimum: 1
 *                 example: 10
 *     responses:
 *       201:
 *         description: Datos simulados generados e insertados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Cantidad de mocks inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
route.post('/generate', generateMocks)

export default route