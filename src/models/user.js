import mongoose from "mongoose";
import Role from "./role";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  dui: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: [Role.schema]
});

module.exports = mongoose.model("User", UserSchemaq);
