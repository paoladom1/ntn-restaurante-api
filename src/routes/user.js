import express from "express";
import auth from "../middlewares/authorization";

import userController from "./../controllers/user";

const router = express.Router();

// authentication
router.post("/signin", userController.authenticate);
router.post("/signup", userController.createUser);

router.get("/", auth(["ADMIN", "EMPLOYEE", "CLIENT"]), userController.getUsers);
router.get(
    "/:id",
    auth(["ADMIN", "EMPLOYEE", "CLIENT"]),
    userController.getUserById
);
router.get(
    "/:id/orders",
    auth(["ADMIN", "EMPLOYEE", "CLIENT"]),
    userController.getUserOrders
);

router.post(
    "/:id/orders",
    auth(["ADMIN", "EMPLOYEE", "CLIENT"]),
    userController.createUserOrder
);
router.put("/:id", auth(["ADMIN"]), userController.updateUser);

router.delete("/", auth(["ADMIN"]), userController.deleteAllUsers);
router.delete("/:id", auth(["ADMIN"]), userController.deleteUser);

module.exports = router;
