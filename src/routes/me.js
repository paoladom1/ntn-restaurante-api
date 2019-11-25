import express from "express";
import auth from "../middlewares/authorization";

import userController from "./../controllers/user";

const router = express.Router();

router.get(
    "/orders",
    auth(["CLIENT"]),
    userController.getUserOrders
);

router.post(
    "/orders",
    auth(["CLIENT"]),
    userController.createUserOrder
);

module.exports = router;
