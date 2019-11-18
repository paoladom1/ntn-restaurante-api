import express from "express";

import orderController from "../controllers/order";

const router = express.Router();

router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById)
router.post("/", orderController.createOrder);
router.delete("/", orderController.deleteOrders)


module.exports = router;