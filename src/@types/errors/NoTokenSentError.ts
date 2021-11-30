import { BaseError } from "./BaseError";

export class NoTokenSentError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor() {
    super(`Access denied: no token sent!`);

    this.statusCode = 401;
    this.name = "NoTokenSent";
  }
}
