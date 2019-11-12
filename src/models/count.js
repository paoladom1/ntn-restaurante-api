import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
    username:String,
    password:String
    
});

module.exports = mongoose.model("Count", schema);