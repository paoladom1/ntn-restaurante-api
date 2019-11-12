import express from "express";

import menuController from "../controllers/menu";

const router = express.Router();

router.get("/menu/:menu", menuController.getId);
router.get("/menu", menuController.getMenu);
router.post("/menu", menuController.createMenu);
router.put("/menu/:menu", menuController.updateMenu);
router.delete("/menu/:menu", menuController.deleteMenu);

module.exports = router;