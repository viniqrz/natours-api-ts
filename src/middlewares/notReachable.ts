import { Request, Response, NextFunction } from "express";
import { NotReachableError } from "../@types/errors/NotReachableError";

export const notReachableRouteHandler = (req: Request, res: Response, next: NextFunction) => {
  const error = new NotReachableError(req.originalUrl);

  next(error);
}