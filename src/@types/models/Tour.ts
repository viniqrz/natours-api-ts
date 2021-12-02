import { User } from "./User"
import { Schema } from 'mongoose';

export type Location = {
  type: string,
  coordinates: number[],
  address: string,
  description: string,
}

export type LocationAndDay = {
  type: string,
  coordinates: number[],
  address: string,
  description: string,
  day: number,
}

export interface Tour {
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  price: number;
  priceDiscount?: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  createdAt?: Date;
  startDates?: Date[];
  secretTour?: boolean;
  startLocation: Location,
  locations: LocationAndDay[],
  guides: Array<Schema.Types.ObjectId>,
}
