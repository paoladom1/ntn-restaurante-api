import mongoose from "mongoose";
import Food from "./food";
import User from "./user";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    status: {
        type: String,
        required: true,
        enum: ["IN PROGRESS", "DELIVERED", "CANCELED"],
        default: "IN PROGRESS"
    },
    date: { type: Date, default: Date.now() },
    products: { type: [Food.schema], required: true },
    subtotal: { type: Number },
    total: { type: Number }
});

OrderSchema.pre("save", function(next) {
    const order = this;

    const subtotal = order.products.reduce(
        (acumulator, { price }) => price + acumulator,
        0
    );
    const total = subtotal + subtotal * 0.13;

    //console.log(`order.products: ${order.products}, total: ${total}`);
    order.subtotal = subtotal;
    order.total = total;

    next();
});

module.exports = mongoose.model("Order", OrderSchema);
