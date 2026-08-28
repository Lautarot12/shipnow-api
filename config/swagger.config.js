import swaggerJSDoc from "swagger-jsdoc";
import { schemas } from "./swagger.schemas.js";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ShipNow API',
            version: '1.0.0',
            description: 'API backend para gestión de usuarios, productos, carritos, mocks y autenticación.'
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Servidor local'
            }
        ],
        tags: [
            {
                name: 'Users',
                description: 'Endpoints de autenticación y usuarios'
            },
            {
                name: 'Products',
                description: 'Endpoints para gestión de productos'
            },
            {
                name: 'Carts',
                description: 'Endpoints para gestión de carritos'
            },
            {
                name: 'Mocks',
                description: 'Endpoints para generación de datos simulados'
            },
            {
                name: 'Logger',
                description: 'Endpoints para probar el sistema de logging'
            }
        ],
        components: {
            schemas
        }
    },
    apis: ['./routes/*.js']
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export default swaggerSpec