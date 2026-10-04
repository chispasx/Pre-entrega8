import { Router } from "express";
import mocksController from "../controllers/mocks.controller.js";

const router = Router();

/**
 * @swagger
 * /api/mocks/users:
 *   get:
 *     summary: Generar usuarios mock
 *     description: Genera usuarios ficticios para realizar pruebas. La cantidad puede indicarse mediante el parámetro quantity.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de usuarios a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         example: 10
 *     responses:
 *       200:
 *         description: Usuarios mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       400:
 *         description: Cantidad inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/users", mocksController.getMockUsers);

/**
 * @swagger
 * /api/mocks/drivers:
 *   get:
 *     summary: Generar repartidores mock
 *     description: Genera repartidores ficticios para pruebas.
 *     tags:
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de repartidores a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 5
 *         example: 5
 *     responses:
 *       200:
 *         description: Repartidores mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Driver'
 *       400:
 *         description: Cantidad inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/drivers", mocksController.getMockDrivers);

/**
 * @swagger
 * /api/mocks/orders:
 *   get:
 *     summary: Generar pedidos mock
 *     description: Genera pedidos ficticios para pruebas.
 *     tags:
 *       - Orders
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de pedidos a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         example: 10
 *     responses:
 *       200:
 *         description: Pedidos mock generados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       400:
 *         description: Cantidad inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/orders", mocksController.getMockOrders);

/**
 * @swagger
 * /api/mocks/deliveries:
 *   get:
 *     summary: Generar entregas mock
 *     description: Genera entregas ficticias asociadas a pedidos y repartidores para pruebas.
 *     tags:
 *       - Deliveries
 *       - Mocks
 *     parameters:
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Cantidad de entregas a generar.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         example: 10
 *     responses:
 *       200:
 *         description: Entregas mock generadas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Delivery'
 *       400:
 *         description: Cantidad inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/deliveries", mocksController.getMockDeliveries);

/**
 * @swagger
 * /api/mocks/populate:
 *   post:
 *     summary: Insertar datos mock en la base de datos
 *     description: Genera e inserta datos de prueba en MongoDB para facilitar las pruebas de la API.
 *     tags:
 *       - Mocks
 *     responses:
 *       201:
 *         description: Datos de prueba insertados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/populate", mocksController.populateDatabase);

export default router;