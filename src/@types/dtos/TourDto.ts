import { Schema } from 'mongoose';
import { Tour, Location, LocationAndDay } from '../models/Tour';
import { User } from '../models/User';


export interface TourDto {
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

export interface PartialTourDto {
  name?: string;
  duration?: number;
  maxGroupSize?: number;
  difficulty?: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  price?: number;
  priceDiscount?: number;
  summary?: string;
  description?: string;
  imageCover?: string;
  images?: string[];
  createdAt?: Date;
  startDates?: Date[];
  secretTour?: boolean;
  startLocation?: Location,
  locations?: LocationAndDay[],
  guides?: Array<Schema.Types.ObjectId>,
}