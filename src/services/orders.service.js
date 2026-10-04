import ordersRepository from "../repositories/orders.repository.js";
import CustomError from "../errors/CustomError.js";
import ErrorCodes from "../errors/ErrorCodes.js";

class OrdersService {

    async getOrders(options) {
        return ordersRepository.getAll(options);
    }

    async getOrderById(id) {

        const order = await ordersRepository.getById(id);

        if (!order) {
            throw new CustomError(
                ErrorCodes.ORDER_NOT_FOUND,
                "Pedido no encontrado."
            );
        }

        return order;
    }

    async createOrder(orderData) {

        const {
            sender,
            recipient,
            origin,
            destination,
            description,
            status,
            priority,
            user
        } = orderData;

        if (
            !sender ||
            !recipient ||
            !origin ||
            !destination ||
            !description
        ) {
            throw new CustomError(
                ErrorCodes.VALIDATION_ERROR,
                "Sender, recipient, origin, destination y description son obligatorios."
            );
        }

        if (
            status &&
            !Object.values({
                PENDING: "PENDING",
                IN_TRANSIT: "IN_TRANSIT",
                DELIVERED: "DELIVERED"
            }).includes(status)
        ) {
            throw new CustomError(
                ErrorCodes.INVALID_STATUS,
                "Estado de pedido inválido."
            );
        }

        return ordersRepository.create({
            sender,
            recipient,
            origin,
            destination,
            description,
            status: status || "PENDING",
            priority: priority || "MEDIUM",
            ...(user ? { user } : {})
        });
    }

    async updateOrder(id, data) {

        if (
            data.status &&
            !["PENDING", "IN_TRANSIT", "DELIVERED"].includes(data.status)
        ) {
            throw new CustomError(
                ErrorCodes.INVALID_STATUS,
                "Estado de pedido inválido."
            );
        }

        const order = await ordersRepository.update(id, data);

        if (!order) {
            throw new CustomError(
               ErrorCodes.ORDER_NOT_FOUND,
                "Pedido no encontrado."
            );
        }

        return order;
    }
}

export default new OrdersService();