import Cart from "../models/cart.model.js";

export const createCart = async ()=>{
    return await Cart.create({})
}

export const getCartById = async (id)=>{
    return await Cart.findById(id)
}

export const saveCart = async (cart)=>{
    return await cart.save()
}