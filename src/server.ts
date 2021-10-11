import express from 'express';
import dotenv from 'dotenv';

import { router as tourRouter } from './routes/TourRouter';

dotenv.config();

const BASE_URL = '/api/v1';
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(BASE_URL, tourRouter);

app.listen(PORT, () => console.log('Listening on port ' + PORT));

