import mongoose from "mongoose";
import { DELIVERY_STATUS } from "../constants/index.js";

const deliverySchema = new mongoose.Schema({

    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },

    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        required: true
    },

    status: {
        type: String,
        default: DELIVERY_STATUS.ASSIGNED
    }

}, {
    timestamps: true
});

export default mongoose.model("Delivery", deliverySchema);