import * as mongoose from "mongoose";
import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

import { tourRouter } from "./routes/TourRouter";
import { userRouter } from "./routes/UserRouter";
import { errorHandler } from "./middlewares/errorHandler";
import { notReachableRouteHandler } from "./middlewares/notReachable";

const DB = process.env.DB_URL?.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD as string
) as string;

const PORT = process.env.PORT;

mongoose
.connect(DB)
.then(() => console.log("DB connected successfully"))
.catch((err: any) => console.error(err));

const app = express();

app.use(express.json());
app.use("/api/v1", tourRouter);
app.use("/api/v1", userRouter);
app.all("*", notReachableRouteHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log("Listening on port " + PORT));
