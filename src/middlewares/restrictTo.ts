import { NextFunction, Response } from "express";
import { IRequest } from "../@types/express/IRequest";
import { RoleNotAllowedError } from "../@types/errors/RoleNotAllowedError";

export function restrictTo(roles: Array<"user" | "guide" | "lead-guide" | "admin">) {
  return function (req: IRequest, res: Response, next: NextFunction) {
    try {
      const isAllowed = roles.includes(req.user.role);
  
      if (!isAllowed) throw new RoleNotAllowedError(req.user.role);
  
      next();
    } catch(err) {
      next(err);
    }
  }
}