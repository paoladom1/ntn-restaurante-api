import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
  Name: String,
  Amount_of_people: Number,
  Reservation: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", schema);
