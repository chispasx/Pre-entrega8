import env from "../config/env.config.js";

class HealthController {

    getHealth(req, res) {

        res.status(200).json({
            status: "ok",
            environment: env.NODE_ENV,
            uptime: process.uptime(),
            timestamp: new Date().toISOString()
        });

    }
}

export default new HealthController();