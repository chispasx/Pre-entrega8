import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerSpec from "./config/swagger.js";
import env from "./config/env.config.js";

const app = express();

// Límite de payload para evitar solicitudes JSON innecesariamente grandes.
app.use(express.json({ limit: "1mb" }));

// Swagger se mantiene disponible en desarrollo/testing. En producción se oculta.
if (env.NODE_ENV !== "production") {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use("/api", routes);
app.use(errorHandler);

export default app;
