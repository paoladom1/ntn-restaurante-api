import express from "express";
import auth from "../middlewares/authorization";

import meController from "./../controllers/me";

const router = express.Router();

router.get(
    "/orders",
    auth(["CLIENT"]),
    meController.getMyOrders
);

router.post(
    "/orders",
    auth(["CLIENT"]),
    meController.createMyOrder
);

module.exports = router;
