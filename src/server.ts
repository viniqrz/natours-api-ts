import * as mongoose from "mongoose";
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

import { router as tourRouter } from "./routes/TourRouter";
import { NotReachableError } from "./@types/errors/NotReachableError";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./middlewares/errorHandler";

const DB = process.env.DB_URL?.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD as string
) as string;

const PORT = process.env.PORT;

const app = express();

mongoose
  .connect(DB)
  .then(() => console.log("DB connected successfully"))
  .catch((err: any) => console.error(err));

app.use(express.json());

app.use("/api/v1", tourRouter);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new NotReachableError(req.originalUrl);

  next(error);
});

app.use(errorHandler);

app.listen(PORT, () => console.log("Listening on port " + PORT));
