import { Router } from 'express'
import __dirname from '../utils.js'
import Product from '../models/product.model.js'
import Cart from '../models/cart.model.js'
import CustomError from '../errors/CustomError.js'
import { ERROR_TYPES } from '../errors/error.dictionary.js'

const route = Router()

function authMiddleware (req, res, next) {
    if (!req.session.user) {
        return next(new CustomError(ERROR_TYPES.SESSION_UNAUTHORIZED))
    }
    next()
}

route.get('/', async (req, res, next)=>{
    try {
        const { limit = 10, page = 1 } = req.query

        const data = await Product.paginate({}, { limit, page, lean: true })
        const products = data.docs
        delete data.docs

        const links = []

        for(let i =1; i <= data.totalPages; i++){
            links.push({ text: i, link: `?limit=${limit}&page=${i}` })
        }

        res.render("index", { products, links })
    } catch (error) {
        next(error)
    }
})

route.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})



route.get('/products', authMiddleware, async (req, res)=>{
    
    const { page = 1, limit = 10, sort } = req.query

    let sortOption = {}

    if(sort === 'asc'){
        sortOption = { price: 1 }
    } else if (sort === 'desc') {
        sortOption = { price: -1 }
    }
    
    const data = await Product.paginate({}, { limit, page, sort: sortOption, lean: true })

    res.render('products', {
        products: data.docs,
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevPage: data.prevPage,
        nextPage: data.nextPage,
        user: req.session.user
    })
})


route.post('/login', async (req, res)=>{
    try {
        if (!req.body.email || !req.body.name || !req.body.role) {
            throw new CustomError(ERROR_TYPES.INVALID_DATA)
        } 
    
        req.session.user = {
            email: req.body.email,
            name: req.body.name,
            role: req.body.role
        }
        
        res.status(200).send('Login exitoso')
    } catch (error) {
        next(error)
    }

})

route.post('/logout', async (req, res, next)=>{
    req.session.destroy((error)=>{
        if (error) {
            return next(error)
        }
        res.status(200).send('Sesion cerrada.')
    })
})


route.get('/cart/:cid', async (req, res) =>{
    const cid = req.params.cid
    const cart = await Cart.findById(cid).populate('products.product')
})






export default route