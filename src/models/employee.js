import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  code: Number,
  name: String,
  position: [String]
});

module.exports = mongoose.model("Employee", schema);
