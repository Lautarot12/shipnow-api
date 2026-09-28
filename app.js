import express from 'express'
import Productsroute from './routes/products.routes.js'
import cartsRoute from './routes/carts.routes.js'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRoute from './routes/views.routes.js'
import Product from './models/product.model.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import authRoute from './routes/auth.routes.js'
import config from './config/env.config.js'
import mocksRoute from './routes/mocks.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import loggerRouter from './routes/logger.routes.js'
import swaggerSpec from './config/swagger.config.js'
import swaggerUi from 'swagger-ui-express'
import healthRoute from './routes/health.routes.js'
import shipmentRoute from './routes/shipment.routes.js'

const app = express()

app.engine('handlebars', handlebars.engine())

app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

 
app.use(session({
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: config.mongoUri,
        ttl: 14 * 24 * 60
    }),
    cookie: {
        secure: config.nodeEnv === 'production',
        httpOnly: true,
        maxAge: 1200000,
        sameSite: 'lax'
    }
}))

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))
app.use(express.static(__dirname + '/public'))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(cookieParser(config.secretKey))
app.use(passport.initialize())
app.use('/api/v1/auth/', authRoute)
app.use('/api/products', Productsroute)
app.use('/api/carts', cartsRoute)
app.use('/', viewsRoute)
app.use('/api/shipments', shipmentRoute)
if (config.nodeEnv !== 'production') {
    app.use('/api/mocks', mocksRoute)
    app.use('/api/logger', loggerRouter)
}
app.use('/api/health', healthRoute)

app.use(errorMiddleware)

app.get('/set-cookie', (req, res)=>{
    const { idioma } = req.query
    res.cookie('idioma', idioma).json({msg: 'Idioma guardado en la cookie'})
})

app.get('/get-cookies', (req, res)=>{
    const { idioma } = req.cookies
    idioma === 'ingles'? res.send('hello') : res.send('Hola')
})

export default app