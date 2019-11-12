import express from "express";

import countController from "../controllers/count";

const router = express.Router();

router.get("/count/:username", countController.getId);
router.get("/count", countController.getCount);
router.post("/count", countController.createCount);
router.put("/count/:username", countController.updateCount);
router.delete("/count/:username", countController.deleteCount);

module.exports = router;