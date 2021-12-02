import { Router } from "express";

import { TourService } from "../services/TourService";
import { TourController } from "../controllers/TourController";
import { catchAsync } from "../helpers/catchAsync";
import { ensureAuth } from "../middlewares/ensureAuth";
import { restrictTo } from "../middlewares/restrictTo";

const router = Router();

const tourService = new TourService();
const tourController = new TourController(tourService);

router
  .route("/tours")
    .get(ensureAuth, catchAsync(tourController.getAll))
    .post(
      ensureAuth,
      restrictTo(["admin", "guide", "lead-guide"]),
      catchAsync(tourController.create)
    );

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
