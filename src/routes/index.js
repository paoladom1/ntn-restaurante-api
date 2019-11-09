import express from "express";

import clientRoutes from "./client";
import employeeRoutes from "./employee";
import eventRoutes from "./event";
import restaurantRoutes from "./restaurant";

const router = express.Router();

router.use("/client", clientRoutes);
router.use("/employee", employeeRoutes);
router.use("/event", eventRoutes);
router.use("/restaurant", restaurantRoutes);

module.exports = router;