import multer from "multer";
import os from "os";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const uploadPath = path.join(os.tmpdir(), "shipnow-uploads");
fs.mkdirSync(uploadPath, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname).toLowerCase();
        const safeName = `${Date.now()}-${randomUUID()}${extension}`;
        cb(null, safeName);
    }
});

const allowedTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/webp"
]);

const fileFilter = (req, file, cb) => {
    if (allowedTypes.has(file.mimetype)) {
        return cb(null, true);
    }

    const error = new Error("Tipo de archivo no permitido. Solo se aceptan JPG, PNG y WEBP.");
    error.code = "INVALID_FILE_TYPE";
    cb(error);
};

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1
    },
    fileFilter
});

export default upload;
