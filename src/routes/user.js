import express from "express";
import auth from "../middlewares/authorization";

import userController from "./../controllers/user";

const router = express.Router();

router.get("/", userController.getUsers);
router.delete("/", auth, userController.deleteAllUsers);
router.post("/signin", userController.authenticate);
router.post("/signup", userController.createUser)

module.exports = router;
