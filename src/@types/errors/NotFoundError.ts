import { BaseError } from "./BaseError";

export class NotFoundError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor(model: string) {
    super(`Couldn't find any ${model} matching these conditions.`);

    this.statusCode = 404;
    this.name = "NotFound";
  }
}
