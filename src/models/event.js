import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  client: {type: Schema.Types.ObjectId, ref: "User", required: true},
  phone: String,
  amount_of_people: {type: Number, required: true},
  date: { type: Date, required: true }
});

module.exports = mongoose.model("Event", EventSchema);
