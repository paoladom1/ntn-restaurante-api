import mongoose from "mongoose";
import User from "./user";
import Food from "./food";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  client: User,
  employee: User,
  products: [Food.schema],
  subtotal: Number,
  total: Number
});

module.exports = mongoose.model("Order", OrderSchema);
