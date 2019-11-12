import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "CLIENT", "EMPLOYEE"]
  }
});

module.exports = mongoose.model("Role", RoleSchema);
