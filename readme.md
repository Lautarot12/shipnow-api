# Backend II - Authentication with Sessions

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- Express Session
- Connect Mongo
- Handlebars
- Socket.io
- Dotenv

## Funcionalidades implementadas

- Login con creación de sesión
- Logout con destrucción de sesión
- Ruta protegida `/products`
- Middleware de autenticación
- Persistencia de sesiones en MongoDB
- Renderizado de vistas con Handlebars
- Pruebas realizadas con Postman

## Instalación

Clonar el repositorio:

```bash
git clone <url-del-repo>
```

Instalar dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=8080
URI_MONGODB=tu_uri_de_mongodb
SECRET_KEY=tu_clave_secreta
```

## Ejecutar el servidor

```bash
node app.js
```

o con nodemon:

```bash
npx nodemon app.js
```

## Endpoints principales

### Login

```http
POST /login
```

Body JSON:

```json
{
  "email": "lauti@test.com",
  "name": "Lautaro",
  "role": "admin"
}
```

### Ruta protegida

```http
GET /products
```

Requiere sesión activa.

### Logout

```http
POST /logout
```

Cierra la sesión actual.

## Flujo de prueba en Postman

1. Ejecutar `POST /login`
2. Acceder a `GET /products`
3. Ejecutar `POST /logout`
4. Verificar que `GET /products` devuelva `401`

## Autor

Lautaro Tello  
Junior Full Stack Developer