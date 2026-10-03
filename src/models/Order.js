import mongoose from "mongoose";
import { ORDER_STATUS, PRIORITY } from "../constants/index.js";

const orderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        default: ORDER_STATUS.PENDING
    },

    priority: {
        type: String,
        default: PRIORITY.MEDIUM
    }

}, {
    timestamps: true
});

export default mongoose.model("Order", orderSchema);