import mongoose, { models } from "mongoose";
import Menu from "../models/menu";
import Location from "../models/location";

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: String,
  phone: String,
  location: [Location.schema],
  menu: [Menu.schema]
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
