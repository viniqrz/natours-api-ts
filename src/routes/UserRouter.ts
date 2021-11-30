import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { catchAsync } from "../helpers/catchAsync";
import { UserService } from "../services/UserService";

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

const {
  signup,
  authenticate,
  getAll,
  getOne,
  update,
} = userController;

router
  .route('/users')
    .post(catchAsync(signup))
    .get(catchAsync(getAll))

router
  .route('/users/:id')
  .get(catchAsync(getOne))
  .patch(catchAsync(update))
  .delete(catchAsync(userController.delete));

router
  .route('/users/authenticate')
    .post(catchAsync(authenticate))

export { router as userRouter };