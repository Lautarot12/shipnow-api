import { getCartById, saveCart, createCart } from "../repositories/cart.repository.js"
import { getById } from "../repositories/product.repository.js"
import CustomError from "../errors/CustomError.js"
import { ERROR_TYPES } from "../errors/error.dictionary.js"

export const getCart = async (id)=>{
    const cart = await getCartById(id)

    if (!cart) {
        throw new CustomError(ERROR_TYPES.CART_NOT_FOUND)
    }
    return cart
}

export const addProductToCart = async (cartId, productId, quantity)=>{
    const cart = await getCartById(cartId)

    if (!cart) {
        throw new CustomError(ERROR_TYPES.CART_NOT_FOUND)
    }

    const product = await getById(productId)

    if (!product) {
        throw new CustomError(ERROR_TYPES.PRODUCT_NOT_FOUND)
    }
    
    const productIndex = cart.products.findIndex(
        (p) => p.product && p.product.equals(productId)
    )

    if (productIndex !== -1) {
        cart.products[productIndex].quantity = (cart.products[productIndex].quantity || 0) + quantity
    } else {
        cart.products.push({
            product: productId,
            quantity
        })
    }

    return await saveCart(cart)
}

export const createNewCart = async () =>{
    return await createCart()
}

export const clear = async (id)=>{
    const cart = await getCartById(id)

    if (!cart) {
        throw new CustomError(ERROR_TYPES.CART_NOT_FOUND)
    }
    
    cart.products = []

    return await saveCart(cart)
}

