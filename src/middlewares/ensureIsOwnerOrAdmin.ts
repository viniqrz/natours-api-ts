import { NextFunction, Response } from "express";
import { IRequest } from "../@types/express/IRequest";
import { NotOwnerError } from "../@types/errors/NotOwnerError";

export function ensureIsOwnerOrAdmin(req: IRequest, res: Response, next: NextFunction) {
  try {
    const isOwner = req.user._id === req.params.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) throw new NotOwnerError();

    next();
  } catch(err) {
    next(err);
  }
}