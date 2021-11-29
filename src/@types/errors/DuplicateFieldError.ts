import { BaseError } from "./BaseError";

export class DuplicateFieldError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor(value: string) {
    super(`Duplicate field value ${value}. Please send another value.`);

    this.statusCode = 400;
    this.name = "DuplicateField";
  }
}
