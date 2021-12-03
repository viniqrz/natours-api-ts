import { Review } from '../models/Review';
import { ReviewDto, PartialReviewDto } from '../dtos/ReviewDto';
import { Schema } from 'mongoose';

export interface IReviewService {
  getAll(filter: { tour?: Schema.Types.ObjectId }): Promise<Review[]>;
  getOne(id: string): Promise<Review>;
  create(dto: ReviewDto): Promise<Review>;
  update(id: string, partial: PartialReviewDto): Promise<Review>;
  delete(id: string): Promise<Review>;
}