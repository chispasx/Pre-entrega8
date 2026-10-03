import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",

    info: {
        title: "ShipNow API",
        version: "1.0.0",
        description:
            "API REST de ShipNow desarrollada con Node.js, Express y MongoDB. " +
            "La aplicación permite gestionar usuarios y productos, generar datos " +
            "mock para pruebas, validar el sistema de logging y manejar errores " +
            "de forma centralizada."
    },

    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor local"
        }
    ],

    tags: [
        {
            name: "Users",
            description: "Operaciones relacionadas con usuarios"
        },
        {
            name: "Products",
            description: "Operaciones relacionadas con productos"
        },
        {
            name: "Orders",
            description: "Datos relacionados con pedidos"
        },
        {
            name: "Deliveries",
            description: "Datos relacionados con entregas"
        },
        {
            name: "Mocks",
            description: "Generación y carga de datos de prueba"
        },
        {
            name: "Logger",
            description:
                "Herramientas de validación del sistema de logging. No representa una funcionalidad de negocio."
        },
        {
            name: "Health",
            description: "Verificación del estado de la API"
        }

    ],

    components: {
        schemas: {
            User: {
                type: "object",
                description: "Usuario registrado en ShipNow.",
                properties: {
                    _id: {
                        type: "string",
                        example: "665abc123456789012345678"
                    },
                    name: {
                        type: "string",
                        example: "Juan Pérez"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "juan@email.com"
                    },
                    password: {
                        type: "string",
                        example: "123456"
                    },
                    role: {
                        type: "string",
                        example: "user"
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time"
                    }
                }
            },

            Product: {
                type: "object",
                description: "Producto disponible en ShipNow.",
                properties: {
                    _id: {
                        type: "string",
                        example: "665abc123456789012345678"
                    },
                    title: {
                        type: "string",
                        example: "Auriculares Bluetooth"
                    },
                    description: {
                        type: "string",
                        example:
                            "Auriculares inalámbricos con conexión Bluetooth"
                    },
                    price: {
                        type: "number",
                        example: 25000
                    },
                    stock: {
                        type: "integer",
                        example: 15
                    },
                    status: {
                        type: "string",
                        example: "available"
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time"
                    }
                }
            },

            OrderItem: {
                type: "object",
                description: "Producto incluido dentro de un pedido.",
                properties: {
                    product: {
                        type: "string",
                        example: "665abc123456789012345678"
                    },
                    quantity: {
                        type: "integer",
                        minimum: 1,
                        example: 2
                    },
                    price: {
                        type: "number",
                        example: 1500
                    }
                }
            },

            Order: {
                type: "object",
                description: "Pedido generado por ShipNow.",
                properties: {
                    _id: {
                        type: "string",
                        example: "665abc456789012345678901"
                    },
                    user: {
                        type: "string",
                        example: "665abc123456789012345678"
                    },
                    status: {
                        type: "string",
                        example: "pending"
                    },
                    priority: {
                        type: "string",
                        example: "medium"
                    },
                    items: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/OrderItem"
                        }
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time"
                    }
                }
            },

            Delivery: {
                type: "object",
                description:
                    "Entrega asociada a un pedido y un repartidor.",
                properties: {
                    _id: {
                        type: "string",
                        example: "665abc789012345678901234"
                    },
                    order: {
                        type: "string",
                        example: "665abc456789012345678901"
                    },
                    driver: {
                        type: "string",
                        example: "665abd000123456789012345"
                    },
                    status: {
                        type: "string",
                        example: "assigned"
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time"
                    },
                    updatedAt: {
                        type: "string",
                        format: "date-time"
                    }
                }
            },

            Driver: {
                type: "object",
                description: "Repartidor generado para pruebas.",
                properties: {
                    _id: {
                        type: "string",
                        example: "driver-0"
                    },
                    name: {
                        type: "string",
                        example: "Carlos Gómez"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "carlos@example.com"
                    },
                    role: {
                        type: "string",
                        example: "driver"
                    }
                }
            },

            ErrorResponse: {
                type: "object",
                description:
                    "Respuesta utilizada por el middleware centralizado de errores.",
                properties: {
                    success: {
                        type: "boolean",
                        example: false
                    },
                    error: {
                        type: "object",
                        properties: {
                            code: {
                                type: "string",
                                example: "VALIDATION_ERROR"
                            },
                            message: {
                                type: "string",
                                example:
                                    "Los datos enviados no son válidos."
                            },
                            details: {
                                nullable: true,
                                example: null
                            }
                        }
                    }
                }
            },

            SuccessResponse: {
                type: "object",
                description: "Respuesta exitosa genérica de la API.",
                properties: {
                    success: {
                        type: "boolean",
                        example: true
                    },
                    message: {
                        type: "string",
                        example:
                            "Datos de prueba insertados correctamente."
                    },
                    data: {
                        nullable: true,
                        description:
                            "Información adicional devuelta por la operación.",
                        example: {}
                    }
                }
            }
        }
    }
};

const swaggerOptions = {
    definition: swaggerDefinition,
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;

