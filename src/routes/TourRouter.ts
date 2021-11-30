import { Router } from "express";

import { TourController } from "../controllers/TourController";
import { catchAsync } from "../helpers/catchAsync";
import { ensureAuth } from "../middlewares/ensureAuth";

const router = Router();

const tourController = new TourController();

router
  .route("/tours")
    .get(ensureAuth, catchAsync(tourController.getAll))
    .post(ensureAuth, catchAsync(tourController.create));

router
  .route("/tour-stats")
    .get(ensureAuth, tourController.getTourStats);

router
  .route("/tours/:id")
    .get(ensureAuth, catchAsync(tourController.getOne))
    .patch(ensureAuth, catchAsync(tourController.update))
    .delete(ensureAuth, catchAsync(tourController.delete));

export { router as tourRouter };
