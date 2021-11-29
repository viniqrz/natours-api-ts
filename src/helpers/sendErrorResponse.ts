import { Request, Response, NextFunction } from "express";
import { BaseError } from "../@types/errors/BaseError";

export function sendErrorResponse(err: BaseError, res: Response) {
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message,
  });
}
