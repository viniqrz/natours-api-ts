import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { catchAsync } from "../helpers/catchAsync";
import { UserService } from "../services/UserService";

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

const { signup, authenticate } = userController;

router
  .route('/users')
    .post(catchAsync(signup))

router
  .route('/users/authenticate')
    .post(catchAsync(authenticate))

export { router as userRouter };