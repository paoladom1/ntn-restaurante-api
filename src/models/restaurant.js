import mongoose, { models } from "mongoose";
import Food from "../models/food";
import Location from "../models/location";

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
  name: String,
  phone: String,
  locations: [Location.schema],
  menu: [Food.schema]
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
