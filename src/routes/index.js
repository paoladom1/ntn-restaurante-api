import express from "express";

import eventRoutes from "./event";
import restaurantRoutes from "./restaurant";
import userRoutes from "./user";
import foodRoutes from "./food";
import locationRoutes from "./location";

const router = express.Router();

router.use("/users", userRoutes)
router.use("/foods", foodRoutes)
router.use("/events", eventRoutes);
router.use("/locations", locationRoutes);
router.use("/restaurants", restaurantRoutes);


module.exports = router;