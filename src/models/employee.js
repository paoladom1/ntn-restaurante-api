import mongoose from "mongoose";
import count from "../models/count";

const Schema = mongoose.Schema;

const schema = new Schema({
  code: Number,
  name: String,
  position: [String],
  count:[count]
});

module.exports = mongoose.model("Employee", schema);
