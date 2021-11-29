import { BaseError } from "./BaseError";

export class NoTokenSentError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor() {
    super(`No token sent!`);

    this.statusCode = 400;
    this.name = "NoTokenSent";
  }
}
