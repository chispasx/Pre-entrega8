import winston from "winston";
import "winston-daily-rotate-file";
import { env } from "./env.config.js";

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
};

const colors = {
    fatal: "magenta",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "cyan",
    debug: "blue"
};

winston.addColors(colors);

const consoleTransport = new winston.transports.Console({
    level: env.LOG_LEVEL,
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
    )
});

const fileRotateTransport = new winston.transports.DailyRotateFile({
    dirname: "logs",
    filename: "errors-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
    level: "error",
    zippedArchive: false,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
});

const logger = winston.createLogger({
    levels,
    transports: [consoleTransport, fileRotateTransport]
});

export default logger;
