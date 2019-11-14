import express from "express";

import restaurantController from "../controllers/restaurant";

const router = express.Router();

router.get("/", restaurantController.getRestaurants);
router.post("/", restaurantController.createRestaurant);
router.put("/", restaurantController.updateRestaurant);
router.delete("/", restaurantController.deleteRestaurants);

module.exports = router;

