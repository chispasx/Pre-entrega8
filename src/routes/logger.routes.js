import { Router } from "express";
import loggerController from "../controllers/logger.controller.js";

const router = Router();

/**
 * @swagger
 * /api/logger/test:
 *   get:
 *     summary: Probar el sistema de logging
 *     description: Ejecuta los diferentes niveles configurados del logger para verificar que el sistema de logging funcione correctamente. Este endpoint es únicamente una herramienta de validación y no representa una funcionalidad de negocio de ShipNow.
 *     tags:
 *       - Logger
 *     responses:
 *       200:
 *         description: Prueba del sistema de logging ejecutada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Todos los niveles de logger fueron ejecutados correctamente.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/test", loggerController.test);

export default router;