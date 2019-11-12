import express from "express";

import eventRoutes from "./event";
import restaurantRoutes from "./restaurant";

const router = express.Router();

router.use("/event", eventRoutes);
router.use("/restaurant", restaurantRoutes);

module.exports = router;