import { addProductToCart, clear, createNewCart, getCart } from "../services/cart.service.js"

export const getCartById = async (req, res, next)=>{
    try {
        const cart = await getCart(req.params.cid)

        return res.status(200).json({
            status: 'success',
            payload: cart.products
        })
    } catch (error) {
        next(error)
    }
}

export const addProduct = async (req, res, next)=>{
    try {
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body?.quantity || 1

        const updatedCart = await addProductToCart(cartId, productId, quantity)

        return res.status(200).json({
            status: 'success',
            payload: updatedCart
        })

    } catch (error) {
        next(error)
    }
}

export const create = async (req, res, next)=>{
    try {
        const cart = await createNewCart()

        return res.status(201).json({
            status: 'success',
            message: 'Carrito creado correctamente',
            payload: cart
        })
    } catch (error) {
        next(error)
    }
}

export const clearCart = async (req, res, next)=>{
    try {
        const cart = await clear(req.params.cid)

        return res.status(200).json({
            status: 'success',
            message: 'Carrito vaciado correctamente',
            payload: cart
        })
    } catch (error) {
        next(error)
    }
}