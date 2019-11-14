import mongoose from "mongoose";
import User from "./user";
import Food from "./food";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    client: { type: User.schema, required: true },
    employee: { type: User.schema, required: true },
    products: { type: [Food.schema], required: true },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true }
});

module.exports = mongoose.model("Order", OrderSchema);
