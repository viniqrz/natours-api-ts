import { BaseError } from "./BaseError";

export class NotReachableError extends Error implements BaseError {
  public code: number;

  constructor(url: string) {
    super(`Can't find ${url} on this server!`);

    this.code = 404;
  }
}
