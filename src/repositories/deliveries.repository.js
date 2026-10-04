import Delivery from "../models/Delivery.js";

class DeliveriesRepository {
  async getAll({ page = 1, limit = 10, status } = {}) {
    const filter = {};
    if (status) filter.status = status;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Delivery.find(filter, { __v: 0 }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Delivery.countDocuments(filter)
    ]);
    return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }
}
export default new DeliveriesRepository();
