import mongoose from "mongoose";
import Food from "./food";

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  entry: [Food.schema],
  breakfast: [Food.schema],
  lunch: [Food.schema],
  dessert: [Food.schema],
  drinks: [Food.schema]
});

module.exports = mongoose.model("Menu", MenuSchema);
