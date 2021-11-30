import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { catchAsync } from "../helpers/catchAsync";
import { UserService } from "../services/UserService";
import { ensureAuth } from '../middlewares/ensureAuth';
import { ensureIsOwnerOrAdmin } from "../middlewares/ensureIsOwnerOrAdmin";
import { ensureBodyIsUser } from "../middlewares/ensureBodyIsUser";

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
    .post(ensureBodyIsUser, catchAsync(signup))
    .get(ensureAuth, catchAsync(getAll))

router
  .route('/users/:id')
  .get(ensureAuth, catchAsync(getOne))
  .patch(ensureAuth, ensureIsOwnerOrAdmin, catchAsync(update))
  .delete(ensureAuth, ensureIsOwnerOrAdmin, catchAsync(userController.delete));

router
  .route('/users/authenticate')
    .post(catchAsync(authenticate))

export { router as userRouter };