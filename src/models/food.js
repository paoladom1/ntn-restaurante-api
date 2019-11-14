import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, minlength: 8, maxlength: 50 },
    price: { type: Number, required: true },
})

module.exports = mongoose.model("Food", FoodSchema)