import usersService from "../services/users.service.js";

class UsersController {

   async getAll(req, res, next) {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({
                success: false,
                error: {
                    code: "VALIDATION_ERROR",
                    message: "page debe ser mayor a 0 y limit debe estar entre 1 y 100."
                }
            });
        }

        const users = await usersService.getUsers(page, limit);

        res.status(200).json(users);

    } catch (error) {

        next(error);

    }
}

    async create(req, res, next) {

        try {

            const user = await usersService.createUser(req.body);

            res.status(201).json(user);

        } catch (error) {

            next(error);

        }

    }

}

export default new UsersController();