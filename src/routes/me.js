import express from "express";
import auth from "../middlewares/authorization";

import meController from "./../controllers/me";

const router = express.Router();

//orders
router.get("/orders", auth(["CLIENT"]), meController.getMyOrders);
router.post("/orders", auth(["CLIENT"]), meController.createMyOrder);

//events
router.get("/events", auth(["CLIENT"]), meController.findMyEvents);
router.post("/events", auth(["CLIENT"]), meController.createMyEvent);

module.exports = router;
