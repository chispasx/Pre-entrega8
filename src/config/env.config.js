import "dotenv/config";

const requiredVariables = [
    "PORT",
    "MONGODB_URI",
    "NODE_ENV",
    "JWT_SECRET",
    "LOG_LEVEL"
];

for (const variable of requiredVariables) {
    if (!process.env[variable]?.trim()) {
        throw new Error(
            `ERROR DE CONFIGURACIÓN: falta la variable de entorno ${variable}`
        );
    }
}

const port = Number(process.env.PORT);
const validEnvironments = ["development", "testing", "production"];
const validLogLevels = ["fatal", "error", "warning", "info", "http", "debug"];

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("ERROR DE CONFIGURACIÓN: PORT debe ser un número entre 1 y 65535");
}

if (!validEnvironments.includes(process.env.NODE_ENV)) {
    throw new Error(
        `ERROR DE CONFIGURACIÓN: NODE_ENV debe ser uno de: ${validEnvironments.join(", ")}`
    );
}

if (!validLogLevels.includes(process.env.LOG_LEVEL)) {
    throw new Error(
        `ERROR DE CONFIGURACIÓN: LOG_LEVEL debe ser uno de: ${validLogLevels.join(", ")}`
    );
}

const env = {
    PORT: port,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    LOG_LEVEL: process.env.LOG_LEVEL,
    EXTERNAL_API_URL: process.env.EXTERNAL_API_URL?.trim() || ""
};

export { env };
export default env;
