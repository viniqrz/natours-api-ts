import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import * as dotenv from 'dotenv';
import { IRequest } from "../@types/express/IRequest";
import { NoTokenSentError } from "../@types/errors/NoTokenSentError";

dotenv.config();

export function ensureAuth(req: IRequest, res: Response, next: NextFunction) {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) throw new NoTokenSentError();

    const [, token] = bearer.split(' ');
    const payload = verify(token, process.env.JWT_TOKEN) as JwtPayload;

    req.user = payload.data;

    next();
  } catch(err) {
    next(err);
  }
}