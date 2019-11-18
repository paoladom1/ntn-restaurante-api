import express from "express";
import auth from "../middlewares/authorization";

import userController from "./../controllers/user";

const router = express.Router();

// authentication
router.post("/signin", userController.authenticate);
router.post("/signup", userController.createUser);

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.get("/:id/orders", userController.getUserOrders);

router.post("/:id/orders", userController.createUserOrder);

router.put("/:id", auth(["ADMIN"]), userController.updateUser)

router.delete("/", userController.deleteAllUsers);
router.delete("/:id", userController.deleteUser);

module.exports = router;
