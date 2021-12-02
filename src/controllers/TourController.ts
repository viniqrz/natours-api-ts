import { Request, Response, NextFunction } from "express";
import { TourModel } from "../models/TourModel";
import { APIFeatures } from "../helpers/APIFeatures";
import { NotFoundError } from "../@types/errors/NotFoundError";

class TourController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    // Creates mongoose query
    const features = new APIFeatures(TourModel, req.query)
      .filter()
      .sort()
      .select()
      .paginate();

    // Executes mongoose query
    const tours = await features.getQuery();

    res.json({
      status: "success",
      data: {
        tours,
      },
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tour = await TourModel.findOne({ _id: id }).populate('User');

    if (!tour) throw new NotFoundError("Tour");

    res.json({
      status: "success",
      data: {
        tour,
      },
    });
  }

  public async create(req: Request, res: Response): Promise<void> {
    const tour = await TourModel.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour,
      },
    });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tour = await TourModel.updateOne({ _id: id }, req.body);

    res.json({
      status: "success",
      data: {
        tour,
      },
    });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tour = await TourModel.deleteOne({ _id: id });

    res.json({
      status: "success",
      data: null,
    });
  }

  public async getTourStats(req: Request, res: Response): Promise<void> {
    const stats = await TourModel.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: "$difficulty",
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      { $sort: { avgPrice: -1 } },
    ]);

    res.json({
      status: "success",
      data: {
        stats,
      },
    });
  }
}

export { TourController };
