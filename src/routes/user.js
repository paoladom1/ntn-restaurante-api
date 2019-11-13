import express from "express";

import userController from "./../controllers/user";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.delete("/", userController.deleteAllUsers);
router.post("/signin", userController.authenticate);
router.post("/signup", userController.createUser)

module.exports = router;
