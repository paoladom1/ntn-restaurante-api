import mongoose from "mongoose";
import client from "../models/client";
import employee from "../models/employee";
import menu from "../models/menu";

const Schema = mongoose.Schema;

const schema = new Schema({
    client:client.schema,
    employee:employee.schema,
    food:[menu.schema],
    subtotal:String,
    total:String
    
});

module.exports = mongoose.model("Order", schema);