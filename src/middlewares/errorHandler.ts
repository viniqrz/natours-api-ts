import { Request, Response, NextFunction } from "express";
import { BaseError } from "../@types/errors/BaseError";
import { CastError } from "../@types/errors/CastError";
import { DuplicateFieldError } from "../@types/errors/DuplicateFieldError";
import { sendErrorResponse } from "../helpers/sendErrorResponse";

function handleCastError(err: BaseError, res: Response) {
  sendErrorResponse(new CastError(err.path, err.value), res);
}

function handleDuplicateField(err: BaseError, res: Response) {
  const [value] = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/);

  sendErrorResponse(new DuplicateFieldError(value), res);
}

export function errorHandler(
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "CastError") handleCastError(err, res);
  if (err.code === 11000) handleDuplicateField(err, res);

  sendErrorResponse(err, res);
}
