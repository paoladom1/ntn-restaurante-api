import express from "express";

import orderController from "../controllers/order";
import auth from "../middlewares/authorization";

const router = express.Router();

router.get("/", auth(["ADMIN", "EMPLOYEE"]), orderController.getOrders);
router.get("/:id", auth(["ADMIN", "EMPLOYEE"]), orderController.getOrderById);
router.post(
    "/",
    auth(["ADMIN", "EMPLOYEE", "CLIENT"]),
    orderController.createOrder
);
router.delete("/", auth(["ADMIN", "EMPLOYEE"]), orderController.deleteOrders);

module.exports = router;
