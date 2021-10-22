import { Router } from 'express';

import { TourController } from '../controllers/TourController';

const router = Router();

const tourController = new TourController();

router.route('/tours').get(tourController.getAll).post(tourController.create);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/tours/:id')
  .get(tourController.getOne)
  .patch(tourController.update)
  .delete(tourController.delete);

export { router };
