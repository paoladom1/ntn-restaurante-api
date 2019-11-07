import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  Code: Number,
  Name: String,
  Position: [String]
});

module.exports = mongoose.model("Employee", schema);
