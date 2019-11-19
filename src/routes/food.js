import express from "express";

import auth from "../middlewares/authorization";
import foodController from "../controllers/food";

const router = express.Router();

router.get("/:category", foodController.getFoodByCategory);
router.post("/", foodController.createFood);
router.put("/", foodController.updateManyFood);
router.delete("/:id", auth(["ADMIN"]), foodController.deleteOneFood);
router.delete("/", auth(["ADMIN"]), foodController.deleteManyFood);

module.exports = router;
