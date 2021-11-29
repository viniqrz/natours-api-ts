import { BaseError } from "./BaseError";

export class WrongEmailOrPasswordError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor() {
    super(`Wrong email or password`);

    this.statusCode = 404;
    this.name = "WrongEmailOrPassword";
  }
}
