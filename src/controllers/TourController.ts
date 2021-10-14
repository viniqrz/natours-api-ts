import { Request, Response } from 'express';

import { Tour } from '../models/tourModel';

class TourController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.create = this.create.bind(this);
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const tours = await Tour.find();

    res.json({
      status: 'success',
      data: {
        tours,
      },
    });
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tour = await Tour.findOne({ _id: id });

    res.json({
      status: 'success',
      data: {
        tour,
      },
    });
  }

  public async create(req: Request, res: Response): Promise<void> {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tour = await Tour.updateOne({ _id: id }, req.body);

    res.json({
      status: 'success',
      data: {
        tour,
      },
    });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const tour = await Tour.deleteOne({ _id: id });

    res.json({
      status: 'success',
    });
  }
}

export { TourController };
