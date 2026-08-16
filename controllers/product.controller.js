import {createProduct, deleteProduct, getProductById, getProducts, updateProduct} from '../services/product.service.js'

export const getAllProducts = async (req, res, next)=>{
    try {
        const products = await getProducts(req.query)
        res.json(products)
    } catch (error) {
        next(error)
    }
}

export const getProduct = async (req, res, next)=>{
    try {
        const id = req.params.pid
        const product = await getProductById(id)
        return res.json(product)
    } catch (error) {
        next(error)
    }
}

export const createProd = async (req, res, next) =>{
    try {
        const body = req.body
        const createdProduct = await createProduct(body)
        return res.status(201).json({message:'Producto creado exitosamente', payload: createdProduct})
    } catch (error) {
        next(error)
    }
}

export const updateProd = async (req, res, next)=>{
    try {
        const updatedFields = req.body
        const id = req.params.pid
        const updatedProduct = await updateProduct(id, updatedFields)
        return res.status(200).send('Producto actualizado exitosamente')
    } catch (error) {
        next(error)
    }
}

export const deleteProd = async (req, res, next)=>{
    try {
        const id = req.params.pid
        const deletedProd = await deleteProduct(id)
        return res.status(200).json({ message: 'Producto eliminado', payload: deletedProd })
    } catch (error) {
        next(error)
        }
    }
