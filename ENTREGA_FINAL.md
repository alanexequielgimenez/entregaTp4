# Entrega - Aplicaciones Web II

## Alumno

- Nombre: Alan Exequiel Gimenez
- Materia: Aplicaciones Web II

## Repositorio GitHub

- Link: https://github.com/alanexequielgimenez/entregaTp4

## Documentacion Tecnica

### Descripcion general de la aplicacion

La aplicacion es una API REST construida con Node.js y Express que implementa autenticacion con JWT, hash de contrasenas con bcrypt y persistencia en MongoDB mediante Mongoose.

Permite:

- Registro e inicio de sesion de usuarios.
- Gestion de productos.
- Realizacion de compras protegidas por autenticacion.
- Consulta de compras del usuario autenticado.

### Arquitectura y carpetas principales

- db:
  - connection.js: conexion y reutilizacion de conexion con MongoDB.
  - schemas: modelos de datos (User, Product, Sale).
  - actions: operaciones de acceso a datos de productos.
- routes:
  - auth.routes.js: endpoints de registro y login.
  - productos.routes.js: CRUD completo de productos.
  - ventas.routes.js: endpoints de compra y consulta de compras.
- middlewares:
  - auth.middleware.js: validacion de JWT para rutas protegidas.
- index.js:
  - configuracion principal de Express y arranque de servidor.

## Tecnologias y Dependencias utilizadas

### Tecnologias

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt
- dotenv

### Dependencias del proyecto

- bcrypt
- dotenv
- express
- jsonwebtoken
- mongoose

## Operaciones CRUD implementadas

### Productos

- Create: POST /products
- Read all: GET /products
- Read one: GET /products/:id
- Update: PUT /products/:id
- Delete: DELETE /products/:id

### Autenticacion

- Register: POST /auth/register
- Login: POST /auth/login

### Compras (protegidas por JWT)

- Create purchase: POST /sales/purchase
- Read my purchases: GET /sales/my-purchases

## Prueba de autenticacion

Flujo implementado:

1. Registro de usuario.
2. Login con email y password.
3. Validacion de password con bcrypt.compare.
4. Emision de token JWT.
5. Uso de Authorization: Bearer <token> en rutas protegidas.

## Mejoras implementadas

- Migracion de persistencia a MongoDB con Mongoose.
- Hash de contrasenas para almacenamiento seguro.
- Middleware de autenticacion reusable.
- Compra protegida por token.
- Validaciones basicas de datos y manejo de errores HTTP.
- Conexion a MongoDB previa al arranque del servidor (fail-fast).

## Demostracion de pruebas

Las pruebas funcionales se realizaron con Postman y MongoDB Compass:

- Registro y login de usuarios.
- CRUD completo de productos.
- Compra protegida con JWT.
- Verificacion de datos persistidos en MongoDB (colecciones users, products, sales).

## Link al video explicativo

- Link: PEGAR_AQUI_LINK_DEL_VIDEO

## Link de publicacion (si existiera)

- Link: NO_APLICA

## Guion sugerido para video (5 a 10 minutos)

1. Presentacion breve del proyecto y objetivo.
2. Mostrar estructura de carpetas principal.
3. Explicar autenticacion (register/login, bcrypt, JWT).
4. Ejecutar CRUD completo de productos en Postman.
5. Mostrar compra protegida con JWT.
6. Mostrar datos en MongoDB Compass.
7. Cierre con decisiones tecnicas, dificultades y mejoras futuras.
