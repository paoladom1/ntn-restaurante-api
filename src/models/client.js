import mongoose from "mongoose";
import count from "../models/count";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  email: String,
  dui: String,
  phone:String,
  count:[count.schema]
});

module.exports = mongoose.model("Client", schema);
