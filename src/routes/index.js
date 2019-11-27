import express from 'express';

import eventRoutes from './event';
import restaurantRoutes from './restaurant';
import userRoutes from './user';
import foodRoutes from './food';
import locationRoutes from './location';
import orderRoutes from './order';
import meRoutes from './me';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/foods', foodRoutes);
router.use('/events', eventRoutes);
router.use('/locations', locationRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);
router.use('/me', meRoutes);

module.exports = router;
