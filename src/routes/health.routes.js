import { Router } from "express";
import healthController from "../controllers/health.controller.js";

const router = Router();

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check de la API
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 environment:
 *                   type: string
 *                   example: development
 *                 uptime:
 *                   type: number
 *                   example: 123.45
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */

router.get("/", healthController.getHealth);

export default router;