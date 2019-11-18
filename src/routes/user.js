import express from "express";
import auth from "../middlewares/authorization";

import userController from "./../controllers/user";

const router = express.Router();

router.post("/signin", userController.authenticate);
router.post("/signup", userController.createUser);

router.get("/", userController.getUsers);
router.put("/:id", auth(["ADMIN"]), userController.updateUser)
router.delete("/", auth(["ADMIN"]), userController.deleteAllUsers);
router.delete("/:id", auth(["ADMIN"]), userController.deleteUser);

module.exports = router;
