import { Request, Response, NextFunction } from "express";
import { TourModel } from "../models/TourModel";
import { APIFeatures } from "../helpers/APIFeatures";
import { NotFoundError } from "../@types/errors/NotFoundError";
import { TourService } from "../services/TourService";

class TourController {
  constructor(private tourService: TourService) {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
    this.getToursByDistance = this.getToursByDistance.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const tours = await this.tourService.getAll(req.query);

    res.json({
      status: "success",
      data: {
        tours,
      },
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tour = await this.tourService.getOne(id);

    res.json({
      status: "success",
      data: {
        tour,
      },
    });
  }

  public async getToursByDistance(req: Request, res: Response): Promise<void> {
    // .route("/tours/tours-distance/:distance/center/:latlng/unit/:unit")    

    const { distance, latlng, unit } = req.params;

    const tours = await this.tourService.getToursByDistance(Number(distance), latlng, unit);

    res.json({
      status: 'success',
      data: tours
    })
  }

  public async create(req: Request, res: Response): Promise<void> {
    const tour = await this.tourService.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour,
      },
    });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const partial = req.body;

    const tour = await this.tourService.update(id, partial);

    res.json({
      status: "success",
      data: {
        tour,
      },
    });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tour = await this.tourService.delete(id);

    res.json({
      status: "success",
      data: null,
    });
  }
}

export { TourController };
