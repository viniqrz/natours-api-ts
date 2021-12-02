import { Schema } from "mongoose";

export interface ReviewDto {
  review: string;
  rating: number;
  createdAt: Date;
  tour: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
}

export interface PartialReviewDto {
  review?: string;
  rating?: number;
  createdAt?: Date;
  tour?: Schema.Types.ObjectId;
  user?: Schema.Types.ObjectId;
}

