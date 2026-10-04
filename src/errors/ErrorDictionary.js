import ErrorCodes from "./ErrorCodes.js";

const ErrorDictionary = {

    [ErrorCodes.USER_NOT_FOUND]: {
        status: 404,
        message: "Usuario no encontrado"
    },

    [ErrorCodes.PRODUCT_NOT_FOUND]: {
        status: 404,
        message: "Producto no encontrado"
    },

    [ErrorCodes.ORDER_NOT_FOUND]: {
        status: 404,
        message: "Pedido no encontrado"
    },

    [ErrorCodes.INVALID_STATUS]: {
        status: 400,
        message: "Estado inválido"
    },

    [ErrorCodes.INVALID_QUANTITY]: {
        status: 400,
        message: "Cantidad inválida"
    },

    [ErrorCodes.DATABASE_ERROR]: {
        status: 500,
        message: "Error en la base de datos"
    },

    [ErrorCodes.VALIDATION_ERROR]: {
        status: 400,
        message: "Datos inválidos"
    }

};

export default ErrorDictionary;