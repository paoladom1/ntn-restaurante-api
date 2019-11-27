import express from 'express';
import auth from './../middlewares/authorization';

import restaurantController from '../controllers/restaurant';

const router = express.Router();

router.get('/', restaurantController.getRestaurants);
router.post('/', auth(['ADMIN']), restaurantController.createRestaurant);
router.put('/', auth(['ADMIN']), restaurantController.updateRestaurant);
router.delete('/:id', auth(['ADMIN']), restaurantController.deleteRestaurant);
router.delete('/', auth(['ADMIN']), restaurantController.deleteRestaurants);

module.exports = router;
