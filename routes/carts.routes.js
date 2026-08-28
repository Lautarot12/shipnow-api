import { Router } from "express"
import { getCartById, addProduct, create, clearCart } from "../controllers/cart.controller.js"

const route = Router()

/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Operaciones relacionadas con carritos de compra
 */

/**
 * @swagger
 * /api/v1/carts/{cid}:
 *   get:
 *     summary: Obtener un carrito por ID
 *     description: Obtiene un carrito y sus productos asociados.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Carrito obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrito no encontrado
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
route.get('/:cid', getCartById)

/**
 * @swagger
 * /api/v1/carts/{cid}/product/{pid}:
 *   post:
 *     summary: Agregar un producto al carrito
 *     description: Agrega un producto existente a un carrito. Si el producto ya existe, incrementa su cantidad.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439012
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Producto agregado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Producto o carrito no encontrado
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
route.post('/:cid/product/:pid', addProduct)

/**
 * @swagger
 * /api/v1/carts:
 *   post:
 *     summary: Crear un carrito
 *     description: Crea un carrito vacío.
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: Carrito creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
route.post('/', create)

/**
 * @swagger
 * /api/v1/carts/{cid}:
 *   delete:
 *     summary: Vaciar un carrito
 *     description: Elimina todos los productos del carrito indicado.
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: ID del carrito
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Carrito vaciado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       404:
 *         description: Carrito no encontrado
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
route.delete('/:cid', clearCart)

export default route