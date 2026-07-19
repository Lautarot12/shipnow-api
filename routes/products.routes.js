import { Router } from 'express'
import Product from '../models/product.model.js'
import { createProd, deleteProd, getAllProducts, getProduct, updateProd } from '../controllers/product.controller.js'

const route = Router()


route.get('/', getAllProducts)

route.get('/:pid', getProduct)

route.post('/', createProd)

route.put('/:pid', updateProd)

route.delete('/:pid', deleteProd)

export default route