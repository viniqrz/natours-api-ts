import path from 'path';
import fs from 'fs';

import { Request, Response } from "express";

const TOURS_PATH = path.join(__dirname, '..', '..', 'dev-data', 'data', 'tours-simple.json');

type Tour = {
  name: string;
  description: string;
}

type NewTour = {
  data: Tour;
}

class TourController {
  private tours: any[];
  
  constructor() {
    this.tours = this.readTours();

    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.post = this.post.bind(this);
  }

  private readTours() {
    return JSON.parse(fs.readFileSync(TOURS_PATH, {  encoding: 'utf8' } ))
  }

  private updateTours() {
    this.tours = this.readTours();
  }

  public getAll(req: Request, res: Response): void  {

    const { tours } = this;

    res.json({
      status: 'success',
      data: {
        tours,
      }
    });
  }

  public getOne(req: Request, res: Response): void {

    const { tours }= this;

    const id = Number.parseInt(req.params.id);

    const tour = tours.find((tour: any) => tour.id === id);

    if (!tour) throw new Error('Tour not found');

    res.status(201).json({
      status: 'success',
      data: {
        tour
      },
    });
  }
  
  public post(req: Request, res: Response): void {

    const { tours }= this;

    const { data }: NewTour = req.body;
  
    if (!data) throw new Error('No data sent');
  
    const tourAlreadyExists = tours.some((tour: any) => tour.name === data.name);
  
    if (tourAlreadyExists) throw new Error('Tour already exists!');
  
    const newId = tours[tours.length - 1].id + 1;
    const newTours = [ ...tours, { id: newId, ...data } ];
  
    fs.writeFile(TOURS_PATH, JSON.stringify(newTours), (err) => {
  
      if (err) throw new Error('Couldnt save tour!');
  
      res.status(201).json({
        status: 'success',
        data: {
          newTours
        }
      });
    });
  }

  public update(req: Request, res: Response): void {

    const { tours }= this;

    const { data }: NewTour = req.body;

    const id = JSON.parse(req.params.id);

    const newTours = tours.map((tour: any) => {

      if (tour.id !== id) return tour;

      return { id, ...data };
    });

    fs.writeFile(TOURS_PATH, JSON.stringify(newTours), (err) => {

      if (err) throw new Error('Couldnt update tour!');

      res.json({
        status: 'success',
        data: {
          newTours
        },
      });

      this.updateTours();
    });
  }

  public delete(req: Request, res: Response): void {

    const { tours }= this;

    const id = JSON.parse(req.params.id);

    const newTours = tours.filter((tour: any) => tour.id !== id);

    if (newTours.length === tours.length) throw new Error('Tour does not exist!');

    fs.writeFile(TOURS_PATH, JSON.stringify(newTours), (err) => {

      if (err) throw new Error('Couldnt delete tour!');

      res.json({
        status: 'success',
        data: {
          newTours
        },
      });

      this.updateTours();
    });
  }
}

export { TourController };