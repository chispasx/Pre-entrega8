import fs from "node:fs/promises";

class UploadsController {
  async uploadImage(req, res, next) {
    if (!req.file) {
      return res.status(400).json({ success: false, error: { code: "FILE_REQUIRED", message: "Tenés que adjuntar una imagen en el campo 'file'." } });
    }
    const metadata = { originalName: req.file.originalname, mimeType: req.file.mimetype, size: req.file.size };
    // Esta ruta es una validación de carga temporal, no un almacenamiento permanente.
    try {
      await fs.unlink(req.file.path);
      return res.status(201).json({ success: true, message: "Imagen validada; archivo temporal eliminado.", file: metadata });
    } catch (error) { return next(error); }
  }
}
export default new UploadsController();
