import express from "express";

import foodController from "../controllers/food";

const router = express.Router();

router.get("/", foodController.getFood);
router.post("/", foodController.createFood);
router.put("/", foodController.updateFood)
router.delete("/", foodController.deleteFood);

module.exports = router;
