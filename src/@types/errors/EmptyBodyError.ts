import { BaseError } from "./BaseError";

export class EmptyBodyError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor() {
    super(`Can't proceed: request body is empty.`);

    this.statusCode = 400;
    this.name = "EmptyBody";
  }
}
