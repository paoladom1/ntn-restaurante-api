import express from "express";

import orderController from "../controllers/order";

const router = express.Router();

router.get("/order/:client", orderController.getId);
router.get("/order", orderController.getOrder);
router.post("/order", orderController.createOrder);
router.put("/order/:client", orderController.updateOrder);
router.delete("/order/:client", orderController.deleteOrder);

module.exports = router;