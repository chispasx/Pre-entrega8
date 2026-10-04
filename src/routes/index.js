import { Router } from "express";

import productsRoutes from "./products.routes.js";
import usersRoutes from "./users.routes.js";
import mocksRoutes from "./mocks.routes.js";
import loggerRoutes from "./logger.routes.js";
import healthRoutes from "./health.routes.js";
import ordersRoutes from "./orders.routes.js";
import deliveriesRoutes from "./deliveries.routes.js";
import uploadsRoutes from "./uploads.routes.js";
import internalOnly from "../middlewares/internalOnly.js";

const router = Router();

/**
 * Ruta principal de la API.
 */
router.get("/", (req, res) => {
    res.json({
        message: "Bienvenido a ShipNow API"
    });
});

router.use("/products", productsRoutes);
router.use("/orders", ordersRoutes);
router.use("/deliveries", deliveriesRoutes);
router.use("/uploads", uploadsRoutes);
router.use("/users", usersRoutes);
router.use("/mocks", internalOnly, mocksRoutes);
router.use("/logger", internalOnly, loggerRoutes);
router.use("/health", healthRoutes);
export default router;