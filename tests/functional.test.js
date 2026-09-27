import { expect } from "chai"
import request from 'supertest'
import app from '../app.js'
import connectMongoDB from "../config/db.js"
import mongoose, { mongo } from "mongoose"
import Product from "../models/product.model.js"
import User from "../models/user.model.js"
import { getUserByEmail } from "../repositories/auth.repository.js"
import Cart from "../models/cart.model.js"

describe('Products API', ()=>{

    let productId
    let testUserEmail
    let cartId
    let authCookie
    let testUserId

    before(async ()=>{
        await connectMongoDB()
    })

    after(async ()=>{
        await Product.deleteMany({
            code: 'TEST-PRODUCT-001'
        })
        await User.deleteOne({
            email: testUserEmail
        })
        await Cart.deleteOne({
            _id: cartId
        })
        await mongoose.connection.close()
    })

    it('POST /api/v1/auth/register deberia registrar a un usuario siempre y cuando su email no exista en la DB', async ()=>{
        const testUser = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test.auth@example.com',
            password: 'Password123'
        }
        const response = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)

        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('success')

        testUserEmail = testUser.email

        const user = await getUserByEmail(testUser.email)
        testUserId = user._id.toString()
    })

    it('POST /api/v1/auth/register deberia devolver error si el email ya se encuentra registrado', async ()=>{
        const testUser = {
            first_name: 'Test',
            last_name: 'User',
            email: 'test.auth@example.com',
            password: 'Password123'
        }
        const response = await request(app)
        .post('/api/v1/auth/register')
        .send(testUser)

        expect(response.status).to.equal(409)
        expect(response.body).to.have.property('status')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })

    it('POST /api/v1/auth/login deberia iniciar sesion con credenciales validas', async ()=>{
        const testLogin = {
            email: testUserEmail,
            password: 'Password123'
        }

        const response = await request(app)
        .post('/api/v1/auth/login')
        .send(testLogin)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('success')
        expect(response.body).to.have.property('message')
        expect(response.headers).to.have.property('set-cookie')

        authCookie = response.headers['set-cookie']
    })



    it('POST /api/v1/auth/login deberia devolver error si la contraseña es incorrecta', async ()=>{
        const testWrongLogin = {
            email: testUserEmail,
            password: 'TestWrongPassword'
        }

        const response = await request(app)
        .post('/api/v1/auth/login')
        .send(testWrongLogin)

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })

    it('POST /api/v1/auth/login deberia devolver error si el usuario no existe', async ()=>{
        const testUnexistingLogin = {
            email: 'thisemail.doesntexist@hotmail.com',
            password: 'TestWrongPassword'
        }

        const response = await request(app)
        .post('/api/v1/auth/login')
        .send(testUnexistingLogin)

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })

    it('GET /api/v1/auth/profile deberia devolver error si no hay token', async ()=>{
        const response = await request(app)
        .get('/api/v1/auth/profile')

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })

    it('GET /api/v1/auth/profile deberia validar el perfil si el token y cookie se envian correctamente', async ()=>{
        const testLogin = {
            email: testUserEmail,
            password: 'Password123'
        }
        const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(testLogin)

        const loginCookie = loginResponse.headers['set-cookie']

        const profileResponse = await request(app) 
        .get('/api/v1/auth/profile')
        .set('Cookie', loginCookie)

        expect(profileResponse.status).to.equal(200)
        expect(profileResponse.body).to.have.property('status')
        expect(profileResponse.body.status).to.equal('success')
        expect(profileResponse.body).to.have.property('user')
        expect(profileResponse.body.user.email).to.equal('test.auth@example.com')
    })

    it('GET /api/v1/auth/session deberia devolver error si no hay token', async ()=>{
        const response = await request(app)
        .get('/api/v1/auth/session')

        expect(response.status).to.equal(401)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })
    

    it('GET /api/v1/auth/session deberia devolver la session si el token y cookie se envian correctamente', async ()=>{
        const testLogin = {
            email: testUserEmail,
            password: 'Password123'
        }
        const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(testLogin)

        const loginCookie = loginResponse.headers['set-cookie']

        const profileResponse = await request(app) 
        .get('/api/v1/auth/session')
        .set('Cookie', loginCookie)

        expect(profileResponse.status).to.equal(200)
        expect(profileResponse.body).to.have.property('status')
        expect(profileResponse.body.status).to.equal('success')
        expect(profileResponse.body).to.have.property('authenticated')
        expect(profileResponse.body.authenticated).to.equal(true)
        expect(profileResponse.body).to.have.property('user')
    })

    it('GET /api/v1/auth/admin deberia devolver error si el usuario no es rol admin', async ()=>{
        const testLogin = {
            email: testUserEmail,
            password: 'Password123'
        }
        const loginResponse = await request(app)
        .post('/api/v1/auth/login')
        .send(testLogin)

        const loginCookie = loginResponse.headers['set-cookie']

        const profileResponse = await request(app) 
        .get('/api/v1/auth/admin')
        .set('Cookie', loginCookie)

        expect(profileResponse.status).to.equal(403)
        expect(profileResponse.body).to.have.property('code')
        expect(profileResponse.body).to.have.property('message')
    })

    it('POST /api/v1/auth/:uid/documents deberia subir un documento correctamente', async ()=>{
        const response = await request(app)
        .post(`/api/v1/auth/${testUserId}/documents`)
        .set('Cookie', authCookie)
        .field('documentType', 'DNI')
        .attach('file', Buffer.from('Documento de prueba'), {
            filename: 'document.pdf',
            contentType: 'application/pdf'
        })


        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('success')
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('user')
        expect(response.body.user).to.have.property('documents')
    })

    it('POST /api/v1/auth/:uid/documents deberia devolver error si falta el archivo', async ()=>{
        const response = await request(app)
        .post(`/api/v1/auth/${testUserId}/documents`)
        .set('Cookie', authCookie)
        .field('documentType', 'DNI')

        expect(response.status).to.equal(400)
        expect(response.body.status).to.equal('error')
        expect(response.body.code).to.equal('MISSING_FILE')
    })

    it('POST /api/v1/auth/:uid/documents deberia devolver error con tipo de documento invalido', async ()=>{
        const response = await request(app)
        .post(`/api/v1/auth/${testUserId}/documents`)
        .set('Cookie', authCookie)
        .field('documentType', 'FACTURA')
        .attach('file', Buffer.from('Documento de prueba'), {
            filename: 'document.pdf',
            contentType: 'application/pdf'
        })

        expect(response.status).to.equal(400)
        expect(response.body.status).to.equal('error')
        expect(response.body.code).to.equal('INVALID_DOCUMENT_TYPE')
    })

    it('POST /api/v1/auth/:uid/documents deberia devolver error con tipo de archivo invalido', async ()=>{
        const response = await request(app)
        .post(`/api/v1/auth/${testUserId}/documents`)
        .set('Cookie', authCookie)
        .field('documentType', 'DNI')
        .attach('file', Buffer.from('Archivo de prueba'), {
            filename: 'document.txt',
            contentType: 'text/plain'
        })

        expect(response.status).to.equal(400)
        expect(response.body.status).to.equal('error')
        expect(response.body.code).to.equal('INVALID_FILE_TYPE')
    })

    it('POST /api/v1/auth/:uid/documents deberia devolver error si el archivo supera el tamaño maximo', async ()=>{
        const largeFile = Buffer.alloc(5 * 1024 * 1024 + 1)

        const response = await request(app)
        .post(`/api/v1/auth/${testUserId}/documents`)
        .set('Cookie', authCookie)
        .field('documentType', 'DNI')
        .attach('file', largeFile, {
            filename: 'large-document.pdf',
            contentType: 'application/pdf'
        })

        expect(response.status).to.equal(400)
        expect(response.body.status).to.equal('error')
        expect(response.body.code).to.equal('FILE_TOO_LARGE')
    })

    it('POST /api/v1/auth/:uid/documents deberia devolver error si el usuario no existe', async ()=>{
        const fakeUserId = new mongoose.Types.ObjectId()

        const response = await request(app)
        .post(`/api/v1/auth/${fakeUserId}/documents`)
        .set('Cookie', authCookie)
        .field('documentType', 'DNI')
        .attach('file', Buffer.from('Documento de prueba'), {
            filename: 'document.pdf',
            contentType: 'application/pdf'
        })

        expect(response.status).to.equal(404)
        expect(response.body.status).to.equal('error')
        expect(response.body.code).to.equal('USER_NOT_FOUND')
    })

    it('POST /api/v1/auth/:uid/documents deberia devolver error si el campo del archivo es incorrecto', async ()=>{
        const response = await request(app)
        .post(`/api/v1/auth/${testUserId}/documents`)
        .set('Cookie', authCookie)
        .field('documentType', 'DNI')
        .attach('document', Buffer.from('Documento de prueba'), {
            filename:'document.pdf',
            contentType: 'application/pdf'
        })

        expect(response.status).to.equal(400)
        expect(response.body.status).to.equal('error')
        expect(response.body.code).to.equal('UNEXPECTED_FILE')
    })

    it('GET /api/v1/auth/profile deberia devolver los documentos del usuario', async ()=>{
        const response = await request(app)
        .get('/api/v1/auth/profile')
        .set('Cookie', authCookie)

        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('success')
        expect(response.body.user).to.have.property('documents')
        expect(response.body.user.documents).to.be.an('array')
        expect(response.body.user.documents.length).to.be.greaterThan(0)
    })

    it('GET /api/products deberia obtener la lista de productos', async ()=>{
        const response = await request(app)
        .get('/api/products')

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('success')
        expect(response.body).to.have.property('payload')
        expect(response.body.payload).to.be.an('array')
    })

    it('POST /api/products deberia crear un producto', async ()=>{
        const product = {
            title: "Producto de test",
            description: 'Producto creado durante testing',
            code: 'TEST-PRODUCT-001',
            price: 1000,
            stock: 10,
            status: true,
            category: 'frescos'
        }

        const response = await request(app)
        .post('/api/products')
        .send(product)
    
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('payload')
    
        productId = response.body.payload._id
    })

    it('GET /api/products/:pid deberia obtener un producto por ID', async ()=>{
        const response = await request(app)
        .get(`/api/products/${productId}`)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal(true)
        expect(response.body).to.have.property('_id')
        expect(response.body._id).to.equal(productId)
    })

    it('GET /api/products/:pid deberia devolver error si el producto no existe', async ()=>{
        const fakeId = new mongoose.Types.ObjectId()

        const response = await request(app)
        .get(`/api/products/${fakeId}`)

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })

    it('POST /api/products deberia devolver error con datos invalidos', async ()=>{
        const response = await request(app)
        .post('/api/products')
        .send({
            title: 'Producto incompleto'
        })

        expect(response.status).to.equal(500)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body.code).to.equal('INTERNAL_SERVER_ERROR')
        expect(response.body).to.have.property('message')
    })

    it('PUT /api/products/:pid deberia actualizar un producto', async ()=>{
        const response = await request(app)
        .put(`/api/products/${productId}`)
        .send({
            price: 1500
        })

        expect(response.status).to.equal(200)
    })
    
    it('POST /api/carts/ deberia crear un carrito', async ()=>{
        const response = await request(app)
        .post('/api/carts/')
        
        expect(response.status).to.equal(201)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('success')
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('payload')
        
        cartId = response.body.payload._id
    })
    
    it('GET /api/carts/:cid deberia devolver un carrito por ID', async ()=>{
        const response = await request(app)
        .get(`/api/carts/${cartId}`)
        
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('success')
        expect(response.body).to.have.property('payload')
        expect(response.body.payload).to.be.an('array')
    })
    
    it('POST /api/carts/:cid/product/:pid deberia agregar un producto al carrito', async ()=>{
        const response = await request(app)
        .post(`/api/carts/${cartId}/product/${productId}`)
        .send({
            quantity: 2
        })
        
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('success')
        expect(response.body).to.have.property('payload')
    })

    it('DELETE /api/carts/:cid deberia vaciar el carrito', async ()=>{
        const response = await request(app)
        .delete(`/api/carts/${cartId}`)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('success')
        expect(response.body).to.have.property('message')
        expect(response.body).to.have.property('payload')
    })

    it('GET /api/carts/:cid deberia devolver el carrito vacio despues de eliminar sus productos', async ()=>{
        const response = await request(app)
        .get(`/api/carts/${cartId}`)

        expect(response.status).to.equal(200)
        expect(response.body.payload).to.be.an('array')
        expect(response.body.payload).to.have.lengthOf(0)
    })

    it('POST /api/carts/:cid/product/:pid deberia devolver error si el producto no existe', async ()=>{
        const fakeProductId = new mongoose.Types.ObjectId()

        const response = await request(app)
        .post(`/api/carts/${cartId}/product/${fakeProductId}`)

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })

    it('DELETE /api/carts/:cid deberia devolver error si el carrito no existe', async ()=>{

        const fakeCartId = new mongoose.Types.ObjectId()

        const response = await request(app)
        .delete(`/api/carts/${fakeCartId}`)

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })

    it('GET /api/carts/:cid deberia devolver error si el carrito no existe', async ()=>{
        const fakeCartId = new mongoose.Types.ObjectId()

        const response = await request(app)
        .get(`/api/carts/${fakeCartId}`)

        expect(response.status).to.equal(404)
        expect(response.body).to.have.property('status')
        expect(response.body.status).to.equal('error')
        expect(response.body).to.have.property('code')
        expect(response.body).to.have.property('message')
    })
        
    it('DELETE /api/products/:pid deberia eliminar un producto', async ()=>{
        const response = await request(app)
        .delete(`/api/products/${productId}`)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.equal('Producto eliminado')
        expect(response.body).to.have.property('payload')
    })
    
    it('GET /api/health deberia devolver el estado de la API', async ()=>{
        const response = await request(app)
        .get('/api/health')

        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('ok')
        expect(response.body).to.have.property('enviroment')
        expect(response.body).to.have.property('uptime')
        expect(response.body).to.have.property('timestamp')
    })
})