import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, maxlength: 200 },
    price: { type: Number, required: true },
    category: {
        type: String,
        enum: ["BREAKFAST", "BEVERAGE", "ENTREES", "MAIN", "DESSERT", "SNACKS"],
        default: "MAIN",
        required: true
    }
});

module.exports = mongoose.model("Food", FoodSchema);
