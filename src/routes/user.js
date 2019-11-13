import express from "express";

import userController from "./../controllers/user";

const router = express.Router();

router.get("/", userController.getUser);
router.post("/", userController.createUser);

module.exports = router;
