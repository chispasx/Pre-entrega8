import mocksRepository from "../repositories/mocks.repository.js";
import CustomError from "../errors/CustomError.js";
import ErrorCodes from "../errors/ErrorCodes.js";
import logger from "../config/logger.js";

class MocksService {

    getMockUsers(quantity = 10) {

       if (quantity <= 0 || quantity > 100) {
    throw new CustomError(
        ErrorCodes.INVALID_QUANTITY,
        "La cantidad debe estar entre 1 y 100"
    );
}
        logger.http("Generando usuarios mock");

        return mocksRepository.generateUsers(quantity);

    }

    getMockDrivers(quantity = 5) {

      if (quantity <= 0 || quantity > 100) {
    throw new CustomError(
        ErrorCodes.INVALID_QUANTITY,
        "La cantidad debe estar entre 1 y 100"
    );
}
        logger.http("Generando repartidores mock");

        return mocksRepository.generateDrivers(quantity);

    }

    getMockOrders(quantity = 10) {

       if (quantity <= 0 || quantity > 100) {
    throw new CustomError(
        ErrorCodes.INVALID_QUANTITY,
        "La cantidad debe estar entre 1 y 100"
    );
}
        logger.http("Generando pedidos mock");

        const users = mocksRepository.generateUsers(quantity).map((user, index) => ({
            ...user,
            _id: `user-${index}`
        }));

        return mocksRepository.generateOrders(users);

    }

    getMockDeliveries(quantity = 10) {

        if (quantity <= 0 || quantity > 100) {
    throw new CustomError(
        ErrorCodes.INVALID_QUANTITY,
        "La cantidad debe estar entre 1 y 100"
    );
}

        logger.http("Generando entregas mock");

        const users = mocksRepository.generateUsers(quantity).map((user, index) => ({
            ...user,
            _id: `user-${index}`
        }));

        const drivers = mocksRepository.generateDrivers(5).map((driver, index) => ({
            ...driver,
            _id: `driver-${index}`
        }));

        const orders = mocksRepository.generateOrders(users).map((order, index) => ({
            ...order,
            _id: `order-${index}`
        }));

        return mocksRepository.generateDeliveries(
            orders,
            drivers
        );

    }

    async populateDatabase() {

        logger.info("Insertando datos mock en MongoDB");

        return await mocksRepository.populateDatabase();

    }

}

export default new MocksService();