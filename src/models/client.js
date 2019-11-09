import mongoose from "mongoose";
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  email: String,
  dui: String
});

module.exports = mongoose.model("Client", schema);
