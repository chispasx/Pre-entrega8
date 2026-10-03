import usersRepository from "../repositories/users.repository.js";
import CustomError from "../errors/CustomError.js";
import ErrorCodes from "../errors/ErrorCodes.js";
import logger from "../config/logger.js";

class UsersService {

    async getUsers(page = 1, limit = 10) {

    logger.http(`Obteniendo usuarios - página ${page}, límite ${limit}`);

    return await usersRepository.getAll({
        page,
        limit
    });
}

    async createUser(userData) {
        const { name, email, password, role } = userData;

        if (!name || !email || !password) {
            throw new CustomError(
                ErrorCodes.VALIDATION_ERROR,
                "Nombre, email y contraseña son obligatorios."
            );
        }

        logger.info(`Creando usuario: ${email}`);

        return await usersRepository.create({
            name,
            email,
            password,
            role: role || "user"
        });
    }

}

export default new UsersService();