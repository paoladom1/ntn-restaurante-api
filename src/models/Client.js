import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
  Name: String,
  Email: String,
  DUI: String
});

module.exports = mongoose.model("Client", schema);
