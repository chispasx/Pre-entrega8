
import { Router } from "express";
import upload from "../middlewares/upload.middleware.js";
import uploadsController from "../controllers/uploads.controller.js";

const router = Router();

/**
 * @swagger
 * /api/uploads/image:
 *   post:
 *     summary: Validar una imagen mediante Multer
 *     description: Acepta JPG, PNG o WEBP hasta 5 MB. El archivo temporal se elimina luego de validar; no se conserva como almacenamiento permanente.
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Imagen validada y archivo temporal eliminado.
 *       400:
 *         description: Archivo faltante, tipo inválido o tamaño excedido.
 */
router.post(
  "/image",
  upload.single("file"),
  uploadsController.uploadImage.bind(uploadsController)
);

export default router;


