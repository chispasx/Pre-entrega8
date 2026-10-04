import ErrorCodes from "../errors/ErrorCodes.js";
import ErrorDictionary from "../errors/ErrorDictionary.js";
import logger from "../config/logger.js";

const errorHandler = (error, req, res, next) => {

    logger.error(
        `${req.method} ${req.originalUrl} - ${error.message}`
    );

    if (error?.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            success: false,
            error: {
                code: "FILE_TOO_LARGE",
                message: "El archivo supera el tamaño máximo permitido de 5 MB."
            }
        });
    }

    if (error?.code === "INVALID_FILE_TYPE") {
        return res.status(400).json({
            success: false,
            error: {
                code: "INVALID_FILE_TYPE",
                message: error.message
            }
        });
    }

    if (error?.code === "entity.too.large") {
        return res.status(413).json({
            success: false,
            error: {
                code: "PAYLOAD_TOO_LARGE",
                message: "El payload JSON supera el tamaño máximo permitido de 1 MB."
            }
        });
    }

    if (error?.code === "NOT_FOUND") {
        return res.status(404).json({
            success: false,
            error: {
                code: "NOT_FOUND",
                message: error.message || "Recurso no encontrado."
            }
        });
    }

    if (error.code && ErrorDictionary[error.code]) {

        const errorInfo = ErrorDictionary[error.code];

        return res.status(errorInfo.status).json({
            success: false,
            error: {
                code: error.code,
                message: errorInfo.message
            }
        });
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            error: {
                code: ErrorCodes.VALIDATION_ERROR,
                message: "Datos inválidos."
            }
        });
    }

    return res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Error interno del servidor."
        }
    });
};

export default errorHandler;