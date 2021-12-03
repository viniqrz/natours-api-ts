import { TourDto, PartialTourDto } from '../dtos/TourDto';
import { Tour } from '../models/Tour';

export interface ITourService {
  getAll(query: any): Promise<Tour[]>;
  getOne(id: string): Promise<Tour>;
  create(dto: TourDto): Promise<Tour>;
  update(id: string, partial: PartialTourDto): Promise<Tour>;
  delete(id: string): Promise<Tour>;
  getToursByDistance(
    distance: number,
    latlng: string,
    unit: string  
  ): Promise<Tour[]>
}