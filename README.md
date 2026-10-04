# ShipNow API — Pre-entrega Módulo 8

API backend desarrollada con Node.js, Express y MongoDB/Mongoose, orientada a una arquitectura profesional, escalable y preparada para ejecución mediante Docker.

## Tecnologías

* Node.js 22
* Express 5
* MongoDB
* Mongoose
* Docker
* Multer
* Winston
* Mocha
* Chai
* Supertest
* Swagger / OpenAPI
* Faker.js

## Arquitectura

El proyecto utiliza una separación de responsabilidades:

```text
Controller → Service → Repository → Model
```

* **Controllers:** reciben las solicitudes HTTP y validan parámetros.
* **Services:** contienen la lógica de negocio.
* **Repositories:** gestionan el acceso a MongoDB.
* **Models:** definen los esquemas de Mongoose.
* **Middlewares:** errores, uploads y restricciones de endpoints internos.
* **Routes:** definen los endpoints de la API.

## Requisitos

Para ejecutar el proyecto localmente:

* Node.js 22 o superior
* MongoDB / MongoDB Atlas
* npm
* Docker Desktop (opcional para ejecución en contenedor)

## Variables de entorno

Crear un archivo `.env` a partir de `.env.example`.

Variables disponibles:

| Variable           | Descripción                               |
| ------------------ | ----------------------------------------- |
| `PORT`             | Puerto de la API                          |
| `MONGODB_URI`      | URI de conexión a MongoDB                 |
| `NODE_ENV`         | `development`, `test` o `production`      |
| `JWT_SECRET`       | Clave utilizada para JWT                  |
| `LOG_LEVEL`        | Nivel de logging de Winston               |
| `EXTERNAL_API_URL` | URL de servicios externos, si corresponde |

> Las variables sensibles no deben subirse al repositorio.

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Crear `.env`:

```powershell
Copy-Item .env.example .env
```

Completar las variables de entorno correspondientes.

Iniciar en desarrollo:

```bash
npm run dev
```

Iniciar en modo normal:

```bash
npm start
```

La API queda disponible en:

```text
http://localhost:3000
```

## Tests funcionales

Ejecutar:

```bash
npm test
```

La suite incluye pruebas funcionales para:

* Usuarios
* Pedidos
* Creación de pedidos
* Consulta de pedidos
* Actualización de estados
* Validaciones
* Mocks
* Logger
* Swagger
* Manejo de rutas inexistentes
* Errores de negocio

La suite actual fue validada con:

```text
16 passing
```

Los tests utilizan el entorno `NODE_ENV=test` y una conexión de MongoDB configurada para testing.

## Health Check

Endpoint:

```text
GET /api/health
```

Ejemplo:

```text
http://localhost:3000/api/health
```

La respuesta informa:

* Estado de la aplicación
* Entorno
* Uptime
* Timestamp

No expone credenciales ni información sensible.

## Endpoints principales

### Health

```text
GET /api/health
```

### Usuarios

```text
GET    /api/users
POST   /api/users
```

Soporta paginación mediante:

```text
GET /api/users?page=1&limit=10
```

El límite máximo permitido es `100`.

### Pedidos

```text
GET    /api/orders
POST   /api/orders
GET    /api/orders/:id
PUT    /api/orders/:id
```

Soporta:

* Paginación
* Límite de resultados
* Filtro por estado
* Validación de estados
* Manejo de pedidos inexistentes

Ejemplo:

```text
GET /api/orders?page=1&limit=10
```

### Entregas

```text
GET /api/deliveries
```

Soporta:

* Paginación
* Límite de resultados
* Filtro por estado

Ejemplo:

```text
GET /api/deliveries?page=1&limit=10
```

### Productos

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Uploads

Endpoint:

```text
POST /api/uploads/image
```

Formato:

```text
multipart/form-data
```

Campo requerido:

```text
file
```

Formatos permitidos:

* JPG / JPEG
* PNG
* WEBP

Tamaño máximo:

```text
5 MB
```

Características:

* Un solo archivo por solicitud.
* Validación de tipo.
* Validación de tamaño.
* Errores controlados.
* El archivo se almacena temporalmente fuera del repositorio.
* No se utiliza como almacenamiento permanente.

Los archivos temporales se gestionan utilizando el directorio temporal del sistema.

## Límite de payloads

La API limita los payloads JSON a:

```text
1 MB
```

Los payloads que superen ese límite reciben un error controlado.

## Manejo de errores

La aplicación utiliza un middleware global de errores.

Los errores se devuelven con una estructura consistente:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descripción del error"
  }
}
```

Se contemplan, entre otros:

* Recursos inexistentes
* Datos inválidos
* Estados inválidos
* Cantidades inválidas
* Archivo requerido
* Tipo de archivo inválido
* Archivo demasiado grande
* Payload demasiado grande
* Errores internos

## Logging

Se utiliza Winston para el registro de eventos.

Los logs permiten registrar:

* Inicio de la aplicación
* Conexión a MongoDB
* Desconexión de MongoDB
* Errores HTTP
* Errores internos

Los archivos de logs locales no forman parte del repositorio.

## Swagger

La documentación de la API se encuentra disponible en:

```text
http://localhost:3000/api/docs
```

Swagger se encuentra habilitado fuera de producción.

## Endpoints internos

Los endpoints de mocks y logger se consideran endpoints internos.

En producción se encuentran restringidos mediante el middleware correspondiente.

Endpoints:

```text
/api/mocks
/api/logger
```

## Mocks

El módulo de mocks permite generar datos de prueba para:

* Usuarios
* Drivers
* Pedidos
* Entregas

Las cantidades son validadas y se utilizan constantes del proyecto para mantener consistencia con los modelos.

## Docker

El proyecto incluye un `Dockerfile` basado en:

```text
node:22-alpine
```

### Construir la imagen

```bash
docker build -t shipnow:latest .
```

### Ejecutar el contenedor

```bash
docker run --name shipnow-api --rm --env-file .env -p 3000:3000 shipnow:latest
```

La configuración sensible se proporciona mediante variables de entorno y no se incorpora a la imagen.

### Verificar el contenedor

Health check:

```text
http://localhost:3000/api/health
```

También pueden verificarse los endpoints principales, por ejemplo:

```text
GET /api/users?page=1&limit=10
GET /api/orders?page=1&limit=10
GET /api/deliveries?page=1&limit=10
```

## `.dockerignore`

La imagen excluye archivos y directorios que no deben formar parte del contenedor, entre ellos:

```text
node_modules/
.env
.git/
logs/
uploads/
coverage/
*.log
*.tmp
*.temp
```

## `.gitignore`

El repositorio excluye:

* `node_modules`
* `.env`
* logs
* uploads
* coverage
* archivos temporales
* configuraciones de IDE

El archivo `.env` nunca debe subirse al repositorio.

## Validación final

El proyecto fue validado mediante:

* Tests funcionales con Mocha, Chai y Supertest.
* Conexión a MongoDB.
* Health check.
* Paginación.
* Validaciones de API.
* Manejo global de errores.
* Upload de archivos con restricciones.
* Construcción de imagen Docker.
* Ejecución de la API dentro de Docker.
* Conexión de la aplicación Dockerizada con MongoDB.

Resultado actual de la suite:

```text
16 passing
```

## Estructura principal

```text
ShipNow/
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── errors/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── utils/
├── tests/
├── uploads/
├── logs/
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Seguridad

No incluir en Git:

```text
.env
```

ni credenciales, contraseñas, tokens, claves JWT o cadenas privadas de conexión a servicios externos.

La configuración debe proporcionarse mediante variables de entorno.
