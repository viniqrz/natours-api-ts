import { BaseError } from "./BaseError";

export class ExpiredResetTokenError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor() {
    super(`Can't proceed: expired reset token.`);

    this.statusCode = 401;
    this.name = "ExpiredResetToken";
  }
}
