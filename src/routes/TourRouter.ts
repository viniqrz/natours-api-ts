import { Router } from "express";

import { TourController } from "../controllers/TourController";
import { catchAsync } from "../helpers/catchAsync";
import { ensureAuth } from "../middlewares/ensureAuth";
import { restrictTo } from "../middlewares/restrictTo";

const router = Router();

const tourController = new TourController();

router
  .route("/tours")
    .get(ensureAuth, catchAsync(tourController.getAll))
    .post(
      ensureAuth,
      restrictTo(["admin", "guide", "lead-guide"]),
      catchAsync(tourController.create)
    );

router
  .route("/tour-stats")
    .get(ensureAuth, tourController.getTourStats);

router
  .route("/tours/:id")
    .get(ensureAuth, catchAsync(tourController.getOne))
    .patch(
      ensureAuth,
      restrictTo(["admin", "guide", "lead-guide"]),
      catchAsync(tourController.update)
    )
    .delete(
      ensureAuth,
      restrictTo(["admin", "guide", "lead-guide"]),
      catchAsync(tourController.delete)
    );

export { router as tourRouter };
