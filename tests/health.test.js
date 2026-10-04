import test from "node:test";
import assert from "node:assert/strict";

process.env.PORT ??= "3000";
process.env.MONGODB_URI ??= "mongodb://localhost:27017/shipnow-test";
process.env.NODE_ENV ??= "testing";
process.env.JWT_SECRET ??= "test-secret";
process.env.LOG_LEVEL ??= "error";

const { default: healthController } = await import("../src/controllers/health.controller.js");

test("health check devuelve el estado de la API sin información sensible", () => {
    let statusCode;
    let body;

    const res = {
        status(code) {
            statusCode = code;
            return this;
        },
        json(value) {
            body = value;
            return this;
        }
    };

    healthController.getHealth({}, res);

    assert.equal(statusCode, 200);
    assert.equal(body.status, "ok");
    assert.equal(body.environment, "testing");
    assert.equal(typeof body.uptime, "number");
    assert.equal(typeof body.timestamp, "string");
    assert.equal("MONGODB_URI" in body, false);
    assert.equal("JWT_SECRET" in body, false);
});
