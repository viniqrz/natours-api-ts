import { BaseError } from "./BaseError";

export class CastError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor(path: string, value: string) {
    super(`Invalid ${path}: ${value}`);

    this.statusCode = 400;
    this.name = "CastError";
  }
}
