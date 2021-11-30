import { BaseError } from "./BaseError";

export class NotOwnerError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor() {
    super(`Access denied: not owner.`);

    this.statusCode = 403;
    this.name = "NotOwner";
  }
}
