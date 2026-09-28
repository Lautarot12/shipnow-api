import http from 'http'
import { Server } from 'socket.io'
import app from './app.js'
import connectMongoDB from './config/db.js'
import Product from './models/product.model.js'
import { initializeGithubStrategy } from './strategies/github.strategy.js'
import { initializeLocalStrategy } from './strategies/local.strategy.js'
import config from './config/env.config.js'
import logger from './config/logger.config.js'

const server = http.createServer(app)
const io = new Server(server)

const PORT = config.port

const startServer = async () => {
    try {
        await connectMongoDB()

        initializeGithubStrategy()
        initializeLocalStrategy()

        server.listen(PORT, () => {
            logger.info(`Servidor ShipNow escuchando en el puerto ${PORT}`)
        })
    } catch (error) {
        logger.fatal(`No se pudo iniciar el servidor: ${error.message}`)
        process.exit(1)
    }
}

startServer()

io.on('connection', async (socket) => {
    const productList = await Product.find()
    io.emit('productList', productList)

    socket.on('submit', async (data) => {
        await Product.create(data)
        const productList = await Product.find()
        io.emit('productList', productList)
    })

    socket.on('deleteProd', async (prod2delete) => {
        await Product.findByIdAndDelete(prod2delete.id)
        const productList = await Product.find()
        io.emit('productList', productList)
    })
})