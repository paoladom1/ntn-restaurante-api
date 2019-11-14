import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: String,
  amount_of_people: Number,
  reservation: { type: Date, required: true }
});

module.exports = mongoose.model("Event", EventSchema);
