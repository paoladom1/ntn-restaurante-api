import express from "express";
import auth from "../middlewares/authorization";

import userController from "./../controllers/user";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/signin", userController.authenticate);
router.post("/signup", userController.createUser)
router.delete("/", auth(["ADMIN"]), userController.deleteAllUsers);

module.exports = router;
