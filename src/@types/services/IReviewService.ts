import { Review } from '../models/Review';
import { ReviewDto, PartialReviewDto } from '../dtos/ReviewDto';

export interface IReviewService {
  getAll(): Promise<Review[]>;
  getOne(id: string): Promise<Review>;
  create(dto: ReviewDto): Promise<Review>;
  update(id: string, partial: PartialReviewDto): Promise<Review>;
  delete(id: string): Promise<Review>;
}