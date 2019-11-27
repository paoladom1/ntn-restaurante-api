import express from 'express';

import eventController from '../controllers/event';

const router = express.Router();

router.get('/:id', eventController.findById);
router.get('/', eventController.find);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateOneEvent);
router.delete('/:id', eventController.deleteOneEvent);

module.exports = router;
