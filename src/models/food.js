import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: String,
    description: String,
    price: Number,
})

module.exports = mongoose.model("Food", FoodSchema)