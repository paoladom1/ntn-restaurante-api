import express from "express";

import locationController from "../controllers/location";

const router = express.Router();

router.get("/", locationController.getLocations);
router.post("/", locationController.createLocation);
router.put("/", locationController.updateLocation);
router.delete("/", locationController.deleteLocation);

module.exports = router;