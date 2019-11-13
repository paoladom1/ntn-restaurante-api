import express from "express";

import eventRoutes from "./event";
import restaurantRoutes from "./restaurant";
import userRoutes from "./user";

const router = express.Router();

router.use("/users", userRoutes)
router.use("/event", eventRoutes);
router.use("/restaurant", restaurantRoutes);

module.exports = router;