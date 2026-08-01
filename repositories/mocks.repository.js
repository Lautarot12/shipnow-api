import User from '../models/user.model.js'
import Product from '../models/product.model.js'
import Cart from '../models/cart.model.js'

export const createUsers = async (users)=>{
    return await User.insertMany(users)
}

export const createProducts = async (products)=>{
    return await Product.insertMany(products)
}

export const createCarts = async (carts) =>{
    return await Cart.insertMany(carts)
}