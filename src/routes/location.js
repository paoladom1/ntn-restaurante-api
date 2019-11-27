import express from "express";
import auth from "./../middlewares/authorization";

import locationController from "../controllers/location";

const router = express.Router();

router.get("/", locationController.getLocations);
router.post("/", auth(["ADMIN"]), locationController.createLocation);
router.put("/", auth(["ADMIN"]), locationController.updateLocation);
router.delete("/", auth(["ADMIN"]), locationController.deleteLocation);

module.exports = router;