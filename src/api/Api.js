 
import express from "express";
router = express.Router();
import ClientController from "../controllers/ClientController";
import EventController from "../controllers/EventController";
import RestaurantController from "../controllers/RestaurantController";
import EmployeeController  from "../controllers/EmployeeController";

router.get("/client:name", ClientController.getCode);
router.get("/client", ClientController.getCode);
router.post("/client", ClientController.createClient);
router.put("/client/:name", ClientController.updateClient);
router.delete("/client/:name", ClientController.deleteClient);

router.get("/event:name", EventController.getCode);
router.get("/event", EventController.getCode);
router.post("/event", EventController.createEvent);
router.put("/event/:name", EventController.updateEvent);
router.delete("/event/:name", EventController.deleteEvent);

router.get("/restaurant:name", RestaurantController.getCode);
router.get("/restaurant", RestaurantController.getCode);
router.post("/restaurant", RestaurantController.createRestaurant);
router.put("/restaurant/:name", RestaurantController.updateRestaurant);
router.delete("/restaurant/:name", RestaurantController.deleteRestaurant);

router.get("/employee:name", EmployeeController.getCode);
router.get("/employee", EmployeeController.getCode);
router.post("/employee", EmployeeController.createEmployee);
router.put("/employee/:name", EmployeeController.updateEmployee);
router.delete("/employee/:name", EmployeeController.deleteEmployee);


module.exports = router;