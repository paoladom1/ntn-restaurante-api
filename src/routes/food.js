import express from "express";

import auth from "../middlewares/authorization";
import foodController from "../controllers/food";

const router = express.Router();

router.get("/", foodController.getFood);
router.get("/:category", foodController.getFoodByCategory);
router.post("/", auth(["ADMIN"]),foodController.createFood);
router.put("/", auth(["ADMIN"]), foodController.updateManyFood);
router.delete("/:id", auth(["ADMIN"]), foodController.deleteOneFood);
router.delete("/", auth(["ADMIN"]), foodController.deleteManyFood);

module.exports = router;
