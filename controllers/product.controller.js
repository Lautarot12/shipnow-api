import {createProduct, deleteProduct, getProductById, getProducts, updateProduct} from '../services/product.service.js'

export const getAllProducts = async (req, res)=>{
    try {
        const products = await getProducts(req.query)
        res.json(products)
    } catch (error) {
        res.status(500).json({message: 'Error del servidor', error: error.message})
    }
}

export const getProduct = async (req, res)=>{
    try {
        const id = req.params.pid
        const product = await getProductById(id)
        return res.json(product)
    } catch (error) {
        return res.status(404).json({message: 'Se produjo un error', error: error.message})
    }
}

export const createProd = async (req, res) =>{
    try {
        const body = req.body
        const createdProduct = createProduct(body)
        return res.status(201).send('Producto creado exitosamente', createdProduct)
    } catch (error) {
        return res.status(500).json({message:'Se produjo un error', error: error.message})
    }
}

export const updateProd = async (req, res)=>{
    try {
        const updatedFields = req.body
        const id = req.params.pid
        const updatedProduct = await updateProduct(id, updatedFields)
        return res.status(201).send('Producto actualizado exitosamente')
    } catch (error) {
        return res.status(500).json({message: 'Error al actualizar el producto', error: error.message})
    }
}

export const deleteProd = async (req, res)=>{
    try {
        const id = req.params.pid
        const deletedProd = await deleteProduct(id)
        return res.status(204).json({ message: 'Producto eliminado', payload: deletedProd })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el producto',
            error: error.message
        })
    }
}