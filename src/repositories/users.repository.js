import User from "../models/User.js";

class UsersRepository {

    async getAll({ page = 1, limit = 10 } = {}) {

        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find(
                {},
                {
                    password: 0,
                    __v: 0
                }
            )
                .skip(skip)
                .limit(limit)
                .lean(),

            User.countDocuments()
        ]);

        return {
            data: users,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async getById(id) {
        return User.findById(id).select("-password -__v");
    }

    async create(data) {
        const user = await User.create(data);

        return User.findById(user._id)
            .select("-password -__v")
            .lean();
    }

    async update(id, data) {
        return User.findByIdAndUpdate(id, data, {
            new: true
        }).select("-password -__v");
    }

    async delete(id) {
        return User.findByIdAndDelete(id)
            .select("-password -__v");
    }

}

export default new UsersRepository();