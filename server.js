import app from "./src/app.js";
import { env } from "./src/config/env.config.js";
import connectDB from "./src/config/db.js";
import logger from "./src/config/logger.js";

const startServer = async () => {
    try {
        await connectDB();

        app.listen(env.PORT, () => {
            logger.info(`Servidor corriendo en http://localhost:${env.PORT}`);
        });
    } catch (error) {
        logger.error(`No se pudo iniciar ShipNow: ${error.message}`);
        process.exit(1);
    }
};

startServer();
