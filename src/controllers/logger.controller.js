import logger from "../config/logger.js";

class LoggerController {

    test(req, res) {

        logger.debug("Log de nivel DEBUG");

        logger.http("Log de nivel HTTP");

        logger.info("Log de nivel INFO");

        logger.warning("Log de nivel WARNING");

        logger.error("Log de nivel ERROR");

        logger.fatal("Log de nivel FATAL");

        res.status(200).json({
            success: true,
            message: "Todos los niveles de logger fueron ejecutados correctamente."
        });

    }

}

export default new LoggerController();