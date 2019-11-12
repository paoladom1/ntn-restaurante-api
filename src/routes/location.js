import express from "express";

import locationController from "../controllers/location";

const router = express.Router();

router.get("/location/:location", locationController.getId);
router.get("/location", locationController.getLocation);
router.post("/location", locationController.createLocation);
router.put("/location/:location", locationController.updateLocation);
router.delete("/location/:location", locationController.deleteLocation);

module.exports = router;