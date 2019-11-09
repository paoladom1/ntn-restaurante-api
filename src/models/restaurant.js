import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  code: Number,
  name: String,
  direction: String,
  location: [String],
  menu: [String]
});

module.exports = mongoose.model("Restaurant", schema);
