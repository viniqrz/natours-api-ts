import { TourModel } from '../models/TourModel';
import { Tour } from '../@types/models/Tour';
import { PartialTourDto, TourDto } from '../@types/dtos/TourDto';
import { NotFoundError } from '../@types/errors/NotFoundError';
import { ITourService } from '../@types/services/ITourService';
import { APIFeatures } from '../helpers/APIFeatures';
import { NoCoordsError } from '../@types/errors/NoCoordsError';

export class TourService implements ITourService {
  public async getAll(query: any): Promise<Tour[]> {
    // Creates mongoose query
    const features = new APIFeatures(TourModel, query)
    .filter()
    .sort()
    .select()
    .paginate();

    // Executes mongoose query
    const tours = await features.getQuery();

    return tours;
  }

  public async getToursByDistance(
    distance: number,
    latlng: string,
    unit: string  
  ): Promise<Tour[]> {
    const [lat, lng] = latlng.split(',').map((c) => Number(c));

    if (!lat || !lng) throw new NoCoordsError();

    const radius = unit === "mi" ? distance / 3963.2 : distance / 6378.1;

    const tours = await TourModel
      .find()
      .where('startLocation')
      .within({ center: [lat,lng], radius, spherical: true });

    return tours;
  }

  public async getOne(id: string): Promise<Tour> {
    const tour = await TourModel.findById(id);
    if (!tour) throw new NotFoundError('Tour');

    return tour;
  }

  public async create(dto: TourDto): Promise<Tour> {
    return await TourModel.create(dto);
  }

  public async update(id: string, partial: PartialTourDto): Promise<Tour> {
    const tour = await TourModel.findByIdAndUpdate(id, partial);

    Object.keys(partial).forEach((key) => tour[key] = partial[key]);

    return tour;
  }

  public async delete(id: string): Promise<Tour> {
    return await TourModel.findByIdAndRemove(id);
  }
}