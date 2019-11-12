import mongoose, { models } from "mongoose";
import menu from "../models/menu";
import location from "../models/location";

const Schema = mongoose.Schema;

const schema = new Schema({
  code: Number,
  name: String,
  phone:String,
  location: [location],
  menu: [menu]
});

module.exports = mongoose.model("Restaurant", schema);
