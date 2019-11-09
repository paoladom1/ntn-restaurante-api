import express from "express";

import clientController from "../controllers/client";

const router = express.Router();

router.get("/client/:name", clientController.getId);
router.get("/client", clientController.getClients);
router.post("/client", clientController.createClient);
router.put("/client/:name", clientController.updateClient);
router.delete("/client/:name", clientController.deleteClient);

module.exports = router;
