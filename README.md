# Aplicaciones Web II - Entrega 4

Backend con Node.js, Express y MongoDB con autenticacion JWT y contrasenas hasheadas con bcrypt.

## Requisitos

- Node.js 18+
- MongoDB en ejecucion local o remota

## Instalacion

1. Instalar dependencias:

```bash
npm install
```

2. Crear archivo de entorno:

```bash
cp .env.example .env
```

En Windows PowerShell puedes copiarlo con:

```powershell
Copy-Item .env.example .env
```

3. Configurar tus variables en `.env`:

- PORT: puerto del servidor
- MONGODB_URI: URI de MongoDB
- MONGODB_DB: nombre de la base
- JWT_SECRET: secreto para firmar tokens
- JWT_EXPIRES_IN: expiracion del token (por ejemplo 1h)

4. Ejecutar servidor:

```bash
npm run dev
```

## Endpoints

### Auth

- POST /auth/register

Body:

```json
{
  "name": "Juan",
  "email": "juan@mail.com",
  "password": "123456"
}
```

- POST /auth/login

Body:

```json
{
  "email": "juan@mail.com",
  "password": "123456"
}
```

Respuesta esperada:

```json
{
  "message": "Login exitoso",
  "token": "<jwt>"
}
```

### Productos (MongoDB)

- GET /products
- POST /products

Body:

```json
{
  "name": "Notebook",
  "desc": "16GB RAM",
  "price": 1500,
  "stock": 5
}
```

### Compras protegidas con JWT

- POST /sales/purchase

Headers:

- Authorization: Bearer <jwt>

Body:

```json
{
  "productId": "<id_producto>",
  "quantity": 1
}
```

- GET /sales/my-purchases

Headers:

- Authorization: Bearer <jwt>

## Como se cumple la consigna

- Contrasenas hasheadas con bcrypt al registrar usuario.
- Login con bcrypt.compare para validar credenciales.
- Generacion de JWT en login.
- Middleware de autenticacion JWT para rutas sensibles.
- Compra protegida con JWT.
- Persistencia centralizada en MongoDB con Mongoose.
