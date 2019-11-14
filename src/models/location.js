import mongoose from "mongoose";
import User from "./user";
import Order from "./order";

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
    address: String,
    city: String,
    department: String,
    employees: [User.schema],
    orders: [Order.schema]
});

module.exports = mongoose.model("Location", LocationSchema);
