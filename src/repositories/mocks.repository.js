import { faker } from "@faker-js/faker";

import User from "../models/User.js";
import Driver from "../models/Driver.js";
import Order from "../models/Order.js";
import Delivery from "../models/Delivery.js";

import {
    USER_ROLES,
    ORDER_STATUS,
    DELIVERY_STATUS,
    PRIORITY
} from "../constants/index.js";

class MocksRepository {

    generateUsers(quantity = 10) {

        const users = [];

        for (let i = 0; i < quantity; i++) {

            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: USER_ROLES.USER
            });

        }

        return users;
    }

    generateDrivers(quantity = 5) {

        const drivers = [];

        for (let i = 0; i < quantity; i++) {

            drivers.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                role: USER_ROLES.DRIVER
            });

        }

        return drivers;
    }

    generateOrders(users, quantity = 10) {

        const orders = [];

        for (let i = 0; i < quantity; i++) {

            const user =
                users[Math.floor(Math.random() * users.length)];

            orders.push({

                user: user?._id,

                sender: faker.person.fullName(),

                recipient: faker.person.fullName(),

                origin: faker.location.city(),

                destination: faker.location.city(),

                description: faker.lorem.sentence(),

                status: faker.helpers.arrayElement([
                    ORDER_STATUS.PENDING,
                    ORDER_STATUS.IN_TRANSIT,
                    ORDER_STATUS.DELIVERED
                ]),

                priority: faker.helpers.arrayElement([
                    PRIORITY.LOW,
                    PRIORITY.MEDIUM,
                    PRIORITY.HIGH
                ])

            });

        }

        return orders;
    }

    generateDeliveries(orders, drivers) {

        const deliveries = [];

        orders.forEach(order => {

            const driver =
                drivers[Math.floor(Math.random() * drivers.length)];

            deliveries.push({

                order: order._id,

                driver: driver?._id,

                status: faker.helpers.arrayElement([
                    DELIVERY_STATUS.ASSIGNED,
                    DELIVERY_STATUS.ON_THE_WAY,
                    DELIVERY_STATUS.DELIVERED
                ])

            });

        });

        return deliveries;
    }

    async populateDatabase() {

        await User.deleteMany({});
        await Driver.deleteMany({});
        await Order.deleteMany({});
        await Delivery.deleteMany({});

        const users =
            await User.insertMany(this.generateUsers());

        const drivers =
            await Driver.insertMany(this.generateDrivers());

        const orders =
            await Order.insertMany(
                this.generateOrders(users)
            );

        const deliveries =
            await Delivery.insertMany(
                this.generateDeliveries(
                    orders,
                    drivers
                )
            );

        return {
            users: users.length,
            drivers: drivers.length,
            orders: orders.length,
            deliveries: deliveries.length
        };
    }
}

export default new MocksRepository();