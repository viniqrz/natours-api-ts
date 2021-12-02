import { Schema } from 'mongoose';

export interface Review {
  review: string;
  rating: number;
  createdAt: Date;
  tour: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}