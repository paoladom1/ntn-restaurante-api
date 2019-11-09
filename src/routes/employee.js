import express from "express";

import employeeController from "../controllers/employee";

const router = express.Router();

router.get("/employee:name", employeeController.getCode);
router.get("/employee", employeeController.getCode);
router.post("/employee", employeeController.createEmployee);
router.put("/employee/:name", employeeController.updateEmployee);
router.delete("/employee/:name", employeeController.deleteEmployee);

module.exports = router;
