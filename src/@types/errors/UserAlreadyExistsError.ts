import { BaseError } from "./BaseError";

export class UserAlreadyExistsError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor() {
    super(`An user already exists with this email!`);

    this.statusCode = 422;
    this.name = "UserAlreadyExists";
  }
}
