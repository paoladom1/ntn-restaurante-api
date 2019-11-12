import mongoose from "mongoose";
import client from "../models/client";
import employee from "../models/employee";
import menu from "../models/menu";

const Schema = mongoose.Schema;

const schema = new Schema({
    client:client,
    employee:employee,
    food:[menu],
    subtotal:String,
    total:String
    
});

module.exports = mongoose.model("Order", schema);