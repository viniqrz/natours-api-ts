import { BaseError } from "./BaseError";

export class NoCoordsError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor() {
    super(`No latitude and longitude coords provided.`);

    this.statusCode = 400;
    this.name = "NoCoords";
  }
}
