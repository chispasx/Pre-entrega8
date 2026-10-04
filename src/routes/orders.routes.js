import { Router } from "express";
import ordersController from "../controllers/orders.controller.js";

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Listar pedidos con paginación
 */
router.get("/", (req, res, next) =>
    ordersController.getAll(req, res, next)
);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Crear un pedido
 */
router.post("/", (req, res, next) =>
    ordersController.create(req, res, next)
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 */
router.get("/:id", (req, res, next) =>
    ordersController.getById(req, res, next)
);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Actualizar un pedido
 */
router.put("/:id", (req, res, next) =>
    ordersController.update(req, res, next)
);

export default router;