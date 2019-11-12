import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
    direction:String,
    city:String,
    departament:String
});

module.exports = mongoose.model("Location", schema);