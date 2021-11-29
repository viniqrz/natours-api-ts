import { Router } from "express";

import { TourController } from "../controllers/TourController";
import { catchAsync } from "../helpers/catchAsync";

const router = Router();

const tourController = new TourController();

router
  .route("/tours")
  .get(catchAsync(tourController.getAll))
  .post(catchAsync(tourController.create));

router.route("/tour-stats").get(tourController.getTourStats);

router
  .route("/tours/:id")
  .get(catchAsync(tourController.getOne))
  .patch(catchAsync(tourController.update))
  .delete(catchAsync(tourController.delete));

export { router };
