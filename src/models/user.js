import mongoose from "mongoose";
import Role from "./role";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_KEY } from "./../../config";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  dui: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: value => {
      if (!validator.isEmail(value)) throw new Error("email invalido");
    }
  },
  password: { type: String, required: true },
  roles: [Role.schema],
  tokens: [
    {
      type: String,
      required: true
    }
  ]
});

UserSchema.pre("save", function(next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.hash(user.password, 8, (error, hash) => {
      if(error) throw new Error("Un error ha ocurrido");

      user.password = hash;
    });
  }
  next();
});

UserSchema.methods.generateAuthToken = function () {
  // Generate an auth token for the user
  console.log(JWT_KEY)
  const user = this;
  const token = jwt.sign({ _id: user._id }, JWT_KEY);
  user.tokens = user.tokens.concat({ token });
  user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Credenciales invalidas" });
  }
  bcrypt.compare(password, user.password, (error, res) => {
    if(res) return user;
    else throw new Error("Password invalida")
  });
};

module.exports = mongoose.model("User", UserSchema);
