import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { catchAsync } from '../helpers/catchAsync';
import { ensureAuth } from '../middlewares/ensureAuth';
import { ReviewService } from '../services/ReviewService';

const reviewService = new ReviewService();
const reviewController = new ReviewController(reviewService);

const router = Router();

router
  .route('/reviews')
  .get(ensureAuth, catchAsync(reviewController.getAll))
  .post(ensureAuth, catchAsync(reviewController.create));

router
  .route('/reviews/:id')
  .get(ensureAuth, catchAsync(reviewController.getOne))
  .patch(ensureAuth, catchAsync(reviewController.update))
  .delete(ensureAuth, catchAsync(reviewController.delete));

export { router as reviewRouter };
