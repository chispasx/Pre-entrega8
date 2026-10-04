import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import connectDB, { disconnectDB } from "../src/config/db.js";
import User from "../src/models/User.js";
import Order from "../src/models/Order.js";
import Delivery from "../src/models/Delivery.js";

const createUser = async () => {
  const email = `test-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;
  const res = await request(app)
    .post("/api/users")
    .send({ name: "Usuario Test", email, password: "123456" });
  expect(res.status).to.equal(201);
  expect(res.body.success).to.equal(true);
  expect(res.body.data).to.have.property("_id");
  expect(res.body.data).to.not.have.property("password");
  return res.body.data;
};

const createOrder = async () => {
  const res = await request(app)
    .post("/api/orders")
    .send({
      sender: "Juan",
      recipient: "Ana",
      origin: "Córdoba",
      destination: "Rosario",
      description: "Caja de prueba"
    });
  expect(res.status).to.equal(201);
  expect(res.body.success).to.equal(true);
  expect(res.body.data).to.have.property("_id");
  return res.body.data;
};

before(async () => {
  await connectDB();
});

beforeEach(async () => {
  await Promise.all([
    User.deleteMany({}),
    Order.deleteMany({}),
    Delivery.deleteMany({})
  ]);
});

after(async () => {
  await Promise.all([
    User.deleteMany({}),
    Order.deleteMany({}),
    Delivery.deleteMany({})
  ]);
  await disconnectDB();
});

describe("ShipNow API - pruebas funcionales", () => {
  describe("Usuarios", () => {
    it("obtiene usuarios correctamente", async () => {
      await createUser();

      const res = await request(app).get("/api/users?page=1&limit=10");

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.be.an("array");
      expect(res.body.pagination.page).to.equal(1);
      expect(res.body.pagination.limit).to.equal(10);
    });

    it("rechaza la creación de un usuario con datos incompletos", async () => {
      const res = await request(app)
        .post("/api/users")
        .send({ name: "Usuario incompleto" });

      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.error).to.have.property("code");
      expect(res.body.error.message).to.be.a("string");
    });
  });

  describe("Pedidos", () => {
    it("obtiene pedidos correctamente", async () => {
      await createOrder();

      const res = await request(app).get("/api/orders?page=1&limit=10");

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.be.an("array");
      expect(res.body.pagination.page).to.equal(1);
    });

    it("crea un pedido con datos válidos", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send({
          sender: "Juan",
          recipient: "Ana",
          origin: "Córdoba",
          destination: "Rosario",
          description: "Pedido de prueba"
        });

      expect(res.status).to.equal(201);
      expect(res.body.success).to.equal(true);
      expect(res.body.data).to.include({
        sender: "Juan",
        recipient: "Ana",
        origin: "Córdoba",
        destination: "Rosario",
        description: "Pedido de prueba",
        status: "PENDING"
      });
      expect(res.body.data).to.have.property("_id");
    });

    it("consulta un pedido por ID", async () => {
      const order = await createOrder();

      const res = await request(app).get(`/api/orders/${order._id}`);

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data._id).to.equal(order._id);
      expect(res.body.data.sender).to.equal("Juan");
    });

    it("actualiza el estado de un pedido correctamente", async () => {
      const order = await createOrder();

      const res = await request(app)
        .put(`/api/orders/${order._id}`)
        .send({ status: "IN_TRANSIT" });

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.data.status).to.equal("IN_TRANSIT");
    });

    it("rechaza un pedido con datos incompletos", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send({ sender: "Juan", recipient: "Ana" });

      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.error).to.have.property("code");
      expect(res.body.error.message).to.be.a("string");
    });

    it("rechaza un estado de pedido inválido", async () => {
      const res = await request(app)
        .post("/api/orders")
        .send({
          sender: "Juan",
          recipient: "Ana",
          origin: "Córdoba",
          destination: "Rosario",
          description: "Pedido inválido",
          status: "BAD"
        });

      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.error.code).to.equal("INVALID_STATUS");
      expect(res.body.error.message).to.be.a("string");
    });

    it("rechaza la consulta de un pedido inexistente", async () => {
      const res = await request(app).get("/api/orders/507f1f77bcf86cd799439011");

      expect(res.status).to.equal(404);
      expect(res.body.success).to.equal(false);
      expect(res.body.error).to.have.property("code");
      expect(res.body.error.message).to.be.a("string");
    });
  });

  describe("Mocks", () => {
    it("genera usuarios mock con cantidad válida", async () => {
      const res = await request(app).get("/api/mocks/users?quantity=3");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").with.lengthOf(3);
      expect(res.body[0]).to.have.property("email");
    });

    it("genera pedidos mock con cantidad válida", async () => {
      const res = await request(app).get("/api/mocks/orders?quantity=2");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").with.lengthOf(2);
      expect(res.body[0]).to.have.property("sender");
    });

    it("genera entregas mock con cantidad válida", async () => {
      const res = await request(app).get("/api/mocks/deliveries?quantity=2");

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array").with.lengthOf(2);
    });

    it("rechaza una cantidad inválida de mocks", async () => {
      const res = await request(app).get("/api/mocks/users?quantity=0");

      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.error.code).to.equal("INVALID_QUANTITY");
      expect(res.body.error.message).to.be.a("string");
    });
  });

  describe("Logger", () => {
    it("accede al endpoint de prueba del logger", async () => {
      const res = await request(app).get("/api/logger/test");

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.message).to.be.a("string");
    });
  });

  describe("Swagger", () => {
    it("permite acceder a la documentación", async () => {
      const res = await request(app).get("/api/docs/");

      expect(res.status).to.equal(200);
      expect(res.text).to.include("Swagger UI");
    });
  });

  describe("Errores generales", () => {
    it("devuelve un error JSON para una ruta inexistente", async () => {
      const res = await request(app).get("/api/ruta-que-no-existe");

      expect(res.status).to.equal(404);
      expect(res.body.success).to.equal(false);
      expect(res.body.error.code).to.equal("NOT_FOUND");
      expect(res.body.error.message).to.be.a("string");
    });
  });
});
