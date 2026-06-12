import express from 'express'
import Productsroute from './routes/products.routes.js'
import cartsRoute from './routes/carts.routes.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRoute from './routes/views.routes.js'
import http from 'http'
import { Server } from 'socket.io'
import connectMongoDB from './config/db.js'
import dotenv from 'dotenv'
import Product from './models/product.model.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import bcrypt from 'bcrypt'
import User from './models/user.model.js'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import authRoute from './routes/auth.routes.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server)

connectMongoDB()

const PORT = process.env.PORT || 8080

server.listen(PORT, () => {
    console.log('Servidor ON')
})

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

 
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.URI_MONGODB,
        ttl: 14 * 24 * 60
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1200000,
        sameSite: 'lax'
    }
}))

app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.use(cookieParser(process.env.SECRET_KEY))
app.use(passport.initialize())
app.use('/api/v1/auth/', authRoute)
app.use('/api/products', Productsroute)
app.use('/api/carts', cartsRoute)
app.use('/', viewsRoute)


app.get('/set-cookie', (req, res)=>{
    const { idioma } = req.query
    res.cookie('idioma', idioma).json({msg: 'Idioma guardado en la cookie'})
})

app.get('/get-cookies', (req, res)=>{
    console.log(req.cookies)
    const { idioma } = req.cookies
    idioma === 'ingles'? res.send('hello') : res.send('Hola')
})

io.on('connection', async (socket)=>{
    console.log('Nuevo usuario conectado', socket.id)
    const productList = await Product.find()
    io.emit('productList', productList)

    socket.on('submit', async (data)=>{
        const addedProd = await Product.create(data)
        const productList = await Product.find()
        console.log('Se agrego:', addedProd)
        io.emit('productList', productList)
    })

    socket.on('deleteProd', async (prod2delete)=>{
        const deletedProd = await Product.findByIdAndDelete(prod2delete.id)
        const productList = await Product.find()
        io.emit('productList', productList)
        console.log('se elimino:', deletedProd)
    })
})