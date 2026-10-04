import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import swaggerSpec from "./config/swagger.js";
import env from "./config/env.config.js";

const app = express();

app.use(express.json({ limit: "1mb" }));

if (env.NODE_ENV !== "production") {
    app.use(
        "/api/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec)
    );
}

app.use("/api", routes);

// Manejo de rutas inexistentes
app.use((req, res, next) => {

    const error = new Error("Ruta no encontrada.");

    error.code = "NOT_FOUND";

    next(error);
});

app.use(errorHandler);

export default app;