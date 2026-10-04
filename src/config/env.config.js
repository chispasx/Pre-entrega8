import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : ".env";

dotenv.config({ path: envFile });

const NODE_ENV =
  process.env.NODE_ENV || "development";

const PORT = Number(
  process.env.PORT || 3000
);

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://localhost:27017/shipnow";

const MONGODB_TEST_URI =
  process.env.MONGODB_TEST_URI ||
  "mongodb://localhost:27017/shipnow_test";

const LOG_LEVEL =
  process.env.LOG_LEVEL || "info";

const MAX_FILE_SIZE = Number(
  process.env.MAX_FILE_SIZE || 5242880
);

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || "uploads";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "development-only-secret";

const INTERNAL_LOGGER_ENABLED =
  process.env.INTERNAL_LOGGER_ENABLED === "true";

if (!Number.isInteger(PORT) || PORT <= 0) {
  throw new Error("PORT debe ser un número válido.");
}

if (
  !Number.isInteger(MAX_FILE_SIZE) ||
  MAX_FILE_SIZE <= 0
) {
  throw new Error("MAX_FILE_SIZE debe ser un número válido.");
}

export const env = Object.freeze({
  PORT,
  NODE_ENV,
  MONGODB_URI,
  MONGODB_TEST_URI,
  LOG_LEVEL,
  JWT_SECRET,
  MAX_FILE_SIZE,
  UPLOAD_DIR,
  INTERNAL_LOGGER_ENABLED
});

export default env;