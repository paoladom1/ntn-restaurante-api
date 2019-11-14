import User from "../models/user";
import { JWT_KEY } from "../../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

module.exports.getUsers = (req, res) => {
  const { filter } = req;

  User.find(filter, (err, docs) => {
    if (err)
      res.status(400).json({ status: "failed", message: err, data: null });
    else
      res.status(200).json({
        status: "success",
        count: docs.length,
        message: `${docs.length} users fetched`,
        data: docs
      });
  });
};

module.exports.createUser = (req, res) => {
  const { name, dui, email, password, roles } = req.body;

  try {
    const user = new User({
      name,
      dui,
      email,
      password,
      roles
    });

    user
      .save()
      .then(user => {
        res
          .status(201)
          .json({ status: "success", message: "user created", data: { user } });
      })
      .catch(error => {
        console.log(error);
        res
          .status(400)
          .json({
            status: "failed",
            message: "couldnt create user",
            data: null
          });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error });
  }
};

module.exports.authenticate = (req, res, next) => {
  //Login a registered user
  try {
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err) next(err);
      else {
        if (!user)
          res
            .status(400)
            .json({
              status: "failed",
              message: "email not found on database",
              data: null
            });
        bcrypt.compare(password, user.password, (_, result) => {
          if (!result)
            res
              .status(400)
              .json({
                status: "failed",
                message: "password incorrect",
                data: null
              });
          else {
            const token = jwt.sign({ id: user._id }, JWT_KEY, {
              expiresIn: "1h"
            });

            res
              .status(200)
              .json({
                status: "success",
                message: "user authenticated",
                data: { user, token }
              });
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.deleteAllUsers = (_, res) => {
  User.deleteMany({}, error => {
    console.log(error);
    res
      .status(200)
      .json({ status: "success", message: "Deleted all users", data: null });
  });
};
