import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "CLIENT", "EMPLOYEE"],
    default: "CLIENT"
  }
});

module.exports = mongoose.model("Role", RoleSchema);
