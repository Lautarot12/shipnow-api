import { Router } from 'express'
import Product from '../models/product.model.js'
import { createProd, deleteProd, getAllProducts, getProduct, updateProd } from '../controllers/product.controller.js'

const route = Router()

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Obtiene una lista paginada de productos.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Cantidad de productos por página
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Orden de los productos por precio
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Filtro por categoría o estado
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
route.get('/', getAllProducts)
/**
 * @swagger
 * /api/products/{pid}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: Obtiene un producto específico utilizando su ID de MongoDB.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
route.get('/:pid', getProduct)
/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Crear un producto
 *     description: Crea un nuevo producto.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       409:
 *         description: Ya existe un producto con ese código
 *       500:
 *         description: Error interno del servidor
 */
route.post('/', createProd)
/**
 * @swagger
 * /api/products/{pid}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Actualiza los datos de un producto existente.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto actualizado correctamente
 *       404:
 *         description: Producto no encontrado
 *       409:
 *         description: Ya existe un producto con ese código
 *       500:
 *         description: Error interno del servidor
 */
route.put('/:pid', updateProd)
/**
 * @swagger
 * /api/products/{pid}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto existente por su ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       204:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
route.delete('/:pid', deleteProd)

export default route