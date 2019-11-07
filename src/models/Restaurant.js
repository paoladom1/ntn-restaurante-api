import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  Code: Number,
  Name: String,
  Direction: String,
  Location: [String],
  Menu: [String]
});

module.exports = mongoose.model("Restaurant", schema);
