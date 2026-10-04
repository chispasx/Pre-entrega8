import Order from "../models/Order.js";

class OrdersRepository {

    async getAll({ page = 1, limit = 10, status } = {}) {

        const filter = {};

        if (status) {
            filter.status = status;
        }

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            Order.find(
                filter,
                { __v: 0 }
            )
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),

            Order.countDocuments(filter)
        ]);

        return {
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async getById(id) {
        return Order.findById(id)
            .select("-__v")
            .lean();
    }

    async create(data) {
        return Order.create(data);
    }

    async update(id, data) {
        return Order.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        )
            .select("-__v")
            .lean();
    }
}

export default new OrdersRepository();