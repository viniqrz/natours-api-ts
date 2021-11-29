import { Request, Response, NextFunction } from "express";
import { BaseError } from "../@types/errors/BaseError";
import { CastError } from "../@types/errors/CastError";
import { sendErrorResponse } from "../helpers/sendErrorResponse";

function handleCastError(err: BaseError, res: Response) {
  sendErrorResponse(new CastError(err.path, err.value), res);
}

export function errorHandler(
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "CastError") handleCastError(err, res);

  sendErrorResponse(err, res);
}
