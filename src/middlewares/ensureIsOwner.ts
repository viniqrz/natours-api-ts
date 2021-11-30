import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { IRequest } from "../@types/express/IRequest";
import { NoTokenSentError } from "../@types/errors/NoTokenSentError";
import { NotOwnerError } from "../@types/errors/NotOwnerError";

export function ensureIsOwner(req: IRequest, res: Response, next: NextFunction) {
  try {
    const isOwner = req.user._id === req.params.id;

    if (!isOwner) throw new NotOwnerError();

    next();
  } catch(err) {
    next(err);
  }
}