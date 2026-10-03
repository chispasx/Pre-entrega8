import dns from "dns";
import mongoose from "mongoose";
import env from "./env.config.js";
import logger from "./logger.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
        logger.info("MongoDB conectado");
    } catch (error) {
        logger.error(`Error al conectar con MongoDB: ${error.message}`);
        throw error;
    }
};

export default connectDB;
