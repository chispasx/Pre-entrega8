import { Router } from "express";
import deliveriesController from "../controllers/deliveries.controller.js";
const router = Router();

/**
 * @swagger
 * /api/deliveries:
 *   get:
 *     summary: Listar entregas con paginación
 *     tags: [Deliveries]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *       - in: query
 *         name: status
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Página de entregas y metadatos de paginación.
 *       400:
 *         description: Parámetros de paginación inválidos.
 */
router.get("/", deliveriesController.getAll);
export default router;
