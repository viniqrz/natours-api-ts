import { Schema } from "mongoose";
import { PartialReviewDto, ReviewDto } from "../@types/dtos/ReviewDto";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { Review } from "../@types/models/Review";
import { IReviewService } from "../@types/services/IReviewService";
import { ReviewModel } from "../models/ReviewModel";
  
export class ReviewService implements IReviewService {
  public async getAll(filter: { tour?: Schema.Types.ObjectId }): Promise<Review[]> {
    return await ReviewModel.find({ ...filter });
  }

  public async getOne(id: string): Promise<Review> {
    const review = await ReviewModel.findById(id);

    if (!review) throw new NotFoundError('Review');

    return review;
  }

  public async create(dto: ReviewDto): Promise<Review> {
    return await ReviewModel.create(dto);
  }

  public async update(id: string, partial: PartialReviewDto): Promise<Review> {
    const review = await ReviewModel.findByIdAndUpdate(id, partial);

    Object.keys(partial).forEach((key) => review[key] = partial[key]);

    return review;
  }

  public async delete(id: string): Promise<Review> {
    return await ReviewModel.findByIdAndRemove(id);
  }
}