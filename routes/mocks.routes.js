import { Router } from "express";
import { generateMocks, getCartsMock, getProductsMock, getUsersMock } from "../controllers/mock.controller.js";

const route = Router()

route.get('/users', getUsersMock)

route.get('/products', getProductsMock)

route.get('/carts', getCartsMock)

route.post('/generate', generateMocks)

export default route