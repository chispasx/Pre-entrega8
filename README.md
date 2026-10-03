## Pre-entrega Módulo 8 — Performance, escalabilidad y Docker
# ShipNow API

API REST desarrollada con Node.js, Express y MongoDB. El proyecto incluye manejo centralizado de errores, logging con Winston, Swagger/OpenAPI, generación de datos mock, paginación, límites de payload y carga de archivos con Multer.

## Requisitos

- Node.js 22 o superior
- MongoDB accesible desde la aplicación
- Docker (opcional)

## Variables de entorno

Copiar `.env.example` a `.env` y completar los valores reales:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/shipnow
NODE_ENV=development
JWT_SECRET=change-this-secret
LOG_LEVEL=info
EXTERNAL_API_URL=
```

Valores posibles para `NODE_ENV`: `development`, `testing` y `production`. Valores posibles para `LOG_LEVEL`: `fatal`, `error`, `warning`, `info`, `http` y `debug`.

Las variables críticas se validan al iniciar. Si falta `PORT`, `MONGODB_URI`, `NODE_ENV`, `JWT_SECRET` o `LOG_LEVEL`, o si contienen un valor inválido, la aplicación falla durante el arranque con un mensaje claro.

**Nunca subir `.env` al repositorio.** El archivo `.env.example` solo debe contener valores de ejemplo y nunca credenciales reales.

## Ejecución local

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Ejecutar con Node:

```bash
npm start
```

La API utiliza por defecto el puerto `3000`.

## Testing

Ejecutar los tests:

```bash
npm test
```

Los tests actuales validan el health check sin necesidad de levantar un servidor HTTP.

## Swagger

En `development` y `testing`, Swagger está disponible en:

```text
http://localhost:3000/api/docs
```

En `production`, Swagger se deshabilita para reducir superficie de exposición.

## Health check

```http
GET /api/health
```

Respuesta de ejemplo:

```json
{
  "status": "ok",
  "environment": "development",
  "uptime": 123.45,
  "timestamp": "2026-09-08T14:20:00.000Z"
}
```

No expone credenciales, URI de base de datos ni secretos.

## Performance

Los listados de usuarios y productos utilizan paginación y un límite máximo de 100 resultados por solicitud.

Usuarios:

```text
GET /api/users?page=1&limit=10
```

Productos:

```text
GET /api/products?page=1&limit=10
```

Las consultas usan `skip`, `limit`, filtros y `lean()` cuando corresponde, evitando devolver colecciones completas sin control.

Además, el JSON de entrada tiene un límite de `1 MB`.

Los endpoints mock limitan la cantidad generada a un máximo de 100 elementos.

## Uploads

Multer permite únicamente imágenes JPG, PNG y WEBP, con un máximo de `5 MB` y un archivo por solicitud. Los errores de tamaño y tipo se transforman mediante el middleware centralizado.

Los archivos temporales se guardan en el directorio temporal del sistema (`os.tmpdir()/shipnow-uploads`), no dentro del repositorio ni de la imagen Docker. Esto evita utilizar el repositorio como almacenamiento permanente. En un entorno productivo real, los archivos deberían migrarse a un almacenamiento dedicado (por ejemplo, un servicio de objetos).

## Logs

Winston utiliza el nivel indicado por `LOG_LEVEL`. Los errores se rotan diariamente y se conservan durante 14 días. Los directorios `logs/` y los archivos `.log` están excluidos del repositorio y de la imagen Docker.

## Endpoints internos

Los endpoints `/api/mocks/*` y `/api/logger/test` son herramientas de desarrollo/testing. En `production` se restringen y responden como recurso no encontrado.

Swagger también se deshabilita en `production`.

## Docker

Construir la imagen:

```bash
docker build -t shipnow .
```

Ejecutar el contenedor pasando las variables desde un archivo externo:

```bash
docker run --env-file .env -p 3000:3000 shipnow
```

La API queda disponible en:

```text
http://localhost:3000
```

Probar:

```text
Health:  http://localhost:3000/api/health
Swagger: http://localhost:3000/api/docs
Users:   http://localhost:3000/api/users?page=1&limit=10
```

El contenedor usa Node 22 Alpine, instala únicamente dependencias de producción, expone el puerto `3000` y ejecuta `npm start`. La configuración se inyecta en tiempo de ejecución mediante `--env-file` o la plataforma de despliegue.

## Archivos que no deben subirse

El repositorio excluye mediante `.gitignore`:

- `.env`
- `node_modules/`
- `logs/`
- `uploads/`
- `coverage/`
- archivos temporales y logs

`.dockerignore` también evita copiar secretos, Git, dependencias locales, logs, uploads y archivos de coverage a la imagen.

## Estructura relevante

```text
src/
├── config/
│   ├── db.js
│   ├── env.config.js
│   ├── logger.js
│   └── swagger.js
├── controllers/
├── middlewares/
│   ├── errorHandler.js
│   ├── internalOnly.js
│   └── upload.middleware.js
├── repositories/
├── routes/
├── services/
└── models/
Dockerfile
.dockerignore
.env.example
```
## Autora: Maria Guadalupe Mercado Avila 
