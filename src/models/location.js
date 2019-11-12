import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  address: String,
  city: String,
  departament: String
});

module.exports = mongoose.model("Location", LocationSchema);
