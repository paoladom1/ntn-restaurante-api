import express from "express";

import eventController from "../controllers/event";

const router = express.Router();

router.get("/event:name", eventController.getId);
router.get("/event", eventController.getId);
router.post("/event", eventController.createEvent);
router.put("/event/:name", eventController.updateEvent);
router.delete("/event/:name", eventController.deleteEvent);

module.exports = router;
