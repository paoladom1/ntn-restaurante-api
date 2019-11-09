import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  name: String,
  amount_of_people: Number,
  reservation: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", schema);
