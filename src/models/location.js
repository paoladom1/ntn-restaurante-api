import mongoose from "mongoose";
import Order from "./order";

const Schema = mongoose.Schema;

const LocationSchema = new Schema(
    {
        address: String,
        city: String,
        department: String,
        phone: String,
        orders: [Order.schema]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Location", LocationSchema);
