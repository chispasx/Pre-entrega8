import mongoose from "mongoose";
import { ORDER_STATUS, PRIORITY } from "../constants/index.js";

const orderSchema = new mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
            trim: true
        },

        recipient: {
            type: String,
            required: true,
            trim: true
        },

        origin: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },

        status: {
            type: String,
            enum: Object.values(ORDER_STATUS),
            default: ORDER_STATUS.PENDING
        },

        priority: {
            type: String,
            enum: Object.values(PRIORITY),
            default: PRIORITY.MEDIUM
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema);