import { BaseError } from "./BaseError";

export class RoleNotAllowedError extends Error implements BaseError {
  public statusCode: number;
  public name: string;

  constructor(role: string) {
    super(`Access denied: role ${role} not allowed.`);

    this.statusCode = 403;
    this.name = "RoleNotAllowed";
  }
}
