import { Router } from "express";
import { getCartById, addProduct, create, clearCart } from "../controllers/cart.controller.js";

const route = Router()

route.get('/:cid', getCartById)

route.post('/:cid/product/:pid', addProduct)

route.post('/', create)

route.delete('/:cid', clearCart)

export default route
