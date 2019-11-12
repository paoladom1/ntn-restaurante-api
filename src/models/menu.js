import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
    entry: String,
    breakfast: String,
    lounch:String,
    dessert:String,
    drinks: String,
    price:String
});

module.exports = mongoose.model("Menu", schema);