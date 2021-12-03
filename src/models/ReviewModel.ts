import { Schema, model } from "mongoose";
import { Review } from '../@types/models/Review';

const reviewSchema = new Schema<Review>({
  review: {
    type: String,
    required: [true, 'Review must have a text'],
    maxLength: [300, 'Max-length allowed to review is 300 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Review must contain a rating'],
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  tour: {
    type: Schema.Types.ObjectId,
    ref: 'Tour',
    required: [true, 'Review must belong to a tour']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Review must belong to a user']
  },
});

reviewSchema.pre(/^find/, function(next) {
  this
    .populate({ path: 'user', select: 'name photo' })
    .populate({ path: 'tour', select: 'name' });

  next();
})

const ReviewModel = model<Review>("Review", reviewSchema);

export { ReviewModel };