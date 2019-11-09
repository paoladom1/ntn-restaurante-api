import express from "express";

import restaurantController from "../controllers/restaurantController";

const router = express.Router();

router.get("/restaurant:name", restaurantController.getCode);
router.get("/restaurant", restaurantController.getCode);
router.post("/restaurant", restaurantController.createRestaurant);
router.put("/restaurant/:name", restaurantController.updateRestaurant);
router.delete("/restaurant/:name", restaurantController.deleteRestaurant);

module.exports = router;

