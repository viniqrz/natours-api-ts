import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import 'express-async-errors';

import { router as tourRouter } from './routes/TourRouter';

dotenv.config();

const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD as string
) as string;

const BASE_URL = '/api/v1';
const PORT = process.env.PORT;

const app = express();

mongoose
  .connect(DB)
  .then(() => console.log('DB connected successfully'))
  .catch((err: any) => console.error(err));

app.use(express.json());

app.use(BASE_URL, tourRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: 'error',
    message: err.message,
  });
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));
