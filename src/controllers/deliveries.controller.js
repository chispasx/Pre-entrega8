
import deliveriesService from "../services/deliveries.service.js";

class DeliveriesController {
  async getAll(req, res, next) {
    try {
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 10);

      if (
        !Number.isInteger(page) ||
        !Number.isInteger(limit) ||
        page < 1 ||
        limit < 1 ||
        limit > 100
      ) {
        return res.status(400).json({
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message:
              "page debe ser un entero mayor a 0 y limit debe estar entre 1 y 100."
          }
        });
      }

      const result = await deliveriesService.getDeliveries({
        page,
        limit,
        status: req.query.status
      });

      return res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DeliveriesController();
