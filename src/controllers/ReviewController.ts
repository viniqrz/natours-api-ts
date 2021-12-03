import { ReviewService } from "../services/ReviewService";
import { Request, Response } from "express";
import { IRequest } from "../@types/express/IRequest";

export class ReviewController {
  constructor(private reviewService: ReviewService) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    let filter = {};

    if (req.params.tourId) filter = { tour: req.params.tourId };

    const reviews = await this.reviewService.getAll(filter);

    res.json({
      status: "success",
      data: {
        reviews,
      },
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const review = await this.reviewService.getOne(id);

    res.json({
      status: "success",
      data: {
        review,
      },
    });
  }

  public async create(req: IRequest, res: Response): Promise<void> {
    if (!req.body.user) req.body.user = req.user._id;
    if (!req.body.tour) req.body.tour = req.params.tourId;

    const review = await this.reviewService.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        review,
      },
    });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const partial = req.body;

    const review = await this.reviewService.update(id, partial);

    res.json({
      status: "success",
      data: {
        review,
      },
    });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const review = await this.reviewService.delete(id);

    res.json({
      status: "success",
      data: null,
    });
  }
}