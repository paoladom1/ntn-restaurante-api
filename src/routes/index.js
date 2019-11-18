import express from "express";

import eventRoutes from "./event";
import restaurantRoutes from "./restaurant";
import userRoutes from "./user";
import foodRoutes from "./food";
import locationRoutes from "./location";
import orderRoutes from "./order";

const router = express.Router();

router.use("/users", userRoutes)
router.use("/foods", foodRoutes)
router.use("/events", eventRoutes);
router.use("/locations", locationRoutes);
router.use("/restaurants", restaurantRoutes);
router.use("/orders", orderRoutes);


module.exports = router;