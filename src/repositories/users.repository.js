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
        return User.findById(id);
    }

    async create(data) {
        return User.create(data);
    }

    async update(id, data) {
        return User.findByIdAndUpdate(id, data, {
            new: true
        });
    }

    async delete(id) {
        return User.findByIdAndDelete(id);
    }

}

export default new UsersRepository();